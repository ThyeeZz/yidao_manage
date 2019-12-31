<template>
    <div class="container">
        <el-button type="text" @click="addManageAuthRole">+添加系统角色</el-button>
        <el-button type="text" @click="addAgentRole">+添加代理商角色</el-button>
        <el-button type="text" @click="addClientRole">+添加客户角色</el-button>
        <el-form inline="inline" label-width="120px" v-on:keyup.enter.native="checkData">
            <el-form-item label="角色：">
                <el-input  v-model="roleName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="checkData" type="primary" plain class="fr">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 添加系统角色操作弹出框 -->
        <el-dialog title="添加系统角色" :visible.sync="manageRoleVisible">
            <el-form :model="role" :rules="rules" ref="role" label-width="120px">
                <el-form-item label="角色ID：" prop="roleID">
                    <el-select v-model="role.roleID">
                        <el-option
                            v-for="item in options"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色简称：" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="role.roleName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="roleNameCn">
                    <el-input v-model="role.roleNameCn" autocomplete="off" placeholder="如：客服账号"></el-input>
                </el-form-item>

                <el-form-item label="备注：" :label-width="formLabelWidth" prop="info">
                    <el-input type="textarea" :rows="2" placeholder="如：级别为3的客服" v-model="role.info"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAddAuthRole('role')">添加</el-button>
                <el-button @click="resetForm('role')">取消</el-button>
            </div>
        </el-dialog>

        <!-- 添加代理商角色操作弹出框 -->
        <!--  -->
        <!-- 添加客户角色操作弹出框 -->
        <el-dialog title="添加客户角色" :visible.sync="clientRoleVisible">
            <el-form :model="clientRole" :rules="rules" ref="clientRole" label-width="120px">
                <el-form-item label="角色ID：" prop="roleID">
                    <el-select v-model="clientRole.roleID">
                        <el-option
                            v-for="item in clientRoleOptions"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色简称：" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="clientRole.roleName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="roleNameCn">
                    <el-input v-model="clientRole.roleNameCn" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注：" :label-width="formLabelWidth" prop="info">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="clientRole.info"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAddClientRole('clientRole')">添加</el-button>
                <el-button @click="resetForm('clientRole')">取消</el-button>
            </div>
        </el-dialog>

        <el-card v-if="checkIn">
            <el-table border ref="table" v-loading="loading" :data="tableData" stripe>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="permission(scope.row)">权限分配</el-button>
                        <el-button type="text" @click="deleteDate(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="roleNameCn" label="角色名"></el-table-column>
                <el-table-column prop="info" label="备注"></el-table-column>
            </el-table>
            <el-pagination
                class="fr"
                style="margin:10px 0"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                :current-page.sync="pageNum"
                                :page-size.sync="pageSize"
                 layout="sizes, prev, pager, next, jumper"
            ></el-pagination>
            <span class="fr" style="padding-top: 15px;font-size: 14px;">共{{sum}}条，</span>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clientRoleOptions: [
                    {
                        key: 1,
                        label: "web主账号",
                        value: 1201
                    },
                    {
                        key: 2,
                        label: "web子账号",
                        value: 1202
                    },
                    {
                        key: 3,
                        label: "接口主账号",
                        value: 1203
                    },
                    {
                        key: 4,
                        label: "接口子账号",
                        value: 1204
                    }
                ],
                options: [],
                manageRoleVisible: false,
                agentRoleVisible: false,
                clientRoleVisible: false,
                roleName: "",
                roleNameCn: "",
                info: "",
                role: {
                    roleID: "",
                    roleNameCn: "",
                    roleName: "",
                    info: ""
                },
                clientRole: {
                    roleID: "",
                    roleNameCn: "",
                    roleName: "",
                    info: ""
                },
                rules: {
                    roleID: [{required: true, message: "不能为空", trigger: "blur"}],
                    roleName: [{required: true, message: "不能为空", trigger: "blur"}],
                    roleNameCn: [{required: true, message: "不能为空", trigger: "blur"}],
                    info: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                //属性图参数
                spreadFlag: false, //点击node 阻止展开
                index: 0,
                id: "",
                formLabelWidth: "120px",
                sum: 0,
                pageSize: 30,
                pageNum: 1,
                checkIn: false,
                loading: false,
                tableData: []
            };
        },
        methods: {
            //权限分配操作
            permission(row) {
                this.treeDataList = [
                    {
                        label: "菜单列表",
                        menuNameCn: "菜单列表",
                        level: 0,
                        seq: 0,
                        info: "",
                        children: []
                    }
                ];
                let levelOneList = [];
                let levelTwoList = [];
                let levelZeroList = [];
                // //console.log(row);
                let self = this;
                this.postRequest("admin/distributeAuth", {
                    roleName: row.roleName,
                    roleID: row.roleID
                }).then(res => {
                    let jsonList = res.data.data.rdList
                    this.$router.push({
                        path: "/admin_xtglcdlb",
                        query: {
                            jsonList: jsonList,
                            roleName: res.data.data.roleName
                        }
                    });
                });
            },
            //删除操作
            deleteDate(row) {
                let self = this;
                this.$confirm(`此操作将删除角色：${row.roleName}, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        self
                            .postRequest("admin/deleteAuthRole", {
                                id: row.id
                            })
                            .then(res => {
                                if (res.data.success) {
                                    this.succeed(res.data.data);
                                    this.checkData();
                                } else {
                                    this.failed(res.data.resultMsg);
                                }
                            });
                    })
                    .catch(() => {
                    });
            },
            succeed(message) {
                this.$message({
                    message: message,
                    type: "success"
                });
            },
            failed(message) {
                this.$message.error(message);
            },
            // 添加系统角色操作
            addManageAuthRole() {
                this.options = [];
                this.manageRoleVisible = true;
                let self = this;
                this.postRequest("admin/addManageAuthRole", {}).then(res => {
                    // //console.log(res);
                    for (let item of res.data.data.deptList) {
                        self.options.push({
                            value: item.id,
                            label: item.deptName,
                            key: item.id
                        });
                    }
                });
            },
            //保存添加系统角色操作
            saveAddAuthRole(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.manageRoleVisible = false;
                        let self = this;
                        this.postRequest("admin/saveAddAuthRole", {
                            role: this.role
                        }).then(res => {
                            //console.log(res);
                            if (res.data.success) {
                                self.succeed("角色添加成功");
                                self.checkData();
                                self.role = {};
                            } else {
                                self.failed("角色添加失败");
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.role = {};
                this.clientRole = {};
                this.manageRoleVisible = false;
                this.agentRoleVisible = false;
                this.clientRoleVisible = false;
            },
            //添加代理商角色操作
            addAgentRole() {
                this.agentRoleVisible = true;
            },
            //添加客户角色操作
            addClientRole() {
                this.clientRoleVisible = true;
            },
            //保存添加客户角色操作
            saveAddClientRole(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.clientRoleVisible = false;
                        let self = this;
                        this.postRequest("admin/saveAddAuthRole", {
                            role: this.clientRole
                        }).then(res => {
                            //console.log(res);
                            if (res.data.success) {
                                self.succeed("角色添加成功");
                                self.checkData();
                                this.clientRole = {};
                            } else {
                                self.failed("角色添加失败");
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleSizeChange() {
                // this.tableData = [];
                this.checkData();
            },
            handlePageChange() {
                // this.tableData = [];
                this.checkData();
            },
            checkData() {
                this.tableData = [];
                this.checkIn = true;
                this.loading = true;
                let self = this;
                this.postRequest("admin/listAuthRole", {
                    roleName: this.roleName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    self.loading = false;
                    self.sum = res.data.data.page.totalCount;
                    for (let item of res.data.data.roleList) {
                        self.tableData.push({
                            index: self.index,
                            roleName: item.roleName,
                            roleNameCn: item.roleNameCn,
                            roleID: item.roleID,
                            info: item.info,
                            id: item.id
                        });
                        self.index++;
                    }
                });
            }
        },
        mounted() {
            this.checkData();
        }
    };
</script>

<style scoped>
</style>
