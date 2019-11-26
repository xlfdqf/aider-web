<!--模型结果展示评分卡详情页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
     <el-card class="box-card" style="margin-bottom:20px">
      <h4 style="text-align:center;color:#7ECBE0"><span style="margin-right:30px">用户姓名：{{userName}}</span> <span style="margin-right:30px">身份证号:{{idcard | formatIdcard}}</span><span>最终得分:{{score}}</span></h4>
    </el-card>

 <el-card class="box-card2">
    <myTable :columns="columns" :dataSource="dataSource"  :hasPagination="false" :total="total" @pageChange="pageChange" :height="heihgt" :loading="loading">
     </myTable>
 </el-card> 
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getScoreCard2Details } from "@/api/login.js";
import { formatIdcard } from "../sampleManagement/util.js";
export default {
  components: { myTable },
  data() {
    return {
      heihgt: 650,
      loading: false,
      total: 0,
      userName: "",
      score: "",
      orderno: "",
      idcard: "",
      columns: [
        {
          prop: "name",
          label: "特征名称",
          isShow: true
        },
        {
          prop: "iv",
          label: "特征iv值",
          isShow: true
        },
        {
          prop: "featureFieldValue",
          label: "特征值",
          isShow: true
        },
        {
          prop: "score",
          label: "获得分数",
          isShow: true
        }
      ],
      dataSource: []
    };
  },
  filters: {
    formatIdcard
  },
  created() {
    let row = JSON.parse(localStorage.getItem("row"));
    this.orderno = row.orderno;
    // console.log(row);
    this.userName = row.name;
    this.score = row.total;
    this.query();
  },
  methods: {
    // 查询列表
    query() {
      this.loading = true;
      let params = { orderno: this.orderno };
      getScoreCard2Details(params)
        .then(res => {
          this.loading = false;
          this.dataSource = res.data;
          this.idcard = res.data[0].idcard;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {
      //   this.loading = true;
      let params = {};
      //   getScoreCard2Details(params)
      //     .then(res => {})
      //     .catch(error => {
      //       console.log(error);
      //     });
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
</style>
