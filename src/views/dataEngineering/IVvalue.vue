<!--特征iv值页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
      <el-card class="box-card" style="margin-bottom:20px;height:138px;">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
            <el-form-item label="特征字段:" prop="feature_field">
              <el-input v-model="testForm.feature_field"></el-input>
            </el-form-item>
            <el-form-item>
               <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/></div>
            </el-form-item>
          </el-form>
      </el-card>

      <el-card class="box-card2">
        <el-row>
          <el-col :span="12"><div style="margin-left:10px;">
              <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false"  :height="height"
              :hasSelection="false" :hasPagination="false"  @pageChange="pageChange" :total="total" :loading="tableLoading" > </myTable></div>
         </el-col>
         <!-- 报表 end -->
          <el-col :span="12"><div>
             <ve-bar :data="chartData" :settings="chartSettings" :extend="chartExtend" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
         element-loading-background="rgba(9, 25, 56, 0.8)" v-loading="chartLoading" :data-zoom="dataZoom"></ve-bar> <!--排序条形图-->
          </div>
          </el-col>
          <!-- 图表 end -->
        </el-row>
      </el-card>
      <el-tooltip placement="top" content="回到顶部">
      <nx-back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></nx-back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import nxBackToTop from "@/components/nx-back-to-top";
import { getIVvalue, searchIVvalue } from "@/api/login.js";
import { tabType } from "../characteristics/util.js";

export default {
  components: { myTable, nxBackToTop },
  data() {
    this.dataZoom = [
      {
        type: "slider",
        yAxisIndex: [0],
        filterMode: "empty",
        start: 80,
        end: 100
      }
    ];
    this.chartExtend = {
      series: {
        color: "rgb(126, 203, 224)" //柱子背景颜色
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "rgb(126, 203, 224)"
          }
        }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "rgb(126, 203, 224)"
          }
        }
      },
      legend: {
        textStyle: {
          color: "rgb(126, 203, 224)" //图例字体颜色
        }
      }
    };
    this.chartSettings = {
      labelMap: {
        sum_of_iv: "每箱iv值"
      },
      metrics: ["sum_of_iv"],
      dataOrder: {
        label: "sum_of_iv",
        order: "desc"
      }
    };
    this.extend = {
      series: {
        label: { show: true, position: "right" }
      }
    };
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中
        background: "#e7eaf1" // 按钮的背景颜色
      },
      height: 600,
      hasPagination: true,
      tableLoading: false,
      chartLoading: false,
      total: 0,
      testForm: {
        feature_field: ""
      },
      columns: [
        {
          prop: "feature_name",
          label: "特征字段",
          isShow: true
        },
        {
          prop: "feature_field",
          label: "字段名称",
          isShow: true
        },
        {
          prop: "sum_of_iv",
          label: "IV值",
          isShow: true
        }
      ],
      dataSource: [],
      chartData: {
        columns: ["feature_name", "sum_of_iv"],
        rows: []
      }
    };
  },
  created() {
    this.queryTable();
    this.queryEcharts();
  },
  methods: {
    // 查询列表
    queryTable() {
      this.tableLoading = true;
      // let params = { current: 1, size: 10 };
      getIVvalue()
        .then(res => {
          this.tableLoading = false;
          // this.total = res.data.total;
          this.dataSource = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询图表
    queryEcharts() {
      this.chartLoading = true;
      getIVvalue()
        .then(res => {
          this.chartLoading = false;
          const data = res.data;
          data.forEach(item => {
            this.chartData.rows.push({
              feature_name: item.feature_name,
              sum_of_iv: item.sum_of_iv
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 表格页码切换
    pageChange(page) {
      // this.tableLoading = true;
      // this.chartLoading = true;
      // let params = { current: page.currentPage, size: page.pageSize };
      // getIVvalue(params)
      //   .then(res => {
      //     //报表数据
      //     this.tableLoading = false;
      //     this.chartLoading = false;
      //     this.chartTotal = res.data.total;
      //     this.dataSource = res.data.records;
      //     //图表数据
      //     this.chartLoading = false;
      //     const data = res.data.records;
      //     this.chartData.rows = [];
      //     data.forEach(item => {
      //       this.chartData.rows.push({
      //         feature_name: item.feature_name,
      //         sum_of_iv: item.sum_of_iv
      //       });
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    onSubmit(testForm) {
      this.tableLoading = true;
      let params = { feature_field: testForm.feature_field };
      searchIVvalue(params)
        .then(res => {
          this.tableLoading = false;
          //报表数据
          this.dataSource = res.data;
          this.hasPagination = false;
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
