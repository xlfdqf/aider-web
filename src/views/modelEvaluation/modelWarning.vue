<!--模型预警页面-->
<template>
 <div class="table">
   <el-card class="box-card" style="margin-bottom:20px">
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
        <el-form-item label="日期:" prop="date">
          <el-input v-model="testForm.date"></el-input>
        </el-form-item>
         <el-form-item>
          <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
        </el-form-item>
      </el-form>
   </el-card>
   <el-card class="box-card2">
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="false" :height="height"
      :total="total" @pageChange="pageChange" :loading="loading">
     </myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getMxpjTable } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      height: 650,
      loading: false,
      total: 0,
      testForm: {
        date: ""
      },
      columns: [
        {
          prop: "dt",
          label: "日期",
          isShow: true
        },
        {
          prop: "areaUnderCurve",
          label: "roc曲线面积",
          isShow: true
        },
        {
          prop: "a",
          label: "预警强度",
          isShow: true,
          render: function(v, param) {
            const params = param.row.areaUnderCurve;
            if (params < 0.15) {
              return "严重预警";
            } else if (0.15 < params < 0.3) {
              return "中度预警";
            } else if (0.3 < params < 0.5) {
              return "轻度预警";
            } else {
              return "正常";
            }
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
    query() {
      this.loading = true;
      getMxpjTable()
        .then(res => {
          this.loading = false;
          this.dataSource = res.data.records;
          this.tableTotal = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    pageChange(page) {
      let params = { pageIndex: page.currentPage, pageSize: page.pageSize };
    },
    onSubmit(formName) {
      //   console.log(formName.date);
    }
  }
};
</script>

<style scoped>
.box-card {
  background-image: url("../../assets/images/home/topBg2.png");
  background-size: cover;
}
.table >>> .box-card2 {
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: cover;
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
