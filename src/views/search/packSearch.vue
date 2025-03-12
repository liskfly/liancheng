<template>
  <div class="type">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form :model="form" ref="form" :inline="true" size="normal">
        <el-form-item label="产品框条码">
          <el-input v-model.number="form.CarrierName"></el-input>
        </el-form-item>
        <el-form-item label="产品序列号">
          <el-input v-model.number="form.SerialNumber"></el-input>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="form.date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="getSearch()">搜索</el-button>
      </el-form>
      <div class="table_container">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          :header-cell-style="{background:'#FAFAFA',color:'#515a6e'}"
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column
            prop="CarrierName"
            label="产品框条码"
          ></el-table-column>
          <el-table-column prop="SerialNumber" label="产品序列号">
          </el-table-column>
          <el-table-column prop="ProductName" label="产品名称">
          </el-table-column>
          <el-table-column prop="ProductVersion" label="产品版本">
          </el-table-column>
          <el-table-column prop="Qty" label="数量"> </el-table-column>
          <el-table-column prop="OperatorID" label="操作人"> </el-table-column>
          <el-table-column prop="Timestamp" label="操作时间"> </el-table-column>
          <el-table-column
            prop="ReturnMsg"
            label="接口返回结果"
          ></el-table-column>
          <!-- <el-table-column prop="BarCode" label=""> </el-table-column> -->
        </el-table>
      </div>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 50, 100]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { QueryPackingHistory } from "@/api/spApi";
import { getNowDate, getEndDate } from "@/utils/oeeFun";

export default {
  name: "Dashboard",
  data() {
    return {
      width: 0,
      height: 0,
      tableHeight: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      form: {
        date: [],
        CarrierName: "",
        SerialNumber: "",
      },
      tableData: [],
    };
  },
  computed: {},
  beforeMount() {
    this.getScreenHeight();
    // console.log(getNowDate());
    this.form.date = [
      `${getNowDate()} 00:00:00`,
      `${getEndDate(getNowDate())} 00:00:00`,
    ];
  },
  mounted() {},
  methods: {
    getSearch() {
      if (this.form.date === null) {
        this.$message("请输入完整信息");
        return;
      }
      if (
        this.form.date?.length === 0 &&
        this.form.CarrierName === "" &&
        this.form.SerialNumber === ""
      ) {
        this.$message("请输入完整信息");
        return;
      }
      QueryPackingHistory({
        startTime: this.form.date[0] ? this.form.date[0] : "",
        endTime: this.form.date[1] ? this.form.date[1] : "",
        CarrierName: this.form.CarrierName,
        SerialNumber: this.form.SerialNumber,
      })
        .then(({ data }) => {
          if (data.IsSuccess) {
            this.tableData = data.ResultData;
          } else {
            this.$message.error(data.Message);
            this.tableData = []
          }
        })
        .catch(() => {
          this.tableData = []
          this.$message.error("数据请求失败");
        });
    },
    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 300;
        // this.tableHeight1 =
      });
    },
    handleSizeChange(value) {
      this.pageSize = value;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  // &-container {
  //   margin: 30px;
  // }
  // &-text {
  //   font-size: 30px;
  //   line-height: 46px;
  // }
  .dashboard-text {
    margin: 30px;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
