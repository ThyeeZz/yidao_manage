webpackJsonp([27],{Ha7x:function(e,t){},nkJe:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("jBVs"),r("uXZL");var n={name:"A",data:function(){return{ruleForm:{userName:"",content:"",fmmdd:new Date,oldContent:"",newContent:"",remark:""},rules:{fmmdd:[{required:!0,message:"时间筛选不能为空",trigger:"blur"}],userName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],oldContent:[{required:!0,message:"原内容不能为空",trigger:"blur"}],newContent:[{required:!0,message:"修改后内容不能为空",trigger:"blur"}],remark:[{required:!0,message:"备注不能为空",trigger:"blur"}]}}},methods:{submit:function(){var e=this,t=this;this.$refs.form1.validate(function(r){if(!r)return!1;e.postRequest("admin/batchContnetSaveEdit",{userName:e.ruleForm.userName,fmmdd:e.formatDate(e.ruleForm.fmmdd),oldContent:e.ruleForm.oldContent,newContent:e.ruleForm.newContent,remark:e.ruleForm.remark}).then(function(e){t.resAlert(e.data)})})}}},l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("el-form",{ref:"form1",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px",inline:"inline"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.checkData(t):null}}},[r("el-form-item",{attrs:{label:"用户名：",prop:"userName"}},[r("el-input",{model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"时间筛选：",prop:"fmmdd"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:e.ruleForm.fmmdd,callback:function(t){e.$set(e.ruleForm,"fmmdd",t)},expression:"ruleForm.fmmdd"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"原内容：",prop:"oldContent"}},[r("el-input",{staticStyle:{width:"220px"},attrs:{type:"textarea"},model:{value:e.ruleForm.oldContent,callback:function(t){e.$set(e.ruleForm,"oldContent",t)},expression:"ruleForm.oldContent"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"修改后内容：",prop:"newContent"}},[r("el-input",{staticStyle:{width:"220px"},attrs:{type:"textarea"},model:{value:e.ruleForm.newContent,callback:function(t){e.$set(e.ruleForm,"newContent",t)},expression:"ruleForm.newContent"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注：",prop:"remark"}},[r("el-input",{staticStyle:{width:"220px"},attrs:{type:"textarea"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"fr",attrs:{type:"primary",plain:""},on:{click:e.submit}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]};var a=r("VU/8")(n,l,!1,function(e){r("Ha7x")},"data-v-a7829d0a",null);t.default=a.exports}});