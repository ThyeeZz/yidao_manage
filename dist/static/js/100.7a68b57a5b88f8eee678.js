webpackJsonp([100],{"+D/7":function(e,a){},"y8Z+":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("BO1k"),i=t.n(l),n={data:function(){return{cid:"",userName:"",code:"",mobile:"",fmmdd:new Date,index:0,sum:0,pageSize:30,pageNum:1,checkIn:!1,loading:!1,tableData:[]}},methods:{handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},checkData:function(){this.tableData=[],this.checkIn=!0,this.loading=!0;var e=this;this.postRequest("admin/listReportSuccess",{cid:this.cid,userName:this.userName,mobile:this.mobile,pageSize:this.pageSize,pageNum:this.pageNum,fmmdd:this.formatDate(this.fmmdd)}).then(function(a){e.loading=!1,e.sum=a.data.data.page.totalCount;var t=!0,l=!1,n=void 0;try{for(var r,o=i()(a.data.data.rsvList);!(t=(r=o.next()).done);t=!0){var s=r.value;e.tableData.push({cid:s.cid,userName:s.userName,code:s.code,mobile:s.mobile,cndeliverType:s.cndeliverType,errorCode:s.errorCode,gatewayName:s.gatewayName,submitTime:s.submitTime,doneTime:s.doneTime,deliverTime:s.deliverTime,cnsource:s.cnsource,index:e.index,id:s.id}),e.index++}}catch(e){l=!0,n=e}finally{try{!t&&o.return&&o.return()}finally{if(l)throw n}}})}},mounted:function(){this.checkData()}},r={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("el-form",{attrs:{inline:"inline","label-width":"120px"},nativeOn:{keyup:function(a){return"button"in a||!e._k(a.keyCode,"enter",13,a.key,"Enter")?e.checkData(a):null}}},[t("el-form-item",{attrs:{label:"任务编号："}},[t("el-input",{model:{value:e.cid,callback:function(a){e.cid=a},expression:"cid"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"用户名："}},[t("el-input",{model:{value:e.userName,callback:function(a){e.userName=a},expression:"userName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号码"}},[t("el-input",{model:{value:e.mobile,callback:function(a){e.mobile=a},expression:"mobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.fmmdd,callback:function(a){e.fmmdd=a},expression:"fmmdd"}})],1),e._v(" "),t("el-form-item",[t("el-button",{staticClass:"fr",attrs:{type:"primary",plain:""},on:{click:e.checkData}},[e._v("查询")])],1)],1),e._v(" "),e.checkIn?t("el-card",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{border:"",data:e.tableData,stripe:""}},[t("el-table-column",{attrs:{type:"index",label:"序号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cid",label:"任务编号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),e._v(" "),t("el-table-column",{attrs:{prop:"code",label:"特服号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"mobile",label:"号码"}}),e._v(" "),t("el-table-column",{attrs:{prop:"errorCode",label:"状态"}}),e._v(" "),t("el-table-column",{attrs:{prop:"gatewayName",label:"网关名称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"submitTime",label:"提交时间"}}),e._v(" "),t("el-table-column",{attrs:{prop:"doneTime",label:"接收时间"}}),e._v(" "),t("el-table-column",{attrs:{prop:"deliverTime",label:"交互时间"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cndeliverType",label:"交互方式"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cnsource",label:"客户来源"}})],1),e._v(" "),t("el-pagination",{staticClass:"fr",staticStyle:{margin:"10px 0"},attrs:{"current-page":e.pageNum,"page-size":e.pageSize,total:e.sum,layout:"sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"update:currentPage":function(a){e.pageNum=a},"update:pageSize":function(a){e.pageSize=a}}}),e._v(" "),t("span",{staticClass:"fr",staticStyle:{"padding-top":"15px","font-size":"14px"}},[e._v("共"+e._s(e.sum)+"条，")])],1):e._e()],1)},staticRenderFns:[]};var o=t("VU/8")(n,r,!1,function(e){t("+D/7")},"data-v-13262f04",null);a.default=o.exports}});