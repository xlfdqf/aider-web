webpackJsonp([33],{"Ij+S":function(a,t,e){var n=e("Xp3h");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);e("rjj0")("12f6e524",n,!0)},Xp3h:function(a,t,e){(a.exports=e("FZ+f")(!1)).push([a.i,"\n.box-card[data-v-208b30a0] {\n  background-image: url("+e("pMZc")+");\n  background-size: 100% 100%;\n}\n.table[data-v-208b30a0] .box-card2 {\n  background-image: url("+e("tuRm")+");\n  background-size: 100% 100%;\n}\n.table[data-v-208b30a0] .el-card {\n  background-color: #080920;\n  border: none;\n}\n.search[data-v-208b30a0]:hover {\n  cursor: pointer;\n}\n.el-button--text[data-v-208b30a0] {\n  color: #7ecbe0;\n}\n",""])},qZSf:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("so1O"),o=(e("M9A7"),{components:{myTable:n.a},data:function(){return{loading:!1,current:1,size:10,total:0,dataSource:[{code:"单数",result:"男"},{code:"双数",result:"女"}],columns:[{prop:"code",label:"号段",isShow:!0},{prop:"result",label:"结果",isShow:!0}]}}}),r={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"table"},[t("el-card",{staticClass:"box-card2"},[t("myTable",{attrs:{columns:this.columns,dataSource:this.dataSource,hasSelection:!1,hasPagination:!1,total:this.total,loading:this.loading},on:{pageChange:this.pageChange}})],1)],1)},staticRenderFns:[]};var s=e("VU/8")(o,r,!1,function(a){e("Ij+S")},"data-v-208b30a0",null);t.default=s.exports}});