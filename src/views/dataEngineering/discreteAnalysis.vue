<!--特征离散分析页面 -->
<template>
    <div class="table">
     <!-- 表单 -->
      <el-card class="box-card" style="margin-bottom:20px">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="特征字段:" prop="featureField">
              <el-input v-model="testForm.featureField"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>

 <el-card class="box-card2">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="background-color:#091938;margin-left:13px;">
        <el-tab-pane label="图表" name="1">
          <div ref="chart2" style="width:1600px;height: 500px;" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
         element-loading-background="rgba(9, 25, 56, 0.8)" v-loading="chartLoading"></div>
        </el-tab-pane>
        <!-- 箱线图表 end -->

         <el-tab-pane label="报表" name="2">
             <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false" :height="height"
              :hasSelection="false" :hasPagination="false" :total="tableTotal" :loading="tableLoading"> </myTable>
        </el-tab-pane>
        <!-- 报表 end -->
      </el-tabs>
 </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import myTable from "@/components/myTable";
import { getDiscreteAnalysis } from "@/api/login.js";
import { tabType } from "../characteristics/util.js";

export default {
  components: { myTable },
  data() {
    return {
      height: 600,
      tableLoading: false,
      chartLoading: false,
      activeName: "1",
      tableTotal: 100,
      tableLoading: false,
      chartLoading: false,
      tab: "",
      testForm: {
        featureField: ""
      },
      columns: [
        {
          prop: "featureField",
          label: "特征字段",
          width: 300,
          isShow: true
        },
        {
          prop: "featureFieldTotal",
          label: "特征样本个数",
          isShow: true
        },
        {
          prop: "missingTotal",
          label: "特征样本缺失个数",
          isShow: true
        },
        {
          prop: "mode",
          label: "众数",
          isShow: true
        },
        {
          prop: "average",
          label: "平均数",
          isShow: true,
          render: function(v, param) {
            return param.row.average;
          }
        },
        {
          prop: "median",
          label: "中位数",
          isShow: true
        },
        {
          prop: "featureFieldMax",
          label: "最大值",
          isShow: true
        },
        {
          prop: "featureFieldMin",
          label: "最小值",
          isShow: true
        }
      ],
      dataSource: [],
      chartDataOne: [
        // [655, 850, 940, 980, 1070], //分别是表示下边缘,下四分位数，中位数，上四分位数，上边缘
        // [760, 800, 845, 885, 960],
      ],
      //异常值数据
      outliers: [
        // [0, 650, 620, 500], // 0代表第几个字段
        // [1, 620],
      ],
      xAxisData: []
    };
  },
  mounted() {
    this.initEchart();
    this.query();
  },
  methods: {
    // 切换tab
    handleClick(tab) {
      this.tab = tabType(tab.name);
      if (this.tab === "chart") {
        this.initEchart();
      } else {
        this.query();
      }
    },
    //过滤报表数据
    filterTable(data) {
      const result = data.map(item => {
        return {
          featureField: item.name, //特征字段
          featureFieldTotal: item.featureFieldTotal, //特征样本个数
          missingTotal: item.missingTotal, //特征样本缺失个数
          mode: item.mode, //众数
          average: item.average, //平均数
          median: item.median, //中位数
          featureFieldMax: item.featureFieldMax, //最大值
          featureFieldMin: item.featureFieldMin //最小值
        };
      });
      return result;
    },
    // 过滤图表数据
    filterData(data) {
      const chartData = data.map(item => {
        return [
          item.edgeLow,
          item.quantileUp,
          item.median,
          item.quantileLow,
          item.edgeUp
        ];
      });
      const xAxisData = data.map(item => {
        return item.name;
      });
      const outliers = data.map((item, i) => {
        const qutlierList = JSON.parse(item.qutlierList);
        return qutlierList.map(q => {
          return [i, q];
        });
      });
      return { chartData, xAxisData, outliers };
    },
    // 查询列表
    query() {
      this.tableLoading = true;
      let params = {
        orders: "ins_time",
        size: 72
      };
      getDiscreteAnalysis(params)
        .then(res => {
          this.tableLoading = false;
          this.dataSource = this.filterTable(res.data.records);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 初始化相信图
    initEchart() {
      this.chartLoading = true;
      let chart2 = this.$refs.chart2;
      let echart = echarts.init(chart2);
      let params = {
        orders: "ins_time",
        size: 72
      };
      getDiscreteAnalysis(params)
        .then(res => {
          this.chartLoading = false;
          this.chartDataOne = this.filterData(res.data.records).chartData; //数据
          this.xAxisData = this.filterData(res.data.records).xAxisData; //x轴标题
          const outliers = this.filterData(res.data.records).outliers;
          const data = [];
          outliers.forEach(item => {
            item.forEach(i => {
              data.push(i);
            });
          });
          this.outliers = data; //异常值
          // 解决刷新页面，不显示echarts（数据发生变化，更新dom）
          // this.$nextTick(_ => {
          let chart2 = this.$refs.chart2;
          let echart = echarts.init(chart2);
          echart.setOption({
            dataZoom: [
              {
                xAxisData: [0]
              }
            ],
            title: [
              {
                text: "箱线图",
                left: "center",
                textStyle: {
                  color: "rgb(126, 203, 224)"
                }
              }
            ],
            tooltip: {
              trigger: "item",
              axisPointer: {
                type: "shadow"
              }
            },
            //grid可以调整x，y轴的字与Zoom控件之间的间隔
            grid: {
              left: "10%",
              right: "10%",
              bottom: "20%"
            },
            xAxis: {
              type: "category",
              data: this.xAxisData,
              boundaryGap: true,
              nameGap: 30,
              splitArea: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "rgb(126, 203, 224)"
                },
                formatter: "{value}"
              },
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: "value",
              // name: "Y轴值",
              splitArea: {
                show: true
              },
              axisLabel: {
                textStyle: {
                  color: "rgb(126, 203, 224)"
                }
              }
            },
            series: [
              {
                name: "boxplot",
                type: "boxplot",
                data: this.chartDataOne,
                tooltip: {
                  formatter: function(param) {
                    return [
                      "特征字段 :" + param.name,
                      "上边缘: " + param.data[5],
                      "上四分位数: " + param.data[4],
                      "中位数: " + param.data[3],
                      "下四分位数: " + param.data[2],
                      "下边缘: " + param.data[1]
                    ].join("<br/>");
                  }
                }
                // background: "#091938" //柱子背景颜色
              },
              {
                name: "outlier",
                type: "scatter",
                data: this.outliers, // 异常值数据
                tooltip: {
                  formatter: function(param) {
                    return ["异常值 :" + param.data[1]].join("<br/>");
                  }
                }
              }
            ]
          });
          // });
        })
        .catch(error => {
          console.log(error);
        });
    },
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
  /* background-color: #091938 !important; */
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
