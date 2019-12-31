<template>
    <div class="container">
        <el-form inline="inline" label-width="120px">
            <el-form-item label="手机号码：">
                <el-input v-model="mobile"></el-input>
            </el-form-item>
            <el-form-item label="客户源：">
                <el-input v-model="label_source"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
                <el-checkbox label="金融" v-model="label_jr"></el-checkbox>
                <el-checkbox label="信用卡" v-model="label_xyk"></el-checkbox>
                <el-checkbox label="电商" v-model="label_ds"></el-checkbox>
            </el-form-item>
            <el-form-item label="开始时间：">
                <el-date-picker type="datetime" v-model="startDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-date-picker type="datetime" v-model="endDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="checkData" type="primary" plain class="fr">查询</el-button>
            </el-form-item>
        </el-form>
        <el-card v-if="checkIn">
            <el-upload :action=uploadUrl accept=".csv" :on-success="uploadXls">
                <el-button>选择上传文件</el-button>
                <span class="el-upload__tip">&nbsp;只能上传csv文件</span>
            </el-upload>
            <div style="margin-top: 10px">
                <el-button type="text" @click="bulkSend">+个性短信发送</el-button>
                <el-button type="text" @click="send">+普通短信发送</el-button>
                <el-button type="text" @click="sendSMS">+彩信发送</el-button>
            </div>
            <el-table
                style="margin-top: 20px;"
                ref="table"
                v-loading="loading"
                :data="tableData"
                border
                stripe>
                <el-table-column
                    label="序号"
                    width="50px"
                    type="index">
                </el-table-column>
                <el-table-column
                    width="150px"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" type="text">修改</el-button>
                        <el-button @click="del(scope.row)" type="text">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="号码">
                </el-table-column>
                <el-table-column prop="label_time" label="时间">
                </el-table-column>
                <el-table-column prop="label_source" label="源客户">
                </el-table-column>
                <el-table-column prop="label_jr" label="金融">
                </el-table-column>
                <el-table-column prop="label_xyk" label="信用卡">
                </el-table-column>
                <el-table-column prop="label_ds" label="电商">
                </el-table-column>
            </el-table>
            <el-pagination class="fr"
                           style="margin:10px 0"
                           @size-change="handleSizeChange"
                           @current-change="handlePageChange"
                           :current-page.sync="pageNum"
                           :page-size.sync="pageSize"
                            layout="sizes, prev, pager, next, jumper"
                           :total=sum>
            </el-pagination>
            <span class="fr" style="padding-top: 15px;font-size: 14px;">共{{sum}}条，</span>
        </el-card>
        <el-dialog title="个性短信发送" :visible.sync="bulkSendData.visible">
            <el-form
                :rules="rule1"
                :model="bulkSendData"
                ref="bulkSendData"
                label-width="120px">
                <el-form-item label="查询结果：">
                    <el-input v-model="bulkSendData.sms_count" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="bulkSendData.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="源客户：">
                    <el-input v-model="bulkSendData.label_source" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker type="datetime" v-model="bulkSendData.startDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker type="datetime" v-model="bulkSendData.endDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="类型：">
                    <el-checkbox label="金融" v-model="bulkSendData.label_jr" disabled></el-checkbox>
                    <el-checkbox label="信用卡" v-model="bulkSendData.label_xyk" disabled></el-checkbox>
                    <el-checkbox label="电商" v-model="bulkSendData.label_ds" disabled></el-checkbox>
                </el-form-item>
                <el-form-item label="短信内容：" prop="content">
                    <el-input type="textarea" v-model="bulkSendData.content"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitBulkSend">保存</el-button>
                <el-button @click="bulkSendData.visible=false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="个性短信发送" :visible.sync="SendData.visible">
            <el-form
                :rules="rule1"
                :model="SendData"
                ref="bulkSendData"
                label-width="120px">
                <el-form-item label="查询结果：">
                    <el-input v-model="SendData.sms_count" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="SendData.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="源客户：">
                    <el-input v-model="SendData.label_source" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker type="datetime" v-model="SendData.startDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker type="datetime" v-model="SendData.endDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="类型：">
                    <el-checkbox label="金融" v-model="SendData.label_jr" disabled></el-checkbox>
                    <el-checkbox label="信用卡" v-model="SendData.label_xyk" disabled></el-checkbox>
                    <el-checkbox label="电商" v-model="SendData.label_ds" disabled></el-checkbox>
                </el-form-item>
                <el-form-item label="短信内容：" prop="content">
                    <el-input type="textarea" v-model="SendData.content"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSend">保存</el-button>
                <el-button @click="SendData.visible=false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="彩信发送" :visible.sync="sendSMSData.visible">
            <el-form
                :rules="rule1"
                :model="sendSMSData"
                ref="sendSmsData"
                label-width="120px">
                <el-form-item label="查询结果：">
                    <el-input v-model="sendSMSData.sms_count" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="sendSMSData.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="源客户：">
                    <el-input v-model="sendSMSData.label_source" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker type="datetime" v-model="sendSMSData.startDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker type="datetime" v-model="sendSMSData.endDate" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="类型：">
                    <el-checkbox label="金融" v-model="sendSMSData.label_jr" disabled></el-checkbox>
                    <el-checkbox label="信用卡" v-model="sendSMSData.label_xyk" disabled></el-checkbox>
                    <el-checkbox label="电商" v-model="sendSMSData.label_ds" disabled></el-checkbox>
                </el-form-item>
                <el-form-item label="上传文件：">
                    <el-upload action="#" accept=".jpg, .png,.jpeg, .gif" :limit="1" :http-request="uploadFile">
                        <el-button>上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传gif/jpeg/jpg/png文件，且只能上传一条</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="短信内容：" prop="content">
                    <el-input type="textarea" v-model="sendSMSData.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSendSMS">保存</el-button>
                <el-button @click="sendSMSData.visible=false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改标签信息" :visible.sync="modifyData.visible">
            <el-form
                :model="modifyData"
                ref="modifyData"
                label-width="120px">
                <el-form-item label="手机号码：">
                    <el-input v-model="modifyData.mobile"></el-input>
                </el-form-item>
                <el-form-item label="源客户：">
                    <el-input v-model="modifyData.label_source"></el-input>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker type="datetime" v-model="modifyData.label_time"></el-date-picker>
                </el-form-item>
                <el-form-item label="类型：">
                    <el-checkbox label="金融" v-model="modifyData.label_jr"></el-checkbox>
                    <el-checkbox label="信用卡" v-model="modifyData.label_xyk"></el-checkbox>
                    <el-checkbox label="电商" v-model="modifyData.label_ds"></el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitModify">保存</el-button>
                <el-button @click="modifyData.visible=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "admin_bqlb",
        data() {
            return {
                sum: 0,
                pageSize: 30,
                pageNum: 1,
                // checkIn: false,
                checkIn: false,
                loading: false,
                mobile: '',
                label_source: '',
                label_jr: false,
                label_xyk: false,
                label_ds: false,
                startDate: new Date(),
                endDate: new Date(),
                uploadUrl: `${sessionStorage.base}admin/uploadlabellistFile`,
                // uploadUrl: `192.168.1.246:8010/admin/uploadlabellistFile`,
                tableData: [],
                modifyData: {
                    visible: false,
                    id: '',
                    mobile: '',
                    label_source: '',
                    label_jr: '',
                    label_xyk: '',
                    label_ds: '',
                    label_time: '',
                },
                bulkSendData: {
                    visible: false,
                    mobile: '',
                    label_source: '',
                    startDate: '',
                    endDate: '',
                    label_jr: '',
                    label_xyk: '',
                    label_ds: '',
                    content: '',
                    sms_count: '',
                },
                SendData: {
                    visible: false,
                    mobile: '',
                    label_source: '',
                    startDate: '',
                    endDate: '',
                    label_jr: '',
                    label_xyk: '',
                    label_ds: '',
                    content: '',
                    sms_count: '',
                },
                sendSMSData: {
                    visible: false,
                    file1: '',
                    mobile: '',
                    label_source: '',
                    startDate: '',
                    endDate: '',
                    label_jr: '',
                    label_xyk: '',
                    label_ds: '',
                    content: '',
                    sms_count: '',
                },
                sendSmsFormData: new FormData(),
                rule1: {
                    content: [{required: true, message: '请输入短信内容', trigger: 'blur'},]
                }
                // totalPage: 1000,
            }
        },
        methods: {
            handleSizeChange() {
                this.checkData();
            },
            handlePageChange() {
                this.checkData();
            },
            uploadXls(response, file, fileList) {
                this.resAlert(response)
            },
            checkData() {
                this.tableData = [];
                this.checkIn = true;
                this.loading = true;
                let self = this;
                this.postRequest('admin/labellist', {
                    mobile: this.mobile,
                    label_source: this.label_source,
                    label_jr: this.label_jr === true ? 1 : 0,
                    label_xyk: this.label_xyk === true ? 1 : 0,
                    label_ds: this.label_ds === true ? 1 : 0,
                    startDate: this.formatDate2(this.startDate),
                    endDate: this.formatDate2(this.endDate),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then((res) => {
                    self.loading = false;
                    self.sum = res.data.data.page.totalCount;
                    // self.totalPage = res.data.page.totalPage;
                    for (let item of res.data.data.labels) {
                        self.tableData.push({
                            id: item.id,
                            mobile: item.mobile,
                            label_time: item.label_time,
                            label_source: item.label_source,
                            label_jr: item.label_jr,
                            label_xyk: item.label_xyk,
                            label_ds: item.label_ds,
                            mmdd: item.mmdd,
                        });
                    }
                })
            },

            modify(row) {
                this.postRequest('admin/getUpdateLabelMobileData', {
                    id: row.id
                }).then(res => {
                    this.modifyData = {
                        visible: true,
                        id: res.data.data.labelMobile.id,
                        mobile: res.data.data.labelMobile.mobile,
                        label_source: res.data.data.labelMobile.label_source,
                        label_jr: res.data.data.labelMobile.label_jr === 1,
                        label_xyk: res.data.data.labelMobile.label_xyk === 1,
                        label_ds: res.data.data.labelMobile.label_ds === 1,
                        label_time: res.data.data.label_time,
                    }
                })
            },
            submitModify() {
                this.postRequest('admin/saveUpdateLabelMobileData', {
                    id: this.modifyData.id,
                    mobile: this.modifyData.mobile,
                    label_source: this.modifyData.label_source,
                    label_jr: this.modifyData.label_jr === true ? 1 : 0,
                    label_xyk: this.modifyData.label_xyk === true ? 1 : 0,
                    label_ds: this.modifyData.label_ds === true ? 1 : 0,
                    label_time: this.modifyData.label_time,
                }).then(res => {
                    this.modifyData.visible = false;
                    this.checkData();
                    this.resAlert(res.data)
                })
            },
            del(row) {
                this.$confirm("确认删除【" + row.mobile + "】?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.postRequest('admin/deleteLabelMobile', {
                        id: row.id
                    }).then(res => {
                        this.checkData();
                        this.resAlert(res.data)
                    })
                })
                    .catch(() => {
                    });

            },
            bulkSend() {
                if (this.sum > 0) {
                    this.postRequest('admin/getlabelSendData', {
                        mobile: this.mobile,
                        label_source: this.label_source,
                        startDate: this.formatDate2(this.startDate),
                        endDate: this.formatDate2(this.endDate),
                        label_jr: this.label_jr ? 1 : 0,
                        label_xyk: this.label_xyk ? 1 : 0,
                        label_ds: this.label_ds ? 1 : 0,
                        count: this.sum,
                    }).then(res => {
                        this.bulkSendData = {
                            visible: true,
                            mobile: res.data.data.mobile,
                            label_source: res.data.data.label_source,
                            startDate: res.data.data.startDate,
                            endDate: res.data.data.endDate,
                            label_jr: res.data.data.label_jr === 1,
                            label_xyk: res.data.data.label_xyk === 1,
                            label_ds: res.data.data.label_ds === 1,
                            content: '',
                            sms_count: res.data.data.count,
                        }
                    })
                } else this.$message.warning('查询结果为空，无法批量发送')
            },
            submitBulkSend() {
                this.postRequest('admin/labelSend',
                    // this.$axios('192.168.1.246/admin/labelSend',
                    {
                        mobile: this.bulkSendData.mobile,
                        label_source: this.bulkSendData.label_source,
                        startDate: this.bulkSendData.startDate,
                        endDate: this.bulkSendData.endDate,
                        label_jr: this.bulkSendData.label_jr ? 1 : 0,
                        label_xyk: this.bulkSendData.label_xyk ? 1 : 0,
                        label_ds: this.bulkSendData.label_ds ? 1 : 0,
                        content: this.bulkSendData.content,
                        sms_count: this.bulkSendData.sms_count,
                    }).then(res => {
                    this.checkData();
                    this.bulkSendData.visible = false;
                    this.resAlert(res.data)
                })
            },
            send() {
                if (this.sum > 0) {
                    this.postRequest('admin/getlabelSendData',
                        // this.$axios.post('http://192.168.1.246:8010/admin/getlabelSendData',
                        {
                            mobile: this.mobile,
                            label_source: this.label_source,
                            startDate: this.formatDate2(this.startDate),
                            endDate: this.formatDate2(this.endDate),
                            label_jr: this.label_jr ? 1 : 0,
                            label_xyk: this.label_xyk ? 1 : 0,
                            label_ds: this.label_ds ? 1 : 0,
                            count: this.sum,
                        }).then(res => {
                        this.SendData = {
                            visible: true,
                            mobile: res.data.data.mobile,
                            label_source: res.data.data.label_source,
                            startDate: res.data.data.startDate,
                            endDate: res.data.data.endDate,
                            label_jr: res.data.data.label_jr === 1,
                            label_xyk: res.data.data.label_xyk === 1,
                            label_ds: res.data.data.label_ds === 1,
                            content: '',
                            sms_count: res.data.data.count,
                        }
                    })
                } else this.$message.warning('查询结果为空，无法批量发送')

            },
            submitSend() {
                this.postRequest('admin/commonLabelSend',
                    // this.$axios.post('http://192.168.1.246:8010/admin/commonLabelSend',
                    {
                        mobile: this.SendData.mobile,
                        label_source: this.SendData.label_source,
                        startDate: this.SendData.startDate,
                        endDate: this.SendData.endDate,
                        label_jr: this.SendData.label_jr ? 1 : 0,
                        label_xyk: this.SendData.label_xyk ? 1 : 0,
                        label_ds: this.SendData.label_ds ? 1 : 0,
                        content: this.SendData.content,
                        sms_count: this.SendData.sms_count,
                    }).then(res => {
                    this.checkData();
                    this.SendData.visible = false;
                    this.resAlert(res.data)
                })
            },
            sendSMS() {
                if (this.sum > 0) {
                    this.postRequest('admin/getlabelSendData',
                        // this.$axios.post('http://192.168.1.246:8010/admin/getlabelSendData',
                        {
                            mobile: this.mobile,
                            label_source: this.label_source,
                            startDate: this.formatDate2(this.startDate),
                            endDate: this.formatDate2(this.endDate),
                            label_jr: this.label_jr ? 1 : 0,
                            label_xyk: this.label_xyk ? 1 : 0,
                            label_ds: this.label_ds ? 1 : 0,
                            count: this.sum,
                        }).then(res => {
                        this.sendSMSData = {
                            visible: true,
                            file1: '',
                            mobile: res.data.data.mobile,
                            label_source: res.data.data.label_source,
                            startDate: res.data.data.startDate,
                            endDate: res.data.data.endDate,
                            label_jr: res.data.data.label_jr === 1,
                            label_xyk: res.data.data.label_xyk === 1,
                            label_ds: res.data.data.label_ds === 1,
                            content: '',
                            sms_count: res.data.data.count,
                        };
                        this.sendSmsFormData.set('mobile', res.data.data.mobile);
                        this.sendSmsFormData.set('label_source', res.data.data.label_source);
                        this.sendSmsFormData.set('startDate', res.data.data.startDate);
                        this.sendSmsFormData.set('endDate', res.data.data.endDate);
                        this.sendSmsFormData.set('label_jr', res.data.data.label_jr);
                        this.sendSmsFormData.set('label_xyk', res.data.data.label_xyk);
                        this.sendSmsFormData.set('label_ds', res.data.data.label_ds);
                        this.sendSmsFormData.set('sms_count', res.data.data.count);
                    })
                } else this.$message.warning('查询结果为空，无法批量发送')

            },
            uploadFile(raw) {
                this.sendSmsFormData.set('file1', raw.file)
            },
            submitSendSMS() {
                this.$refs.sendSmsData.validate(valid => {
                    if (valid) {
                        this.sendSmsFormData.set('content', this.sendSMSData.content);
                        this.postRequest('admin/mmsLabelSend',
                            // this.$axios.post('http://192.168.1.246:8010/admin/mmsLabelSend',
                            this.sendSmsFormData).then(res => {
                            this.checkData();
                            this.sendSMSData = {
                                visible: false,
                                file1: '',
                                mobile: '',
                                label_source: '',
                                startDate: '',
                                endDate: '',
                                label_jr: '',
                                label_xyk: '',
                                label_ds: '',
                                content: '',
                                sms_count: '',
                            };
                            this.resAlert(res.data)
                        })
                    } else return false;
                })
            },
        },
    }
</script>

<style scoped>

</style>
