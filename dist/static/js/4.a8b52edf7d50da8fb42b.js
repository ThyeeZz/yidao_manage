webpackJsonp([4],{"1ST8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("BO1k"),o=r.n(n),a={data:function(){return{userReportDefined:{userName:"",accountID:"",definedProportion:"",remark:""},rules:{definedProportion:[{required:!0,message:"不能为空",trigger:"blur"}]},options:[],index:0,sum:0,pageSize:30,pageNum:1,tableData:[]}},methods:{succeed:function(e){this.$message({message:e,type:"success"})},failed:function(e){this.$message.error(e)},submitForm:function(e){var t=this,r=this;this.$refs[e].validate(function(e){if(!e)return!1;t.postRequest("admin/saveAddUserReportDefined",{userReportDefined:t.userReportDefined}).then(function(e){console.log(e),e.data.success?(r.succeed(e.data.data),r.userReportDefined={}):r.failed(e.data.data)})})},resetForm:function(e){this.$router.push({path:"/dashboard"})},handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},checkData:function(){this.options=[];var e=this;this.postRequest("admin/addUserReportDefined",{}).then(function(t){var r=!0,n=!1,a=void 0;try{for(var i,s=o()(t.data.data.customerList);!(r=(i=s.next()).done);r=!0){var u=i.value;e.options.push({id:u.id,label:u.userName,value:u.userName,accountID:u.accountID}),e.index++}}catch(e){n=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(n)throw a}}})}},mounted:function(){this.checkData()}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("el-form",{ref:"userReportDefined",attrs:{model:e.userReportDefined,inline:"inline","label-width":"120px",rules:e.rules},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.checkData(t):null}}},[r("el-form-item",{attrs:{label:"用户名："}},[r("el-select",{attrs:{filterable:""},model:{value:e.userReportDefined.userName,callback:function(t){e.$set(e.userReportDefined,"userName",t)},expression:"userReportDefined.userName"}},e._l(e.options,function(e){return r("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"调整比例：",prop:"definedProportion"}},[r("el-input",{model:{value:e.userReportDefined.definedProportion,callback:function(t){e.$set(e.userReportDefined,"definedProportion",t)},expression:"userReportDefined.definedProportion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.userReportDefined.remark,callback:function(t){e.$set(e.userReportDefined,"remark",t)},expression:"userReportDefined.remark"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("userReportDefined")}}},[e._v("保存")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("userReportDefined")}}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var s=r("VU/8")(a,i,!1,function(e){r("qA59")},"data-v-fb0b3d6a",null);t.default=s.exports},qA59:function(e,t){}});