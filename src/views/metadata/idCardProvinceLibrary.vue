<!--身份证号段省级归属库-->
<template>
 <div class="table">
    <!-- 表单 -->
   <el-card class="box-card" style="margin-bottom:20px;height:138px;">
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
        <el-form-item label="身份证号段:" prop="idCard">
          <el-input v-model="testForm.idCard"></el-input>
        </el-form-item>
         <el-form-item>
          <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
        </el-form-item>
      </el-form>
   </el-card>
   <!-- 表格 -->
   <el-card class="box-card2">
     <myTable :columns="columns" :dataSource="dataSource" :hasSelection="false" :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading"></myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getidCardProvinceLibrary } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      current: 1,
      size: 10,
      total: 0,
      testForm: {
        idCard: ""
      },
      dataSource: [],
      columns: [
        {
          prop: "code",
          label: "身份证号段",
          isShow: true
        },
        {
          prop: "name",
          label: "省级",
          isShow: true
        }
      ]
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    // 查询列表
    query() {
      this.loading = true;
      let params = { current: this.current, size: this.size };
      getidCardProvinceLibrary(params)
        .then(res => {
          this.loading = false;
          // console.log("列表:", res);
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {
      let params = { current: page.currentPage, size: page.pageSize };
      getidCardProvinceLibrary(params)
        .then(res => {
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
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
