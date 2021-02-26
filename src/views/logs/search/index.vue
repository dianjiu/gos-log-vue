<template>
  <div class="details-container">
    <!--头部-->
    <el-row class="details-top">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-input class="input-size"
            placeholder="选择客户端"
            v-model="input1">
          </el-input>
          <el-input class="input-size"
            placeholder="选择项目"
            v-model="input2">
          </el-input>
          <el-input class="input-size"
            placeholder="选择日期"
            v-model="input2">
          </el-input>
          <el-input class="input-size"
            placeholder="输入关键字"
            v-model="input2">
          </el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
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
