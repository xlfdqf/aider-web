<!-- 权限管理页面-->
<template>
 <div class="table">
   <el-card class="box-card" style="margin-bottom:20px;height:138px;">
      <!-- 表单 -->
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
        <el-form-item label="名称:" prop="role">
          <el-input v-model="testForm.role"></el-input>
        </el-form-item>
         <el-form-item>
          <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
        </el-form-item>
      </el-form>
   </el-card>

   <el-card class="box-card2">
     <!-- 表格 -->
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading">
     </myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getLog } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      current: 1,
      size: 10,
      loading: false,
      total: 0,
      testForm: {
        role: ""
      },
      columns: [
        {
          prop: "title",
          label: "名称",
          isShow: true
        },
        {
          prop: "requestUri",
          label: "请求接口",
          isShow: true
        },
        {
          prop: "method",
          label: "请求方式",
          isShow: true
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
      let params = { pageIndex: this.current, pageSize: this.size };
      getLog(params)
        .then(res => {
          // console.log("日志：", res);
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {
      this.loading = true;
      this.current = page.currentPage;
      this.size = page.pageSize;
      let params = { pageIndex: this.current, pageSize: this.size };
      getLog(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜索
    onSubmit() {}
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
.search {
  position: relative;
  padding-top: 5px;
}
.search:hover {
  cursor: pointer;
}
</style>
