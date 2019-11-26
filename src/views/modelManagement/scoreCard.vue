<!--模型管理评分卡页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
 <el-card class="box-card" style="margin-bottom:20px;height:138px;">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
            <el-form-item label="转移因子:" prop="transferFactor">
              <el-input v-model="testForm.transferFactor"></el-input>
            </el-form-item>
             <el-form-item label="初次判断:" prop="initialJudgment">
              <el-input v-model="testForm.initialJudgment"></el-input>
            </el-form-item>
             <el-form-item label="最终评分:" prop="finalScore">
              <el-input v-model="testForm.finalScore"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/></div>
            </el-form-item>
          </el-form>
      </el-card>

      <el-card class="box-card2">
           <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false" :height="height"
              :hasSelection="false" :hasPagination="true" :total="total" @pageChange="pageChange" :loading="loading" style="margin-left:10px;"> </myTable>
      </el-card>

  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getScoreCard } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      height: 620,
      loading: false,
      total: 0,
      testForm: {
        transferFactor: "",
        initialJudgment: "",
        finalScore: ""
      },
      columns: [
        {
          prop: "featureName",
          label: "特征字段",
          isShow: true
        },
        {
          prop: "sum_of_iv",
          label: "IV值",
          isShow: true
        },
        {
          prop: "buckets",
          label: "分箱结果",
          isShow: true,
          render: function(v, param) {
            return param.row.buckets.map(item => {
              return <div>{item}</div>;
            });
          }
        },
        {
          prop: "a",
          label: "关联转移因子",
          isShow: false
        },
        {
          prop: "b",
          label: "关联初次判断",
          isShow: true,
          render: function(v, param) {
            if (param.row.sum_of_iv > 0) {
              return "是";
            } else {
              return "否";
            }
          }
        },
        {
          prop: "status",
          label: "关联最终评分",
          isShow: true,
          render: function(v, param) {
            if (param.row.status > 1) {
              return "是";
            } else {
              return "否";
            }
          }
        }
      ],
      dataSource: []
    };
  },
  created() {
    this.query();
  },
  methods: {
    // 查询列表
    query() {
      this.loading = true;
      let params = { current: 1, size: 10 };
      getScoreCard()
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
      this.loading = true;
      let params = { current: page.currentPage, size: page.pageSize };
      getScoreCard(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    onSubmit(testForm) {}
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
</style>
