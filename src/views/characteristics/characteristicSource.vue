<!--特征来源页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
      <el-card class="box-card" style="margin-bottom:20px;">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="数据来源:" prop="datasource">
              <el-input v-model="testForm.datasource"></el-input>
            </el-form-item>
            <el-form-item>
             <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>

      <el-card class="box-card2">
           <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false"
              :hasSelection="false" :hasPagination="true" :total="total" @pageChange="pageChange" :loading="loading" style="height:500px;"> </myTable>
      </el-card>

  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getFeatureSource } from "@/api/login.js";
import {} from "./util.js";

export default {
  components: { myTable },
  data() {
    return {
      height: 600,
      loading: false,
      total: 0,
      activeName: "first",
      testForm: {
        datasource: ""
      },
      columns: [
        {
          prop: "featureName",
          label: "特征字段",
          isShow: true
        },
        {
          prop: "sourceKey",
          label: "接口名称",
          isShow: true
        },
        {
          prop: "sourceName",
          label: "数据来源",
          isShow: true
        }
      ],
      dataSource: [],
      //所需格式
      dataSource: [
        // { a: "年龄", b: "四要素", c: "同盾" },
        // { a: "芝麻分", b: "四要素", c: "同盾" },
        // { a: "星座", b: "四要素", c: "同盾" }
      ]
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
      getFeatureSource(params)
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
      let params = {
        sourceName: this.testForm.datasource,
        current: page.currentPage,
        size: page.pageSize
      };
      getFeatureSource(params)
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
    onSubmit(testForm) {
      this.loading = true;
      this.testForm.datasource = testForm.datasource;
      let params = { sourceName: this.testForm.datasource };
      getFeatureSource(params)
        .then(res => {
          this.loading = false;
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
