webpackJsonp([15],{"2bRS":function(t,e,a){var n=a("wLOR");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("298f84be",n,!0)},urvw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("so1O"),o=a("M9A7"),r={components:{myTable:n.a},data:function(){return{loading:!1,total:100,height:650,testForm:{transferFactor:"",initialJudgment:"",finalScore:""},columns:[{prop:"feature_name",label:"特征字段",isShow:!0},{prop:"a",label:"关联转移因子",isShow:!0,render:function(t,e){return"是"}},{prop:"status",label:"关联相似度对比",isShow:!0,render:function(t,e){return 1===e.row.status?"是":"否"}},{prop:"sum_of_iv",label:"关联最终评分",isShow:!0,render:function(t,e){return e.row.sum_of_iv>0?"是":"否"}}],dataSource:[]}},created:function(){this.query()},methods:{query:function(){var t=this;this.loading=!0,Object(o.h)().then(function(e){console.log(e),t.loading=!1,t.dataSource=e.data}).catch(function(t){console.log(t)})},pageChange:function(t){},onSubmit:function(t){}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table"},[n("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px",height:"138px"}},[n("el-form",{ref:"testForm",staticClass:"demo-form-inline",staticStyle:{"margin-top":"20px"},attrs:{inline:!0,model:t.testForm}},[n("el-form-item",{attrs:{label:"转移因子:",prop:"transferFactor"}},[n("el-input",{model:{value:t.testForm.transferFactor,callback:function(e){t.$set(t.testForm,"transferFactor",e)},expression:"testForm.transferFactor"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"初次判断:",prop:"initialJudgment"}},[n("el-input",{model:{value:t.testForm.initialJudgment,callback:function(e){t.$set(t.testForm,"initialJudgment",e)},expression:"testForm.initialJudgment"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最终评分:",prop:"finalScore"}},[n("el-input",{model:{value:t.testForm.finalScore,callback:function(e){t.$set(t.testForm,"finalScore",e)},expression:"testForm.finalScore"}})],1),t._v(" "),n("el-form-item",[n("div",{staticClass:"search",on:{click:function(e){t.onSubmit(t.testForm)}}},[n("img",{attrs:{src:a("KWYM")}})])])],1)],1),t._v(" "),n("el-card",{staticClass:"box-card2"},[n("myTable",{staticStyle:{"margin-left":"10px"},attrs:{columns:t.columns,dataSource:t.dataSource,hasIndex:!1,height:t.height,hasSelection:!1,hasPagination:!1,total:t.total,loading:t.loading},on:{pageChange:t.pageChange}})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(r,i,!1,function(t){a("2bRS")},"data-v-fc8a52e0",null);e.default=s.exports},wLOR:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.box-card[data-v-fc8a52e0] {\n  background-image: url("+a("pMZc")+");\n  background-size: cover;\n}\n.table[data-v-fc8a52e0] .box-card2 {\n  background-image: url("+a("tuRm")+");\n  background-size: cover;\n}\n.table[data-v-fc8a52e0] .el-card {\n  background-color: #080920;\n  border: none;\n}\n.search[data-v-fc8a52e0]:hover {\n  cursor: pointer;\n}\n",""])}});