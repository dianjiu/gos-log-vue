<template>
  <div class="details-container" v-loading="loading">
    <!--头部-->
    <el-form
      :model="searchForm"
      ref="searchForm"
      label-width="100px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item label="客户端" prop="client" required>
        <el-select
          v-model="searchForm.client"
          style="width: 220px"
          prop="client"
          @change="ChangeItemList"
        >
          <el-option :value="0" label="全部"></el-option>
          <el-option
            v-for="i in clientOption"
            :value="i.id"
            :label="i.info"
            :key="i.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目日志" prop="item" required>
        <el-select v-model="searchForm.item" style="width: 220px">
          <el-option
            v-for="i in itemOption"
            :value="i.id"
            :label="i.itemDesc"
            :key="i.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="向下截取" prop="line" required>
        <el-input
          v-model="searchForm.line"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          style="width: 220px"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="日志日期" prop="date" required>
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字" prop="key" required>
        <el-input v-model="searchForm.key" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchSubmit"
          style="width: 220px"
        >
          立即查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSearchFile, getClientList, getItemList } from "@/api/search.js";

export default {
  data() {
    return {
      clientOption: [],
      itemOption: [],
      searchForm: {
        client: 0,
        item: "",
        line: 1000,
        date: "",
        key: "",
      },
      value1: true,
      loading: false,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    searchSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.searchForm.client = parseInt(this.searchForm.client);
          getSearchFile(this.searchForm).then((res) => {
            this.loading = false;
            if (!res) {
              return;
            }
            console.log(res);
            let blob = new Blob([res], {
              type: "application/octet-stream",
            });
            const fileName = this.searchForm.key + ".zip";
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          });
        }
      });
    },
    handleSearch() {
      getClientList().then((res) => {
        if (!res) {
          return;
        }
        console.log(res);
        this.clientOption = res.data;
      });
      var client_id = 1;
      getItemList({ client_id }).then((res) => {
        if (!res) {
          return;
        }
        console.log(res);
        this.itemOption = res.data;
      });
    },
    ChangeItemList() {
      console.log("client id is :" + this.searchForm.client);
      var client_id = this.searchForm.client == 0 ? 1 : this.searchForm.client;
      getItemList({ client_id }).then((res) => {
        if (!res) {
          return;
        }
        console.log(res);
        this.itemOption = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.details-container {
  margin: 25px;
}
.details-top {
  .add-button-light {
    float: right;
  }
}
.details-body {
  width: 100%;
  margin: 20px 0;
  .switch-btn {
    margin-right: 10px;
  }
}
.details-foot {
}
.input-size {
  width: auto;
  margin-right: 20px;
}
</style>
