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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="send(scope.row)">已点击发送</el-button>
            <el-button type="text" @click="unsend(scope.row)">未点击发送</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cid" label="批次号"></el-table-column>
        <el-table-column prop="url" label="url"></el-table-column>
        <el-table-column prop="click_num" label="点击数"></el-table-column>
        <el-table-column prop="unclick_num" label="未点击数"></el-table-column>
        <el-table-column prop="all_num" label="总数"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间"></el-table-column>
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
  name: "admin_bqrtjlb",
  data() {
    return {
      cid:"",
      url:"",
      startDate:new Date(),
      endDate:new Date(),

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
      this.postRequest("admin/labelDayReportList", {
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
            url: item.url,
            click_num: item.click_num,
            unclick_num: item.unclick_num,
            all_num: item.all_num,
            createtime: item.createtime,
            updatetime: item.updatetime
          });
          self.index++;
        }
      });
    },
    cancel() {},
    send(){},
    unsend(){},
  },
  mounted() {
    this.checkData();
  }
};
</script>
<style scoped>
</style>


