<!-- 手机号管理页面-->
<template>
 <div class="table">
     <el-card class="box-card"  style="margin-bottom:20px;height:138px;">
          <!-- 表单 -->
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
        <el-form-item label="用户手机号:" prop="mobile">
          <el-input v-model="testForm.mobile"></el-input>
        </el-form-item>
         <el-form-item>
            <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
        </el-form-item>
      </el-form>
     </el-card>
   <el-card class="box-card2">
     <!-- 表格 -->
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="true"
       @handleSelectionChange="handleSelectionChange" :loading="loading"
      :total="total" @pageChange="pageChange">
       <el-table-column slot="operate" label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
     </myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getNewsList } from "@/api/login.js";
import { formatPhone } from "./util.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      total: 0,
      testForm: {
        mobile: ""
      },
      columns: [
        {
          prop: "name",
          label: "姓名",
          isShow: true //是否显示
        },
        {
          prop: "mobile",
          label: "手机号",
          isShow: true,
          render: function(v, param) {
            return formatPhone(param.row.mobile);
          }
        }
      ],
      dataSource: []
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    // 查询列表
    query() {
      this.loading = true;
      let params = { pageIndex: 1, pageSize: 10 };
      getNewsList(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total.total;
          this.dataSource = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    detail(row) {
      localStorage.setItem("mobileRow", JSON.stringify(row));
      this.$router.push({
        path: "telManagementDetail"
      });
    },
    // 页码切换
    pageChange(page) {
      let params = { pageIndex: page.currentPage, pageSize: page.pageSize };
      getNewsList(params)
        .then(res => {
          this.dataSource = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelectionChange(val) {
      console.log("多选:", val);
    },
    onSubmit(formName) {
      let params = { mobile: formName.mobile };
      getNewsList(params)
        .then(res => {
          this.total = 1;
          this.dataSource = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.query();
    }
  }
};
</script>
<style scoped>
.box-card {
  background-image: url("../../assets/images/home/topBg2.png");
  background-size: 100% 100%;
}
.table >>> .box-card2 {
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: 100% 100%;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.search:hover {
  cursor: pointer;
}

.el-button--text {
  color: #7ecbe0;
}
</style>