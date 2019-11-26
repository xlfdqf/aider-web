<style scoped>
</style>
<!--特征关联模型页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
      <el-card class="box-card">
          <el-row>
                  <el-col :span="8">
                       <div ref="chart" style="width: 300px; height: 300px"></div>
                </el-col>
              </el-row>
      </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { dataType } from "./util.js";

export default {
  data() {
    return {
      chart: null
    };
  },
  created() {
    this.chart = echarts.init(this.$refs.chart);
    this.chart.setOption({
      tooltip: {},
      xAxis: {
        data: ["0-10", "11-20", "21-30"]
      },
      yAxis: {},
      series: [
        {
          name: "iv值",
          type: "bar",
          data: [5, 20, 36]
        }
      ]
    });
  }
};
</script>

<style scoped>
.tit {
  text-align: center;
  font-size: 14px;
  margin-top: -40px;
}
</style>
