<template>
  <div class="container">
    <el-form v-on:keyup.enter.native="checkData" label-width="120px" inline="inline">
      <el-form-item label="批次号：">
        <el-input v-model="cid"></el-input>
      </el-form-item>

      <el-form-item label="url：">
        <el-input v-model="url"></el-input>
      </el-form-item>

      <el-form-item label="开始时间：">
        <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间：">
        <el-date-picker v-model="endDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="checkData" type="primary" plain>查询</el-button>
      </el-form-item>
    </el-form>

    <el-card v-if="checkIn">
      <el-table border ref="table" v-loading="loading" :data="tableData" stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="cid" label="批次号"></el-table-column>
        <el-table-column prop="url" label="url"></el-table-column>
        <el-table-column prop="phonenum" label="号码数量"></el-table-column>
        <el-table-column prop="sendtime" label="发送时间"></el-table-column>
      </el-table>
      <el-pagination
        class="fr"
        style="margin:10px 0"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page.sync="pageNum"
        :page-size="[30,50]"
        :page-size.sync="pageSize"
        :total="sum"
         layout="sizes, prev, pager, next, jumper"
      ></el-pagination>
      <span class="fr" style="padding-top: 15px;font-size: 14px;">共{{sum}}条，</span>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "admin_bqfspclb",
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      cid: "",
      url: "",

      pageNum: 1,
      pageSize: 30,
      sum: 0,
      index: 0,
      tableData: [],
      checkIn: false,
      loading: false
    };
  },
  methods: {
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
      this.tableData = [];
      this.checkIn = true;
      this.loading = true;
      let self = this;
      this.postRequest("admin/labelSendBatchList", {
        startDate: this.formatDate2(this.startDate),
        endDate: this.formatDate2(this.endDate),
        cid: this.cid,
        url: this.url,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        self.loading = false;
        self.sum = res.data.data.page.totalCount;
        for (let item of res.data.data.labels) {
          self.tableData.push({
            index: self.index,
            id: item.id,
            cid: item.cid,
            phonenum: item.phonenum,
            sendtime: item.sendtime,
            url: item.url,
          });
          self.index++;
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
</style>


