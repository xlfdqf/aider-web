<!-- 身份证管理页面-->
<template>
 <div class="table">
   <el-card class="box-card" style="margin-bottom:20px;height:138px;">
      <!-- 表单 -->
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
        <el-form-item label="身份证号:" prop="idCard">
          <el-input v-model="testForm.idCard"></el-input>
        </el-form-item>
         <el-form-item>
          <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
        </el-form-item>
      </el-form>
   </el-card>
   <!-- <p style="color:#27a2c6;font-size:20px;">数据列表</p> -->
   <el-card class="box-card2">
     <!-- 表格 -->
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="true"
       @handleSelectionChange="handleSelectionChange"
      :total="total" @pageChange="pageChange" :loading="loading">
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
import { formatPhone, formatIdcard } from "./util.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      total: 0,
      testForm: {
        idCard: ""
      },
      columns: [
        {
          prop: "name",
          label: "姓名",
          isShow: true //是否显示
        },
        {
          prop: "idcard",
          label: "身份证",
          isShow: true,
          render: function(v, param) {
            return formatIdcard(param.row.idcard);
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
      localStorage.setItem("row", JSON.stringify(row));
      this.$router.push({
        path: "idcardManagementDetail"
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
    // 搜索
    onSubmit(formName) {
      let param = { idCard: formName.idCard };
      getNewsList(param)
        .then(res => {
          this.total = 1;
          this.dataSource = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    update() {
      this.query();
    },
    handleSelectionChange() {}
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
