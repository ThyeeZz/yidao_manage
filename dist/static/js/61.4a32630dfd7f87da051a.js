webpackJsonp([61],{Crmn:function(e,a){},Lv6D:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("BO1k"),i=t.n(n),l=t("bOdI"),r=t.n(l),s={name:"admin_fxbglb",data:function(){var e;return e={options:[],accountIDList:[],remindUserBalance:{userName:"",balance:"",mobiles:"",accountID:""},rules:{balance:[{required:!0,message:"不能为空",trigger:"blur"},{type:"number",message:"请输入0-999999999的数字"}],mobiles:[{required:!0,message:"不能为空",trigger:"blur"}]},formLabelWidth:"120px",dialogFormVisible:!1,modifyDataVisible:!1,modifyDataForm:{},userName:"",index:0,fmmdd:new Date,tmmdd:new Date,pageNum:1,pageSize:30,sum:0},r()(e,"index",0),r()(e,"tableData",[]),r()(e,"checkIn",!0),r()(e,"loading",!1),e},methods:{succeed:function(e){this.$message({message:e,type:"success"})},failed:function(){this.$message.error(message)},modifyData:function(e){var a=this;this.remindUserBalance={},this.modifyDataVisible=!0,this.postRequest("admin/updateRemindUserBalance",{accountID:e.accountID}).then(function(e){a.remindUserBalance={accountID:e.data.data.remindBalance.accountID,balance:e.data.data.remindBalance.balance,mobiles:e.data.data.remindBalance.mobiles,userName:e.data.data.remindBalance.userName}})},deleteDate:function(e){var a=this,t=this;this.$confirm("此操作将删除wav："+e.wavName+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.postRequest("admin/deleteRemindUserBalance",{id:e.id}).then(function(e){e.data.success?(a.succeed(e.data.data),a.checkData()):a.failed(e.data.data)})}).catch(function(){})},submitModifyForm:function(e){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.modifyDataVisible=!1;var t=a;a.postRequest("admin/saveUpdateRemindUserBalance",{remindUserBalance:a.remindUserBalance}).then(function(e){console.log(e),e.data.success?(t.succeed(e.data.data),t.checkData()):t.failed(e.data.data)})})},submitForm:function(e){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;var t=!0,n=!1,l=void 0;try{for(var r,s=i()(a.accountIDList);!(t=(r=s.next()).done);t=!0){var o=r.value;a.remindUserBalance.userName===o.userName&&(a.remindUserBalance.accountID=o.accountID)}}catch(e){n=!0,l=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw l}}a.dialogFormVisible=!1;var c=a;a.postRequest("admin/saveAddRemindUserBalance",{remindUserBalance:a.remindUserBalance}).then(function(e){e.data.success?(c.succeed(e.data.data),c.checkData(),c.remindUserBalance={userName:"",balance:"",mobiles:"",accountID:""}):c.failed(e.data.data)})})},resetForm:function(e){this.remindUserBalance={},this.dialogFormVisible=!1,this.modifyDataVisible=!1},addRemindUserBalance:function(){this.dialogFormVisible=!0;var e=this;this.postRequest("admin/addRemindUserBalance",null).then(function(a){var t=!0,n=!1,l=void 0;try{for(var r,s=i()(a.data.data.customerList);!(t=(r=s.next()).done);t=!0){var o=r.value;e.options.push({value:o.userName,index:e.index,id:o.id}),e.accountIDList.push({accountID:o.accountID,userName:o.userName}),e.index++}}catch(e){n=!0,l=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw l}}})},handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},checkData:function(){this.tableData=[],this.loading=!0;var e=this;this.postRequest("admin/listRemindUserBalance",{userName:this.userName,pageNum:this.pageNum,pageSize:this.pageSize}).then(function(a){e.loading=!1,e.sum=a.data.data.page.totalCount;var t=!0,n=!1,l=void 0;try{for(var r,s=i()(a.data.data.rublist);!(t=(r=s.next()).done);t=!0){var o=r.value;e.tableData.push({index:e.index,userName:o.userName,createUserName:o.createUserName,createDate:o.createDate,balance:o.balance,mobiles:o.mobiles,id:o.id,accountID:o.accountID}),e.index++}}catch(e){n=!0,l=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw l}}})},cancel:function(){}},mounted:function(){this.checkData()}},o={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("el-button",{attrs:{type:"text"},on:{click:e.addRemindUserBalance}},[e._v("+添加客户余额提醒")]),e._v(" "),t("el-dialog",{attrs:{title:"添加客户余额提醒",visible:e.dialogFormVisible},on:{"update:visible":function(a){e.dialogFormVisible=a}}},[t("el-form",{ref:"remindUserBalance",attrs:{model:e.remindUserBalance,rules:e.rules,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"用户名："}},[t("el-select",{attrs:{filterable:""},model:{value:e.remindUserBalance.userName,callback:function(a){e.$set(e.remindUserBalance,"userName",a)},expression:"remindUserBalance.userName"}},e._l(e.options,function(e){return t("el-option",{key:e.index,attrs:{label:e.value,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"提醒标准：","label-width":e.formLabelWidth,prop:"balance"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.remindUserBalance.balance,callback:function(a){e.$set(e.remindUserBalance,"balance",a)},expression:"remindUserBalance.balance"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"提醒号码：","label-width":e.formLabelWidth,prop:"mobiles"}},[t("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"手机号码之间请用英文逗号分割"},model:{value:e.remindUserBalance.mobiles,callback:function(a){e.$set(e.remindUserBalance,"mobiles",a)},expression:"remindUserBalance.mobiles"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.submitForm("remindUserBalance")}}},[e._v("保存")]),e._v(" "),t("el-button",{on:{click:function(a){e.resetForm("remindUserBalance")}}},[e._v("取消")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"修改余额提醒",visible:e.modifyDataVisible},on:{"update:visible":function(a){e.modifyDataVisible=a}}},[t("el-form",{ref:"remindUserBalance",attrs:{model:e.remindUserBalance,rules:e.rules,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"用户名："}},[t("el-input",{attrs:{disabled:!0},model:{value:e.remindUserBalance.userName,callback:function(a){e.$set(e.remindUserBalance,"userName",a)},expression:"remindUserBalance.userName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"提醒标准：","label-width":e.formLabelWidth,prop:"balance"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.remindUserBalance.balance,callback:function(a){e.$set(e.remindUserBalance,"balance",a)},expression:"remindUserBalance.balance"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"提醒号码：","label-width":e.formLabelWidth,prop:"mobiles"}},[t("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"手机号码之间请用英文逗号分割"},model:{value:e.remindUserBalance.mobiles,callback:function(a){e.$set(e.remindUserBalance,"mobiles",a)},expression:"remindUserBalance.mobiles"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.submitModifyForm("remindUserBalance")}}},[e._v("保存")]),e._v(" "),t("el-button",{on:{click:function(a){e.resetForm("remindUserBalance")}}},[e._v("取消")])],1)],1),e._v(" "),t("el-form",{attrs:{"label-width":"120px",inline:"inline"},nativeOn:{keyup:function(a){return"button"in a||!e._k(a.keyCode,"enter",13,a.key,"Enter")?e.checkData(a):null}}},[t("el-form-item",{attrs:{label:"用户名："}},[t("el-input",{model:{value:e.userName,callback:function(a){e.userName=a},expression:"userName"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkData}},[e._v("查询")])],1)],1),e._v(" "),e.checkIn?t("el-card",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{border:"",data:e.tableData,stripe:""}},[t("el-table-column",{attrs:{label:"序号",type:"index"}}),e._v(" "),t("el-table-column",{attrs:{prop:"oprations",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"text"},on:{click:function(t){e.modifyData(a.row)}}},[e._v("修改")]),e._v(" "),t("el-button",{attrs:{type:"text"},on:{click:function(t){e.deleteDate(a.row)}}},[e._v("删除")])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),e._v(" "),t("el-table-column",{attrs:{prop:"createUserName",label:"创建用户"}}),e._v(" "),t("el-table-column",{attrs:{prop:"createDate",label:"创建时间"}}),e._v(" "),t("el-table-column",{attrs:{prop:"balance",label:"提醒标准"}}),e._v(" "),t("el-table-column",{attrs:{prop:"mobiles",label:"提醒号码"}})],1),e._v(" "),t("el-pagination",{staticClass:"fr",staticStyle:{margin:"10px 0"},attrs:{"current-page":e.pageNum,"page-size":[30,50],"page-size":e.pageSize,total:e.sum,layout:"sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"update:currentPage":function(a){e.pageNum=a},"update:pageSize":function(a){e.pageSize=a}}}),e._v(" "),t("span",{staticClass:"fr",staticStyle:{"padding-top":"15px","font-size":"14px"}},[e._v("共"+e._s(e.sum)+"条，")])],1):e._e()],1)},staticRenderFns:[]};var c=t("VU/8")(s,o,!1,function(e){t("Crmn")},"data-v-47c5adf9",null);a.default=c.exports}});