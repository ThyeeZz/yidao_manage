webpackJsonp([78],{aFDm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),l=a.n(i),n={name:"A",data:function(){return{sum:0,pageSize:30,pageNum:1,checkIn:!1,loading:!1,tableData:[],userName:"",fdate:new Date,tdate:new Date,modifyData:{visible:!1,accountID:"",userName:"",gateSubmitFail:!1,gateReportFail:!1}}},methods:{handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},index:function(t){return t+1},checkData:function(){this.tableData=[],this.checkIn=!0,this.loading=!0;var t=this;this.postRequest("admin/listFailRefund",{userName:this.userName,fdate:this.formatDate2(this.fdate),tdate:this.formatDate2(this.tdate)}).then(function(e){t.loading=!1,t.sum=e.data.data.page.totalCount;var a=!0,i=!1,n=void 0;try{for(var o,r=l()(e.data.data.data);!(a=(o=r.next()).done);a=!0){var s=o.value;t.tableData.push({id:s.id,accountID:s.accountID,userName:s.userName,failGatewaySubmit:1===s.failGatewaySubmit,failReportSubmit:1===s.failReportSubmit,createtime:s.createtime,oper:s.oper,opertime:s.opertime})}}catch(t){i=!0,n=t}finally{try{!a&&r.return&&r.return()}finally{if(i)throw n}}})},modify:function(t){var e=this;this.modifyData.visible=!0,this.postRequest("admin/updateFailRefund",{accountID:t.accountID}).then(function(t){e.modifyData={visible:!0,accountID:t.data.data.failRefund.accountID,userName:t.data.data.failRefund.userName,gateSubmitFail:1===t.data.data.failRefund.failGatewaySubmit,gateReportFail:1===t.data.data.failRefund.failReportSubmit}})},submitModify:function(){var t=this;this.postRequest("admin/saveUpdatefailrefund",{accountID:this.modifyData.accountID,userName:this.modifyData.userName,gateSubmitFail:this.modifyData.gateSubmitFail?1:0,gateReportFail:this.modifyData.gateReportFail?1:0}).then(function(e){t.checkData(),t.modifyData.visible=!1,t.resAlert(e.data)})},del:function(t){var e=this,a=this;this.$confirm("确认删除【"+t.userName+"】?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.postRequest("admin/deleteFailRefund",{accountID:t.accountID}).then(function(t){a.resAlert(t.data),a.checkData()})}).catch(function(){})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-form",{attrs:{inline:"inline","label-width":"120px"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.checkData(e):null}}},[a("el-form-item",{attrs:{label:"账号："}},[a("el-input",{model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开始时间："}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:t.fdate,callback:function(e){t.fdate=e},expression:"fdate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间："}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:t.tdate,callback:function(e){t.tdate=e},expression:"tdate"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"fr",attrs:{type:"primary",plain:""},on:{click:t.checkData}},[t._v("查询")])],1)],1),t._v(" "),t.checkIn?a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",attrs:{border:"",data:t.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"序号",width:"50px",type:"index",index:t.index}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.modify(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){t.del(e.row)}}},[t._v("删除")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"账号"}}),t._v(" "),a("el-table-column",{attrs:{label:"网关提交失败"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.failGatewaySubmit?"是":"否"))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"网关报告失败"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.failReportSubmit?"是":"否"))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"oper",label:"操作人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"opertime",label:"操作时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createtime",label:"创建时间"}})],1),t._v(" "),a("el-pagination",{staticClass:"fr",staticStyle:{margin:"10px 0"},attrs:{"current-page":t.pageNum,"page-size":t.pageSize,layout:"sizes, prev, pager, next, jumper",total:t.sum},on:{"size-change":t.handleSizeChange,"current-change":t.handlePageChange,"update:currentPage":function(e){t.pageNum=e},"update:pageSize":function(e){t.pageSize=e}}}),t._v(" "),a("span",{staticClass:"fr",staticStyle:{"padding-top":"15px","font-size":"14px"}},[t._v("共"+t._s(t.sum)+"条，")])],1):t._e(),t._v(" "),a("el-dialog",{attrs:{title:"修改信息",visible:t.modifyData.visible,width:"500px"},on:{"update:visible":function(e){t.$set(t.modifyData,"visible",e)}}},[a("el-form",{staticStyle:{width:"400px"},attrs:{"label-width":"120px",model:t.modifyData}},[a("el-form-item",{attrs:{label:"客户账号："}},[a("el-input",{attrs:{disabled:""},model:{value:t.modifyData.userName,callback:function(e){t.$set(t.modifyData,"userName",e)},expression:"modifyData.userName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"失败类型："}},[a("el-checkbox",{model:{value:t.modifyData.gateSubmitFail,callback:function(e){t.$set(t.modifyData,"gateSubmitFail",e)},expression:"modifyData.gateSubmitFail"}},[t._v("网关提交失败")]),t._v(" "),a("el-checkbox",{model:{value:t.modifyData.gateReportFail,callback:function(e){t.$set(t.modifyData,"gateReportFail",e)},expression:"modifyData.gateReportFail"}},[t._v("网关报告失败")])],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.modifyData.visible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.submitModify}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(n,o,!1,function(t){a("mlPb")},"data-v-2c655cba",null);e.default=r.exports},mlPb:function(t,e){}});