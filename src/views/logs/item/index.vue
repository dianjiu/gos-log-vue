<template>
  <div class="details-container" v-loading="loading">
    <!--头部-->
    <el-row class="details-top">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-input class="input-size"
            placeholder="客户端ID"
            v-model="searchForm.clientId">
          </el-input>
          <el-input class="input-size"
            placeholder="项目名称"
            v-model="searchForm.itemName">
          </el-input>
          <el-input class="input-size"
            placeholder="项目备注"
            v-model="searchForm.itemDesc">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content add-button-light">
          <el-button type="primary" icon="el-icon-edit" @click="dialogFlag = true">
            新增项目日志
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--表单-->
    <el-table
      class="details-body"
      :data="tableData"
      border>
      <el-table-column
        v-for="kk in tableColumn"
        :key="kk.id"
        :prop="kk.props"
        :width="kk.width"
        :label="kk.label"
        :fixed="kk.fixed"
        align="center"
        style="cursor: pointer;"
      >
        <template slot-scope="scope">
          <div v-if="kk.option">
            <span>{{ kk.option[scope.row[kk.props]] ? kk.option[scope.row[kk.props]].label : '--' }}
            </span>
          </div>
          <span v-else>{{ !isNumber(scope.row[kk.props]) && !scope.row[kk.props] ? '暂无数据' :  scope.row[kk.props]}} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="上下架" placement="bottom">
            <el-switch
              class="switch-btn"
              v-model="scope.row.status == 0 ? false : true"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.$index, scope.row.id)">
            </el-switch>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button @click="handleEdit(scope.$index, scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button @click="handleDelete(scope.$index, scope.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block common-footer-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationParams.page"
        :page-size="paginationParams.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFlag" width="600px" :before-close='beforeClose'>
      <div slot="title" style="text-align:center">
        <span v-if="edit">编辑项目日志</span>
        <span v-else>新增项目日志</span>
      </div>
      <el-form :model="submitForm" ref="submitForm" :rules="submitFormRules" label-width="105px">
        <el-form-item v-for="(item,index) in submitFormItem" :key="index" :label="item.label" :prop="item.props">
          <el-radio-group v-model="submitForm[item.props]" v-if="item.type == 'radio'">
            <el-radio :label="i.value" v-for="i in item.option" :key="i.value">{{ i.label }}</el-radio>
          </el-radio-group>
          <el-input v-model="submitForm[item.props]" v-else></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="beforeClose" style="margin-right:20px">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getItemList,
  changeStatus,
  deleteItem,
  getItemInfo,
  updateItem,
  insertItem
} from "@/api/item.js"
import {
  itemStatus
} from '@/utils/global.config.js'
import {
  isNumber
} from "lodash"
export default {
  data() {
    return {
      isNumber,
      itemStatus,
      dialogFlag:false,
      loading:false,
      tableData:[],
      tableColumn:[
        {props:'id',label:'ID',width:50},
        {props:'clientId',label:'客户端ID'},
        {props:'itemName',label:'项目名称',},
        {props:'itemDesc',label:'项目备注'},
        {props:'logPath',label:'日志路径',width:200},
        {props:'logPrefix',label:'日志前缀'},
        {props:'logSuffix',label:'日志后缀'},
        {props:'status',label:'是否有效',option:itemStatus},
      ],
      searchForm:{
        ip:"",
        info:""
      },
      submitFormRules:{
        clientId:[{ required: true, message: '请输入', trigger: 'blur' },],
        itemName:[{ required: true, message: '请输入', trigger: 'blur' },],
        itemDesc:[{ required: true, message: '请输入', trigger: 'blur' },],
        logPath:[{ required: true, message: '请输入', trigger: 'blur' },],
        status:[{ required: true, message: '请选择', trigger: 'blur' },],
        
      },
      paginationParams:{
        page:1,
        limit:10
      },
      submitForm:{
        clientId:"",
        itemName:"",
        itemDesc:"",
        logPath:"",
        logPrefix:"",
        logSuffix:"",
        status:""
      },
      submitFormItem:[
        {props:'clientId',label:'客户端ID'},
        {props:'itemName',label:'项目名称',},
        {props:'itemDesc',label:'项目备注'},
        {props:'logPath',label:'日志路径'},
        {props:'logPrefix',label:'日志前缀'},
        {props:'logSuffix',label:'日志后缀'},
        {props:'status',label:'是否有效',type:'radio',option:[{label:'启用',value:"1"},{label:'禁用',value:"0"}]},
      ],
      total:0,
      edit:false
    }
  },
  created(){
    this.handleSearch()
  },
  methods: {
    handleSearch(){
      this.loading = true
      let params = {
        ...this.paginationParams
      }
      Object.keys(this.searchForm).forEach(key => {
        if(this.searchForm[key]){
          params[key] = this.searchForm[key]
        }
      })
      getItemList(params).then(res => {
        this.loading = false
        console.log(res)
        // this.tableData = res.list
        this.tableData = res.list
        this.total = res.totalCount

      }).catch(err => {
        console.log(err)
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleCurrentChange(page) {
      this.paginationParams.page = page
      this.handleSearch()
    },
    handleSizeChange(pageSize) {
      this.paginationParams.page = 1
      this.paginationParams.limit = pageSize
      this.handleSearch()
    },
    changeStatus(index, id) {
      console.log(index,id)
      // return
      this.loading = true
      changeStatus({id}).then(res => {
        this.$success('修改成功')
        this.loading = false
        this.handleSearch()
      }).catch(err => {
        this.loading = false
      })
    },
    handleEdit(index, id) {
      console.log(index,id)
      this.loading = true
      console.log("id=="+id)
      getItemInfo(id).then(res => {
        this.loading = false
        this.dialogFlag = true
        this.edit = true
        Object.keys(this.submitForm).forEach(key => {
          this.submitForm[key] = res[key]
        })
        this.submitForm.id = res.id
      }).catch(err => {
        this.loading = false
      })
    },
    handleDelete(index, id) {
      console.log(index,id)
      this.$quickConfirm("确定删除吗？",()=>{
        this.loading = true
        deleteItem(id).then(res => {
          this.tableData.splice(index,1)
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },()=>{},{})
    },
    beforeClose(){
      this.dialogFlag = false
      this.edit = false
      this.$refs.submitForm.resetFields()
    },
    submit(){
      this.$refs.submitForm.validate(valid => {
        console.log(this.submitForm)
        this.submitForm.clientId=Number(this.submitForm.clientId)
        if(valid){
          let api = this.edit ? updateItem : insertItem
          this.loading = true
          api(this.submitForm).then(res => {
            this.loading = false
            this.$refs.submitForm.resetFields()
            this.dialogFlag = false
            this.handleSizeChange(10)
          }).catch(err => {
            this.loading = false
          })
        }
      })
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
.input-size{
  width: auto;
  margin-right: 20px;
}
</style>
