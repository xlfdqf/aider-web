<!--模型结果展示评分卡页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
 <el-card class="box-card" style="margin-bottom:20px;height:138px;">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
            <el-form-item label="初次判断:" prop="judge">
              <el-input v-model="testForm.judge"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="search" @click="onSubmit(testForm)" style="float:left"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>

 <el-card class="box-card2">
    <myTable :columns="columns" :dataSource="dataSource"  :hasPagination="true"
      :total="total" @pageChange="pageChange">
       <el-table-column slot="operate" label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="details(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
     </myTable>
 </el-card>
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getScoreCard2 } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      height: 600,
      loading: false,
      total: 0,
      testForm: {
        judge: ""
      },
      columns: [
        {
          prop: "name",
          label: "姓名",
          isShow: true
        },
        {
          prop: "total",
          label: "最终分数",
          isShow: true
        },
        {
          prop: "transfer",
          label: "转移因子",
          isShow: true
        },
        {
          prop: "a",
          label: "相似度比对",
          isShow: true,
          render: function(v, param) {
            return "是";
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
      getScoreCard2()
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
      getScoreCard2(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //详情
    details(row) {
      localStorage.setItem("row", JSON.stringify(row));
      this.$router.push({
        path: "scoreCardDetails"
      });
    },
    //搜索
    onSubmit(testForm) {
      console.log(testForm);
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
