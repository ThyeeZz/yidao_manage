webpackJsonp([83],{"9U2n":function(e,t){},as4g:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("bOdI"),i=a.n(n),l=a("BO1k"),s=a.n(l),r={data:function(){return{userName:"",month:new Date,isFirst:!1,isInit:1,index:0,pageNum:1,pageSize:30,sum:0,tableData:[],checkIn:!1,loading:!1}},methods:{succeed:function(){this.$message({message:"导出成功",type:"success"})},failed:function(){this.$message.error("导出失败")},handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},checkData:function(){this.tableData=[],this.checkIn=!0,this.loading=!0;var e=this;this.postRequest("/admin/callCustomerMonthSendList",{userName:this.userName,cid:this.cid,month:this.formatDate(this.month),isFirst:this.isFirst,isInit:this.isInit,pageNum:this.pageNum,pageSize:this.pageSize}).then(function(t){console.log(t),e.loading=!1,e.sum=t.data.data.page.totalCount;var a=!0,n=!1,l=void 0;try{for(var r,o=s()(t.data.data.data);!(a=(r=o.next()).done);a=!0){var c,u=r.value;e.tableData.push((c={index:e.index,id:u.id,userName:u.userName,cid:u.cid,callTaskSum:u.callTaskSum,talkTimeSum:u.talkTimeSum,feeTimeSum:u.feeTimeSum},i()(c,"userName",u.userName),i()(c,"statMonth",u.statMonth),i()(c,"created",u.created),i()(c,"updated",u.updated),c)),e.index++}}catch(e){n=!0,l=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw l}}})},cancel:function(){}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("el-form",{attrs:{"label-width":"120px",inline:"inline"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.checkData(t):null}}},[a("el-form-item",{attrs:{label:"用户名："}},[a("el-input",{model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"按月份"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择月"},model:{value:e.month,callback:function(t){e.month=t},expression:"month"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkData}},[e._v("查询")])],1)],1),e._v(" "),e.checkIn?a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{border:"",data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"序号",type:"index"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"callTaskSum",label:"话单总数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"talkTimeSum",label:"通话时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"feeTimeSum",label:"计费时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"statMonth",label:"统计时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updated",label:"更新时间"}})],1),e._v(" "),a("el-pagination",{staticClass:"fr",staticStyle:{margin:"10px 0"},attrs:{"current-page":e.pageNum,"page-size":[30,50],"page-size":e.pageSize,total:e.sum,layout:"sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"update:currentPage":function(t){e.pageNum=t},"update:pageSize":function(t){e.pageSize=t}}}),e._v(" "),a("span",{staticClass:"fr",staticStyle:{"padding-top":"15px","font-size":"14px"}},[e._v("共"+e._s(e.sum)+"条，")])],1):e._e()],1)},staticRenderFns:[]};var c=a("VU/8")(r,o,!1,function(e){a("9U2n")},"data-v-25c26972",null);t.default=c.exports}});