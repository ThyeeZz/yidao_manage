<template>
  <div class="container">
    <div class="sideBar" width="25%" heiht="100%">
      <el-tree
        :data="deptList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
        :expand-on-click-node="false"
      ></el-tree>
    </div>
    <div class="content">
      <div class="formWrap" v-if="menuFlag" width="75%" heiht="100%">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
          <el-form-item label="部门编号：" :label-width="formLabelWidth" prop="id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门名称：" :label-width="formLabelWidth" prop="deptName">
            <el-input v-model="form.deptName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="上级部门：" :label-width="formLabelWidth" prop="pdeptName">
            <el-input
              v-model="form.pdeptName"
              autocomplete="off"
              :disabled="true"
              placeholder="一级部门置空"
            ></el-input>
          </el-form-item>

          <el-form-item label="序号：" :label-width="formLabelWidth" prop="seq">
            <el-input v-model="form.seq" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注：" :label-width="formLabelWidth" prop="note">
            <el-input type="textarea" v-model="form.note" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="saveMenu('form')" class="btn">更新菜单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deptList: [
        {
          label: "部门列表",
          deptName: "部门列表",
          seq: 0,
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      form: {
        id: "",
        deptName: "",
        pdeptName: "",
        seq: "",
        note: ""
      },
      menuFlag: false,
      formLabelWidth: "120px",
      rules: {
        deptName: [{ required: true, message: "不能为空", trigger: "blur" }],
        seq: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      this.menuFlag = true;
      this.form = {
        id: data.id,
        deptName: data.deptName,
        pdeptName: "",
        seq: data.seq,
        note: data.note
      };
    },
    saveMenu(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.menuFlag = false;
          let self = this;
          let params = `${this.form.deptName},${this.form.pdeptName},${
            this.form.note
          },${this.form.seq},${this.form.id}`;
          this.postRequest("admin/saveAddDept", { params: params }).then(
            res => {
              if (res.data.success) {
                self.succeed("保存成功");
              } else {
                self.failed("保存失败");
              }
            }
          );
        } else {
          return false;
        }
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
    handleSizeChange() {
      this.checkData();
    },
    handlePageChange() {
      this.checkData();
    },
    checkData() {
      let self = this;
      this.postRequest("admin/listDept", {}).then(res => {
        console.log(res);
        for (let item of res.data.data.deptList) {
          self.deptList[0].children.push({
            label: item.deptName,
            deptName: item.deptName,
            id: item.id,
            pdeptId: item.pdeptId,
            seq: item.seq,
            zid: item.zid,
            zpid: item.zpid,
            note: item.note,
            children: []
          });
        }
      });
    },
    cancel() {}
  },
  mounted() {
    this.checkData();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 90%;
}
.container .content {
  overflow: auto;
  margin: 0 auto;
  position: relative;
}
.container .content form {
  border-bottom: 1px solid rgb(220, 220, 220);
}
.container .content button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>
