<!--阈值页面-->
<template>
 <div class="table">
   <el-card class="box-card2">
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading">
     </myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getThresholdValue } from "@/api/login.js";
import moment from "moment";
export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      total: 0,
      columns: [
        {
          prop: "dt",
          label: "日期",
          isShow: true,
          render: function(v, param) {
            return moment(param.row.dt).format("YYYY-MM-DD");
          }
        },
        {
          prop: "threshold",
          label: "阈值",
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
    query() {
      this.loading = true;
      //   let params = { pageIndex: 1, pageSize: 10 };
      getThresholdValue()
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    pageChange(page) {}
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
.search {
  position: relative;
  padding-top: 5px;
}
.search:hover {
  cursor: pointer;
}
.searchBtn {
  position: absolute;
  top: 0px;
  left: 20px;
  color: #7ecbe0;
}
.el-button--text {
  color: #7ecbe0;
}
</style>
