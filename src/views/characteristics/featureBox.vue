<!--特征分箱页面 -->
<template>
  <div class="table">
      <el-card class="box-card" style="margin-bottom:20px">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="特征字段:" prop="feature_field">
              <el-input v-model="testForm.feature_field"></el-input>
            </el-form-item>
            <el-form-item>
             <div class="search" @click="onSubmit(testForm)"><img src="@/assets/images/home/sbtn.png"/></div>
            </el-form-item>
          </el-form>
      </el-card>
    
     <el-card class="box-card2">
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card" class="box-card2">
        <el-tab-pane label="图表" name="1">
           <div v-loading="chartLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
         element-loading-background="rgba(9, 25, 56, 0.8)" style="height:650px;">
             <el-row  style="overflow-y:auto;height:650px;overflow-x:hidden;">
                <div v-for="item in chartData" :key='item.name'>
                  <el-col :span="12" class="histogram"><div>
                    <keep-alive>
                       <ve-histogram :settings="chartSettings" :extend="chartExtend" :data="item" ref="chart2" :data-empty="dataEmpty"></ve-histogram>
                    </keep-alive>
                    <p class="tit2">{{item.name}}</p></div></el-col>
                </div>
              </el-row>
           </div>
        </el-tab-pane>
           <!-- 柱状图表 end -->

        <el-tab-pane label="报表" name="2" ref="tab1">
             <myTable :columns="columns" :dataSource="dataSource" :hasIndex="false" :height="height"
              :hasSelection="false" :hasPagination="false" :total="tableTotal" @pageChange="pageChange" :loading="tableLoading"> </myTable>
        </el-tab-pane>
        <!-- 报表 end -->
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
  getFeatureBox,
  getFeatureBoxChart,
  searchFeatureBox
} from "@/api/login.js";
import { tabType, sortBucket } from "./util.js";
import "echarts/lib/component/dataZoom"; //区域缩放组件

export default {
  components: { myTable, nxBackToTop },
  data() {
    this.dataZoom = [
      {
        type: "slider",
        start: 0,
        end: 50
      }
    ];
    this.chartExtend = {
      series: {
        color: "rgb(126, 203, 224)", //柱子背景颜色
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "rgb(126, 203, 224)"
          }
        }
      },
      xAxis: {
        axisLabel: {
          // interval: 0,
          // rotate: 40, //x轴标题倾斜
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
        iv: "每箱iv值"
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
      orgOptions: {},
      height: 600,
      tableLoading: false,
      chartLoading: false,
      dataEmpty: false, //暂无数据
      activeName: "1",
      tableTotal: 0,
      chartTotal: 100,
      currentPage: 1,
      tab: "",
      testForm: { feature_field: "" },
      arr: [],
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
              if (item === "true") {
                return <div>是</div>;
              } else if (item === "false") {
                return <div>否</div>;
              } else {
                return <div>{item}</div>;
              }
            });
          }
        },
        {
          prop: "iv",
          label: "每箱iv值",
          isShow: true,
          render: function(v, param) {
            return param.row.iv.map(item => {
              return <div>{item}</div>;
            });
          }
        }
      ],
      // 表格所需数据格式
      dataSource: [
        // {
        //   featureField: "年龄",
        //   bucket: ["0-10", "20-30", "30-40"],
        //   iv: [0.3, 0.2, 0.55]
        // },
      ],
      // echart所需数据格式
      chartData: [
        // {
        //   name: "年龄",
        //   columns: ["bucket", "iv"],
        //   rows: [
        //     {
        //       bucket: "0-10",
        //       iv: 0.3
        //     },
        //     {
        //       bucket: "20-30",
        //       iv: 0.5
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
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
          featureField: item.feature_name,
          featureFieldEng: item.featureField,
          bucket: [],
          iv: []
        };
      });
      data.map(item => {
        types.forEach((t, i) => {
          if (item["featureField"] === t["featureFieldEng"]) {
            t.bucket.push(item.bucket);
            t.iv.push(item.iv);
          }
        });
      });
      return types;
    },
    // 过滤charts图表数据
    filterData(data) {
      const types = data.map(item => {
        return {
          name: item.feature_name,
          featureFieldEng: item.featureField,
          columns: ["bucket", "iv"],
          rows: []
        };
      });
      data.map(item => {
        types.forEach((t, i) => {
          if (item["featureField"] === t["featureFieldEng"]) {
            t.rows.push({ bucket: item.bucket, iv: item.iv });
          }
        });
      });
      return types;
    },
    // 查询table报表
    queryTable() {
      this.tableLoading = true;
      getFeatureBox()
        .then(res => {
          this.tableLoading = false;
          const types = this.filterTable(sortBucket(res.data.data)); //排序后
          this.dataSource = this.noRepeat(types, "featureFieldEng");
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询分箱图表
    queryEcharts() {
      this.chartLoading = true;
      getFeatureBoxChart()
        .then(res => {
          this.chartLoading = false;
          const types = this.filterData(sortBucket(res.data.data));
          this.chartData = this.noRepeat(types, "featureFieldEng");
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
    // 表格页码切换
    pageChange(page) {},
    // 图表分页
    handleCurrentChange(e) {},
    onSubmit(testForm) {
      this.tableLoading = true;
      let params = { feature_field: testForm.feature_field };
      searchFeatureBox(params)
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
  margin-top: -40px !important;
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
