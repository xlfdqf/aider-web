<template>
  <div class="table">
    <el-card>
      <el-row>
        <el-col :span="9" style="height:400px">
          <div class="item">
            <p>历史用户统计</p>
            <el-col :span="8" class="item-content">
              <div class="circle">
                <div class="big"></div>
                <div class="small"></div>
                   <p>优质用户</p>
                   <p style="top:65px;">23500</p>
              </div>
            </el-col>
            <el-col :span="8" class="item-content">
              <div class="circle">
                <div class="big"></div>
                <div class="small" style=" border: 10px solid #FF9745; border-bottom-color: transparent;"></div>
                <p style="color:#FF9745;">可疑用户</p>
                <p style="color:#FF9745;top:65px;">2350</p>
              </div>
            </el-col>
            <el-col :span="8" class="item-content">
              <div class="circle">
                <div class="big"></div>
                <div class="small" style=" border: 10px solid #A859FF; border-bottom-color: transparent;"></div>
                <p style="color:#A859FF;">劣质用户</p>
                 <p style="color:#A859FF;top:65px;">235</p>
              </div>
            </el-col>
          </div>
          </el-col>
        <el-col :span="6">
          <div class="item">
            <p>当前最重要特征iv值</p>
             <el-col :span="24"><p>缴纳保险月份数：<span>0.58</span></p></el-col>
             <el-col :span="24"><p>缴纳保险月份数：<span>0.58</span></p></el-col>
            <el-col :span="24"><p>缴纳保险月份数：<span>0.58</span></p></el-col>
            <el-col :span="24"><p>缴纳保险月份数：<span>0.58</span></p></el-col>
            <el-col :span="24"><p>缴纳保险月份数：<span>0.58</span></p></el-col>
          </div>
          </el-col>
        <el-col :span="9">
            <div class="item">
             <p>昨日样本分布 </p>
              <el-col :span="8" class="water">
               <p style="color:#40B1F9">优质用户</p>
                <div class="container">
                  <div class="wave">
                    <span>50%</span>
                    </div>
                </div>
              </el-col>
              <el-col :span="8" class="water">
                <p style="color:#FF9745">可疑用户</p>
                <div class="container" style="border: 5px solid #FF9745;">
                  <div class="wave" style="background: rgba(215,128,60,1);">
                    <span style="color:#FF9745">50%</span>
                    </div>
                </div>
              </el-col>
              <el-col :span="8" class="water">
                <p style="color:#A859FF">劣质用户</p>
                <div class="container" style="border: 5px solid #A859FF;">
                  <div class="wave" style="background: rgba(130,72,195,1);">
                    <span style="color:#A859FF">50%</span>
                    </div>
                </div>
              </el-col>
            </div>
        </el-col>
      </el-row>
      <!--第二部分 图表 -->
       <el-row>
         <el-col :span="12">
            <div class="item">
              <p>上个月样本反馈</p>
               <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>
            </div>
         </el-col>
          <el-col :span="12">
            <div class="item">
              <p>全年数据统计</p>
              <ve-histogram :data="chartData2" :settings="chartSettings2" :extend="chartExtend"></ve-histogram>
            </div>
         </el-col>
       </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "report",
  data() {
    this.chartSettings = {
      area: true,
      axisSite: { right: ["bad"] },
      xAxisName: ["日期"],
      yAxisName: ["个数", "个数"],
      labelMap: {
        good: "优质用户个数",
        bad: "劣质用户个数"
      }
    };
    this.chartSettings2 = {
      xAxisName: ["日期"],
      yAxisName: ["个数", "个数"],
      labelMap: {
        good: "优质用户",
        grey: "可疑用户",
        bad: "劣质用户"
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
      chartData: {
        columns: ["date", "good", "bad"],
        rows: [
          { date: "1", good: 1, bad: 1093 },
          { date: "2", good: 3530, bad: 3230 },
          { date: "3", good: 2923, bad: 2623 },
          { date: "4", good: 1723, bad: 1423 },
          { date: "5", good: 3792, bad: 3492 },
          { date: "6", good: 4593, bad: 4293 }
        ]
      },
      chartData2: {
        columns: ["date", "good", "grey", "bad"],
        rows: [
          { date: "1月", good: 1, grey: 555, bad: 1093 },
          { date: "2月", good: 3530, grey: 1000, bad: 3230 },
          { date: "3月", good: 2923, grey: 888, bad: 2623 },
          { date: "4月", good: 1723, grey: 766, bad: 1423 },
          { date: "5月", good: 3792, grey: 876, bad: 3492 },
          { date: "6月", good: 4593, grey: 956, bad: 4293 },
          { date: "7月", good: 1, grey: 555, bad: 1093 },
          { date: "8月", good: 3530, grey: 1000, bad: 3230 },
          { date: "9月", good: 2923, grey: 888, bad: 2623 },
          { date: "10月", good: 1723, grey: 766, bad: 1423 },
          { date: "11月", good: 3792, grey: 876, bad: 3492 },
          { date: "12月", good: 4593, grey: 956, bad: 4293 }
        ]
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.table >>> .el-card {
  background-color: #091938;
  border: none;
}
.item {
  height: 400px;
  margin-bottom: 16px;
  border: 1px solid #091938;
  background-color: #080920;
}
.item p {
  text-align: center;
  color: #3fbde0;
  font-weight: bold;
}
.item::after {
  content: "";
  display: block;
  clear: both;
}
/* 镂空圆环效果 */
.circle {
  position: relative;
  box-sizing: border-box;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
}
.big {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: absolute;
  margin: auto;
  /*以下五个属性为水平垂直居中的方法*/
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
}
.small {
  width: 8rem;
  height: 8rem;
  border: 10px solid #40b1f9;
  border-radius: 50%;
  position: absolute;
  margin: auto;
  /*以下五个属性为水平垂直居中的方法*/
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border-bottom-color: transparent;
}
.circle p {
  width: 90px;
  height: auto;
  position: absolute;
  top: 45px;
  left: 37px;
  color: #40b1f9;
  font-weight: bold;
  text-align: center;
}
/* 水波纹效果 */
.water {
  position: relative;
}
.container {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  padding: 5px;
  border: 5px solid #34abff;
  top: 100px;
  left: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.wave {
  position: relative;
  left: -10px;
  width: 100px;
  height: 100px;
  /* background-color: #9dd0f0; */
  background: rgba(53, 139, 201, 1);
  border-radius: 50%;
}
.wave::before,
.wave::after {
  content: "";
  position: absolute;
  width: 210px;
  height: 210px;
  top: -15px;
  left: 50%;
  background-color: #080920;
  border-radius: 45%;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 4s linear infinite;
  z-index: 10;
}
.wave::after {
  border-radius: 47%;
  background-color: #080920;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 10s linear -5s infinite;
  z-index: 20;
}
@keyframes rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
.wave span {
  color: #40b1f9;
  font-weight: bold;
  font-size: 25px;
  z-index: 999;
  position: absolute;
  left: 25px;
  top: 25px;
}
</style>
<style lang ="scss">
@import "../../styles/data-card.scss";
@import "../../styles/data-display.scss";
@import "../../styles/data-icons.scss";
@import "../../styles/data-tabs.scss";
</style>
