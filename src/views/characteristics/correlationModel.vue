<!--特征关联模型页面 -->
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
              <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>

      <el-card class="box-card2">
           <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false" :height="height"
              :hasSelection="false" :hasPagination="false" :total="total" @pageChange="pageChange" :loading="loading" style="margin-left:10px;"> </myTable>
      </el-card>

  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getCorrelationModel } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      total: 100,
      height: 650,
      testForm: {
        transferFactor: "",
        initialJudgment: "",
        finalScore: ""
      },
      columns: [
        {
          prop: "feature_name",
          label: "特征字段",
          isShow: true
        },
        {
          prop: "a",
          label: "关联转移因子",
          isShow: true,
          render: function(v, param) {
            return "是";
          }
        },
        {
          prop: "status",
          label: "关联相似度对比",
          isShow: true,
          render: function(v, param) {
            let html = "";
            if (param.row.status === 1) {
              html = "是";
            } else {
              html = "否";
            }
            return html;
          }
        },
        {
          prop: "sum_of_iv",
          label: "关联最终评分",
          isShow: true,
          render: function(v, param) {
            let html = "";
            if (param.row.sum_of_iv > 0.0) {
              html = "是";
            } else {
              html = "否";
            }
            return html;
          }
        }
        // {
        //   prop: "e",
        //   label: "是否进入决策模型",
        //   isShow: true
        // }
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
      getCorrelationModel()
        .then(res => {
          console.log(res);
          this.loading = false;
          // this.total = res.total;
          this.dataSource = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {},
    onSubmit(testForm) {
      // console.log(testForm);
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
</style>
