<template>
  <div class="details-container">
    <!--头部-->
    <el-form :model="searchForm" ref="searchForm" label-width="100px" class="demo-ruleForm" inline>
      <el-form-item label="客户端" prop="client">
        <el-select v-model="searchForm.client" style="width:220px" prop="client">
          <el-option value="all" label="全部"></el-option>
          <el-option v-for="i in clientOption" :value="i.value" :label="i.label" :key="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目日志" prop="item">
        <el-select v-model="searchForm.item" style="width:220px">
          <el-option v-for="i in itemOption" :value="i.value" :label="i.label" :key="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上下截取" prop="line">
        <el-input v-model="searchForm.line" :disabled="true" style="width:220px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="日志日期" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字" prop="key">
        <el-input v-model="searchForm.key" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label=" ">
         <el-button type="primary" icon="el-icon-search" @click="searchSubmit" style="width:220px">
            立即查询
          </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      clientOption:{},
      itemOption:{},
      searchForm:{
        client:"all",
        item:"",
        line:"1000",
        date:"",
        key:""
      },
      currentPage: 1,
      value1: true,
      tableData: [{
        id:'1',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '1',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'2',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '0',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'3',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '0',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'4',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '1',
        nextExecuteTime: '2020-07-02 17:15:00'
      }]
    }
  },
  methods: {
    searchSubmit(){

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeStatus(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container{
  margin: 25px;
}
.details-top{
  .add-button-light{
    float: right;
  }
}
.details-body{
  width: 100%;
  margin: 20px 0;
  .switch-btn{
    margin-right: 10px;
  }
}
.details-foot{

}
.input-size{
  width: auto;
  margin-right: 20px;
}
</style>
