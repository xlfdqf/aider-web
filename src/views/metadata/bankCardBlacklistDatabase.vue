<!--银行卡黑名单库-->
<template>
 <div class="table">
   <!-- 表格 -->
   <el-card class="box-card2">
     <myTable :columns="columns" :dataSource="dataSource" :hasSelection="false" :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading"></myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getidBlacklistDatabase } from "@/api/login.js";
import {
  formatPhone,
  formatIdcard,
  formatBankcard
} from "../sampleManagement/util.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      current: 1,
      size: 10,
      total: 0,
      dataSource: [],
      columns: [
        {
          prop: "name",
          label: "姓名",
          isShow: true
        },
        {
          prop: "mobile",
          label: "手机号码",
          isShow: true,
          render: function(v, param) {
            return formatPhone(param.row.mobile);
          }
        },
        {
          prop: "idcard",
          label: "身份证",
          isShow: true,
          render: function(v, param) {
            return formatIdcard(param.row.idcard);
          }
        },
        {
          prop: "bank",
          label: "银行卡",
          isShow: true,
          render: function(v, param) {
            return formatBankcard(param.row.bank);
          }
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
      let params = { pageIndex: this.current, pageSize: this.size };
      getidBlacklistDatabase(params)
        .then(res => {
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
      let params = { pageIndex: page.currentPage, pageSize: page.pageSize };
      getidBlacklistDatabase(params)
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
