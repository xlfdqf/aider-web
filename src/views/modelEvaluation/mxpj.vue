<!-- 模型评价页面-->
<template>
  <div class="table">
         <!-- 表单 -->
      <el-card class="box-card" style="margin-bottom:20px">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="日期:" prop="date">
              <el-input v-model="testForm.date"></el-input>
            </el-form-item>
            <el-form-item>
             <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/> </div>
            </el-form-item>
          </el-form>
      </el-card>

 <el-card class="box-card2">
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card" class="box-card2">
          <el-tab-pane label="图表" name="1" ref="tab2"> 
           <div v-loading="chartLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(9, 25, 56, 0.8)">
              <!-- 按月、年统计tab -->
                        <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend" ref="chart1"></ve-line>
               <!-- <el-tabs v-model="activeName2" @tab-click="handleClick2"  type="border-card" class="box-card2">
                   <el-tab-pane label="按月统计" name="1">
                       <div class="title">上个月样本反馈<div class="areaName">曲线面积</div></div>
                        <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend" ref="chart1"></ve-line>
                   </el-tab-pane>
                   <el-tab-pane label="按年统计" name="2">
                      <div class="title">全年数据统计<div class="areaName">曲线面积</div></div>
                      <ve-line :data="chartData2" :settings="chartSettings" :extend="chartExtend" ref="chart2"></ve-line>
                   </el-tab-pane>
               </el-tabs> -->
              <!-- 按月、年统计tab -->
           </div>
        </el-tab-pane>

        <el-tab-pane label="报表" name="2" ref="tab1">
             <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false"
              :hasSelection="false" :hasPagination="false" :total="tableTotal" @pageChange="pageChange" :loading="tableLoading"> </myTable>
        </el-tab-pane>
        <!-- 报表 end -->

      
        <!-- 柱状图表 end -->
      </el-tabs>
 </el-card>
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getMxpjTable, getMxpjChart } from "@/api/login.js";
import { tabType, tabType2 } from "../characteristics/util.js";
import moment from "moment";

export default {
  components: { myTable },
  data() {
    this.chartSettings = {
      area: true,
      // axisSite: { right: ["number"] },
      xAxisName: ["日期"],
      yAxisName: ["曲线面积"],
      labelMap: {
        areaUnderCurve: "曲线面积"
      }
    };
    this.chartExtend = {
      xAxis: {
        nameTextStyle: {
          color: "rgb(126, 203, 224)"
        },
        axisLabel: {
          textStyle: {
            color: "rgb(126, 203, 224)"
          }
        }
      },
      yAxis: {
        nameTextStyle: {
          color: "rgb(126, 203, 224)"
        },
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
    return {
      tableLoading: false,
      chartLoading: false,
      activeName: "1",
      tableTotal: 0,
      chartTotal: 100,
      currentPage: 1,
      tab: "",
      testForm: { date: "" },
      columns: [
        {
          prop: "dt",
          label: "日期",
          isShow: true
          // render: function(v, param) {
          //   return moment(param.row.dt).format("YYYY-MM-DD");
          // }
        },
        {
          prop: "areaUnderCurve",
          label: "roc曲线面积",
          isShow: true
        },
        {
          prop: "a",
          label: "是否属于正常范围",
          isShow: true,
          render: function(v, param) {
            if (param.row.areaUnderCurve > 0.5) {
              return "是";
            } else {
              return "否";
            }
          }
        }
      ],
      // 表格所需数据格式
      dataSource: [],
      // echart所需数据格式
      chartData: {
        columns: ["dt", "areaUnderCurve"],
        rows: [
          // { dt: "1", areaUnderCurve: 0.23},
        ]
      }
    };
  },
  mounted() {
    this.queryEcharts();
    this.queryTable();
  },
  methods: {
    // 查询table报表
    queryTable() {
      this.tableLoading = true;
      getMxpjTable()
        .then(res => {
          this.tableLoading = false;
          this.dataSource = res.data.records;
          this.tableTotal = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询曲线图表
    queryEcharts() {
      this.chartLoading = true;
      getMxpjTable()
        .then(res => {
          this.chartLoading = false;
          this.chartData.rows = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
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
    handleClick2(tab) {
      this.tab = tabType2(tab.name);
      if (this.tab === "month") {
      } else {
      }
    },
    // 表格页码切换
    pageChange(page) {},
    // 图表分页
    onSubmit(testForm) {
      // console.log(testForm);
    }
  },
  // 解决初次点击tab charts不显示问题
  watch: {
    activeName(v) {
      this.$nextTick(_ => {
        this.$refs.chart1.echarts.resize();
      });
    }
  }
};
</script>

<style scoped>
.tit {
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
.title {
  width: 100%;
  height: auto;
  padding: 10px;
  border: 10px solid #0c2a4d;
  color: rgb(126, 203, 224);
}
.areaName {
  float: right;
}
.areaName:after {
  content: "";
  display: table;
  width: 15px;
  height: 15px;
  background: #159c8b;
  border-radius: 50%;
  position: relative;
  left: -20px;
  top: -15px;
}
</style>
