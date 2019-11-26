<!--特征分布分析页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
      <el-card class="box-card" style="margin-bottom:20px">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="特征字段:" prop="feature_field">
              <el-input v-model="testForm.feature_field"></el-input>
            </el-form-item>
            <el-form-item>
             <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>
      
       <el-card class="box-card2">
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card" class="box-card2">
           <el-tab-pane label="图表" name="1">
          <div v-loading="chartLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
         element-loading-background="#091938" style="height:750px;">
             <el-row  style="overflow-y:auto;height:720px;overflow-x:hidden;">
                <div v-for="item in chartData" :key="item.id">
                  <el-col :span="12"><div> <ve-histogram :extend="chartExtend" :settings="chartSettings" v-loading="chartLoading"  :data="item" ref="chart2"></ve-histogram><p class="tit2">{{item.name}}</p></div></el-col>
                </div>
              </el-row>
               </div>
        </el-tab-pane>
        
        <el-tab-pane label="报表" name="2">
             <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false" :height="height"
              :hasSelection="false" :hasPagination="false" :total="tableTotal" @pageChange="pageChange" :loading="tableLoading"> </myTable>
        </el-tab-pane>
        <!-- 报表 end -->

        <!-- 柱状图表 end -->
      </el-tabs>
       </el-card>
      <el-tooltip placement="top" content="回到顶部">
      <nx-back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></nx-back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import nxBackToTop from "@/components/nx-back-to-top";
import {
  getAnalysisDistribution,
  searchAnalysisDistribution
} from "@/api/login.js";
import { tabType, sortBucket } from "./util.js";
import "echarts/lib/component/dataZoom"; //区域缩放组件

export default {
  components: { myTable, nxBackToTop },
  data() {
    this.chartExtend = {
      series: {
        label: {
          show: true,
          position: "top"
        }
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
    // 区域缩放
    this.dataZoom = [
      {
        type: "slider",
        start: 0,
        end: 20
      }
    ];
    this.chartSettings = {
      labelMap: {
        total: "每箱个数",
        proportion: "每箱比例"
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
      height: 650,
      tableLoading: false,
      chartLoading: false,
      dataEmpty: false, //暂无数据
      activeName: "1",
      tableTotal: 100,
      chartTotal: 100,
      currentPage: 1,
      tab: "",
      testForm: {
        feature_field: ""
      },
      columns: [
        {
          prop: "featureField",
          label: "特征字段",
          isShow: true
        },
        {
          prop: "bucket",
          label: "特征分箱结果",
          isShow: true,
          render: function(v, param) {
            return param.row.bucket.map(item => {
              return <div>{item}</div>;
            });
          }
        },
        {
          prop: "total",
          label: "每箱个数",
          isShow: true,
          render: function(v, param) {
            return param.row.total.map(item => {
              return <div>{item}</div>;
            });
          }
        },
        {
          prop: "proportion",
          label: "每箱比例",
          isShow: true,
          render: function(v, param) {
            return param.row.proportion.map(item => {
              return <div>{item}</div>;
            });
          }
        }
      ],
      dataSource: [],
      // 循环所需数据格式
      chartData: []
    };
  },
  created() {
    this.queryEcharts();
    this.queryTable();
  },
  methods: {
    //去重对象数组
    noRepeat(arr, type) {
      var newArr = [];
      var tArr = [];
      if (arr.length == 0) {
        return arr;
      } else {
        if (type) {
          for (var i = 0; i < arr.length; i++) {
            if (!tArr[arr[i][type]]) {
              newArr.push(arr[i]);
              tArr[arr[i][type]] = true;
            }
          }
          return newArr;
        } else {
          for (var i = 0; i < arr.length; i++) {
            if (!tArr[arr[i]]) {
              newArr.push(arr[i]);
              tArr[arr[i]] = true;
            }
          }
          return newArr;
        }
      }
    },
    //过滤table报表数据
    filterTable(data) {
      const types = data.map(item => {
        return {
          featureField: item.featureName,
          featureFieldEng: item.featureField,
          bucket: [],
          total: [],
          proportion: []
        };
      });
      data.map(item => {
        types.forEach((t, i) => {
          if (item["featureField"] === t["featureFieldEng"]) {
            t.bucket.push(item.bucket);
            t.total.push(item.total);
            t.proportion.push(item.proportion);
          }
        });
      });
      return types;
    },
    // 过滤charts图表数据
    filterData(data) {
      const types = data.map(item => {
        return {
          name: item.featureName,
          featureFieldEng: item.featureField,
          columns: ["bucket", "total", "proportion"],
          rows: []
        };
      });
      data.map(item => {
        types.forEach((t, i) => {
          if (item["featureField"] === t["featureFieldEng"]) {
            t.rows.push({
              bucket: item.bucket,
              total: item.total,
              proportion: item.proportion
            });
          }
        });
      });
      return types;
    },
    // 切换tab
    handleClick(tab) {
      this.tab = tabType(tab.name);
      if (this.tab === "chart") {
        this.queryEcharts();
      } else {
        this.queryTable();
      }
    },
    // 查询报表
    queryTable() {
      this.tableLoading = true;
      getAnalysisDistribution()
        .then(res => {
          this.tableLoading = false;
          const types = this.filterTable(sortBucket(res.data));
          this.dataSource = this.noRepeat(types, "featureFieldEng");
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询图表
    queryEcharts() {
      this.chartLoading = true;
      getAnalysisDistribution()
        .then(res => {
          this.chartLoading = false;
          const types = this.filterData(sortBucket(res.data));
          this.chartData = this.noRepeat(types, "featureFieldEng");
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {},
    // 图表分页
    handleCurrentChange(e) {},
    onSubmit(testForm) {
      this.tableLoading = true;
      let params = { feature_field: testForm.feature_field };
      searchAnalysisDistribution(params)
        .then(res => {
          this.tableLoading = false;
          //报表
          const table = this.filterTable(res.data);
          this.dataSource = [table[0]];
          //图表
          const chart = this.filterData(res.data);
          this.chartData = [chart[0]];
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  // 解决初次点击tab charts不显示问题
  // watch: {
  //   activeName(v) {
  //     this.$nextTick(_ => {
  //       let ref = this.$refs[`chart${v}`];
  //       if (ref) {
  //         ref.forEach(item => {
  //           item.echarts.resize();
  //         });
  //       } else {
  //       }
  //     });
  //   }
  // }
};
</script>

<style scoped>
.tit2 {
  text-align: center;
  font-size: 14px;
  margin-top: -40px;
  color: rgb(126, 203, 224);
}
.box-card {
  background-image: url("../../assets/images/home/topBg2.png");
  background-size: cover;
}
.table >>> .box-card2 {
  background-color: #091938 !important;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.search:hover {
  cursor: pointer;
}
</style>
