webpackJsonp([32],{"34O+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("so1O"),r=a("5pyH"),o=a("M9A7"),i=a("dzdQ"),l=(a("wQkr"),{components:{myTable:n.a,nxBackToTop:r.a},data:function(){var t=this.$createElement;return this.chartExtend={series:{label:{show:!0,position:"top"}},xAxis:{axisLabel:{textStyle:{color:"rgb(126, 203, 224)"}}},yAxis:{axisLabel:{textStyle:{color:"rgb(126, 203, 224)"}}},legend:{textStyle:{color:"rgb(126, 203, 224)"}}},this.dataZoom=[{type:"slider",start:0,end:20}],this.chartSettings={labelMap:{total:"每箱个数",proportion:"每箱比例"}},{myBackToTopStyle:{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"},height:650,tableLoading:!1,chartLoading:!1,dataEmpty:!1,activeName:"1",tableTotal:100,chartTotal:100,currentPage:1,tab:"",testForm:{feature_field:""},columns:[{prop:"featureField",label:"特征字段",isShow:!0},{prop:"bucket",label:"特征分箱结果",isShow:!0,render:function(e,a){return a.row.bucket.map(function(e){return t("div",null,[e])})}},{prop:"total",label:"每箱个数",isShow:!0,render:function(e,a){return a.row.total.map(function(e){return t("div",null,[e])})}},{prop:"proportion",label:"每箱比例",isShow:!0,render:function(e,a){return a.row.proportion.map(function(e){return t("div",null,[e])})}}],dataSource:[],chartData:[]}},created:function(){this.queryEcharts(),this.queryTable()},methods:{noRepeat:function(t,e){var a=[],n=[];if(0==t.length)return t;if(e){for(var r=0;r<t.length;r++)n[t[r][e]]||(a.push(t[r]),n[t[r][e]]=!0);return a}for(r=0;r<t.length;r++)n[t[r]]||(a.push(t[r]),n[t[r]]=!0);return a},filterTable:function(t){var e=t.map(function(t){return{featureField:t.featureName,featureFieldEng:t.featureField,bucket:[],total:[],proportion:[]}});return t.map(function(t){e.forEach(function(e,a){t.featureField===e.featureFieldEng&&(e.bucket.push(t.bucket),e.total.push(t.total),e.proportion.push(t.proportion))})}),e},filterData:function(t){var e=t.map(function(t){return{name:t.featureName,featureFieldEng:t.featureField,columns:["bucket","total","proportion"],rows:[]}});return t.map(function(t){e.forEach(function(e,a){t.featureField===e.featureFieldEng&&e.rows.push({bucket:t.bucket,total:t.total,proportion:t.proportion})})}),e},handleClick:function(t){this.tab=Object(i.b)(t.name),"chart"===this.tab?this.queryEcharts():this.queryTable()},queryTable:function(){var t=this;this.tableLoading=!0,Object(o.g)().then(function(e){t.tableLoading=!1;var a=t.filterTable(Object(i.a)(e.data));t.dataSource=t.noRepeat(a,"featureFieldEng")}).catch(function(t){console.log(t)})},queryEcharts:function(){var t=this;this.chartLoading=!0,Object(o.g)().then(function(e){t.chartLoading=!1;var a=t.filterData(Object(i.a)(e.data));t.chartData=t.noRepeat(a,"featureFieldEng")}).catch(function(t){console.log(t)})},pageChange:function(t){},handleCurrentChange:function(t){},onSubmit:function(t){var e=this;this.tableLoading=!0;var a={feature_field:t.feature_field};Object(o.K)(a).then(function(t){e.tableLoading=!1;var a=e.filterTable(t.data);e.dataSource=[a[0]];var n=e.filterData(t.data);e.chartData=[n[0]]}).catch(function(t){console.log(t)})}}}),c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table"},[n("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px"}},[n("el-form",{ref:"testForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.testForm}},[n("el-form-item",{attrs:{label:"特征字段:",prop:"feature_field"}},[n("el-input",{model:{value:t.testForm.feature_field,callback:function(e){t.$set(t.testForm,"feature_field",e)},expression:"testForm.feature_field"}})],1),t._v(" "),n("el-form-item",[n("div",{staticClass:"search",on:{click:function(e){t.onSubmit(t.testForm)}}},[n("img",{attrs:{src:a("KWYM")}})])])],1)],1),t._v(" "),n("el-card",{staticClass:"box-card2"},[n("el-tabs",{staticClass:"box-card2",attrs:{type:"border-card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"图表",name:"1"}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.chartLoading,expression:"chartLoading"}],staticStyle:{height:"750px"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"#091938"}},[n("el-row",{staticStyle:{"overflow-y":"auto",height:"720px","overflow-x":"hidden"}},t._l(t.chartData,function(e){return n("div",{key:e.id},[n("el-col",{attrs:{span:12}},[n("div",[n("ve-histogram",{directives:[{name:"loading",rawName:"v-loading",value:t.chartLoading,expression:"chartLoading"}],ref:"chart2",refInFor:!0,attrs:{extend:t.chartExtend,settings:t.chartSettings,data:e}}),n("p",{staticClass:"tit2"},[t._v(t._s(e.name))])],1)])],1)}))],1)]),t._v(" "),n("el-tab-pane",{attrs:{label:"报表",name:"2"}},[n("myTable",{attrs:{columns:t.columns,dataSource:t.dataSource,hasIndex:!1,height:t.height,hasSelection:!1,hasPagination:!1,total:t.tableTotal,loading:t.tableLoading},on:{pageChange:t.pageChange}})],1)],1)],1),t._v(" "),n("el-tooltip",{attrs:{placement:"top",content:"回到顶部"}},[n("nx-back-to-top",{attrs:{transitionName:"fade",customStyle:t.myBackToTopStyle,visibilityHeight:300,backPosition:50}})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,c,!1,function(t){a("LI7v")},"data-v-34f1c74c",null);e.default=s.exports},LI7v:function(t,e,a){var n=a("nvvk");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("92f5de2e",n,!0)},nvvk:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.tit2[data-v-34f1c74c] {\n  text-align: center;\n  font-size: 14px;\n  margin-top: -40px;\n  color: rgb(126, 203, 224);\n}\n.box-card[data-v-34f1c74c] {\n  background-image: url("+a("pMZc")+");\n  background-size: cover;\n}\n.table[data-v-34f1c74c] .box-card2 {\n  background-color: #091938 !important;\n}\n.table[data-v-34f1c74c] .el-card {\n  background-color: #080920;\n  border: none;\n}\n.search[data-v-34f1c74c]:hover {\n  cursor: pointer;\n}\n",""])}});