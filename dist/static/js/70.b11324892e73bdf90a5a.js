webpackJsonp([70],{gdzI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("BO1k"),r=a.n(l),n={name:"admin_wgzllb",data:function(){return{gatewayList:[{id:"allGateway",lebal:"所有",value:""}],gateway:"",index:0,fmmdd:new Date,tmmdd:new Date,pageNum:1,pageSize:30,sum:0,tableData:[],checkIn:!1,loading:!1}},methods:{handleSizeChange:function(){this.checkData()},handlePageChange:function(){this.checkData()},checkData:function(){this.tableData=[],this.checkIn=!0,this.loading=!0;var e=this;this.postRequest("admin/listGatewayQuality",{gateway:this.gateway,fmmdd:this.formatDate2(this.fmmdd),tmmdd:this.formatDate2(this.tmmdd)}).then(function(t){e.loading=!1,e.sum=t.data.data.page.totalCount;var a=!0,l=!1,n=void 0;try{for(var i,s=r()(t.data.data.gqvList);!(a=(i=s.next()).done);a=!0){var c=i.value;e.tableData.push({index:e.index,gateway:c.gateway,gatewayName:c.gatewayName,submitSuccess:c.submitSuccess,submitFailed:c.submitFailed,reportSuccess:c.reportSuccess,reportFailed:c.reportFailed,submitSuccessRate:c.submitSuccessRate,reportSuccessRate:c.reportSuccessRate,reportReturnRate:c.reportReturnRate,created:c.created,id:c.id}),e.index++}}catch(e){l=!0,n=e}finally{try{!a&&s.return&&s.return()}finally{if(l)throw n}}})}},mounted:function(){var e=this;this.postRequest("admin/listGatewayQuality",{gateway:this.gateway,fmmdd:this.fmmdd,tmmdd:this.tmmdd}).then(function(t){var a=!0,l=!1,n=void 0;try{for(var i,s=r()(t.data.data.gatewayList);!(a=(i=s.next()).done);a=!0){var c=i.value;e.gatewayList[c.gatewayname]||e.gatewayList.push({id:c.id,lebal:c.gatewayname,value:c.gateway})}}catch(e){l=!0,n=e}finally{try{!a&&s.return&&s.return()}finally{if(l)throw n}}})}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("el-form",{attrs:{"label-width":"120px",inline:"inline"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.checkData(t):null}}},[a("el-form-item",{attrs:{label:"网关名："}},[a("el-select",{attrs:{filterable:""},model:{value:e.gateway,callback:function(t){e.gateway=t},expression:"gateway"}},e._l(e.gatewayList,function(e){return a("el-option",{key:e.id,attrs:{label:e.lebal,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间："}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:e.fmmdd,callback:function(t){e.fmmdd=t},expression:"fmmdd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间："}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:e.tmmdd,callback:function(t){e.tmmdd=t},expression:"tmmdd"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkData}},[e._v("查询")])],1)],1),e._v(" "),e.checkIn?a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{border:"",data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"序号",type:"index"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gateway",label:"网关编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gatewayName",label:"网关名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"submitSuccess",label:"提交成功数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"submitFailed",label:"提交失败数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reportSuccess",label:"报告成功数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reportFailed",label:"报告失败数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"submitSuccessRate",label:"提交成功率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reportSuccessRate",label:"报告成功率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reportReturnRate",label:"提交返回率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created",label:"检测时间"}})],1),e._v(" "),a("el-pagination",{staticClass:"fr",staticStyle:{margin:"10px 0"},attrs:{"current-page":e.pageNum,"page-size":[30,50],"page-size":e.pageSize,total:e.sum,layout:"sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"update:currentPage":function(t){e.pageNum=t},"update:pageSize":function(t){e.pageSize=t}}}),e._v(" "),a("span",{staticClass:"fr",staticStyle:{"padding-top":"15px","font-size":"14px"}},[e._v("共"+e._s(e.sum)+"条，")])],1):e._e()],1)},staticRenderFns:[]};var s=a("VU/8")(n,i,!1,function(e){a("r1ph")},"data-v-37d67f40",null);t.default=s.exports},r1ph:function(e,t){}});