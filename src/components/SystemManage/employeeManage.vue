<template>
<div>
  <div style="margin-bottom: 5px;margin-top: 10px">
  <el-form ref="searchForm" :model="searchForm" label-width="80px">
    <el-row :gutter="50">
      <el-col :sm="5">
        <el-button plain type="success" icon="el-icon-download" @click="init">新增</el-button>
      </el-col>
      <el-col :sm="5" :offset="4">
        <el-form-item  prop="param">
        <el-input  v-model="searchForm.param" autocomplete="off" placeholder="请输入要查找的姓名,工号或职位" style="width: 250px"></el-input>
        </el-form-item>
      </el-col>
      <el-button plain type="primary" icon="el-icon-search"  @click="searchByNameOrId(searchForm)">查询</el-button>
    </el-row>
  </el-form>
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" style="width: 1000px;margin-left: 300px">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="姓名" prop="employeeName" :label-width="formLabelWidth">
          <el-input v-model="form.employeeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="hireDate" :label-width="formLabelWidth">
          <el-date-picker v-model="form.hireDate" type="date" placeholder="选择入职日期"  style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职位" prop="post" :label-width="formLabelWidth">
          <el-input v-model="form.post" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <div style="margin-left: 50px">
  <el-table :data="tableData" size="mini" :fit="true"  border  style="width: 90%;" max-height="500px" >
    <el-table-column property="jobNo" label="工号" width="60">
    </el-table-column>
    <el-table-column property="employeeName" label="姓名" width="100">
    </el-table-column>
    <el-table-column property="sex" label="性别" width="70">
    </el-table-column>
    <el-table-column property="age"  label="年龄" width="80">
    </el-table-column>
    <el-table-column property="idCard" label="身份证" width="180">
    </el-table-column>
    <el-table-column property="phone" label="联系方式" width="120">
    </el-table-column>
    <el-table-column   property="hireDate"  label="入职日期" width="100">
    </el-table-column>
    <el-table-column property="post" label="职位" width="100">
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="update(scope.row)">修改</el-button>
        <el-button type="text" @click="deleteNotes(scope.row.jobNo)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination   background style="float:right" :current-page="inform.currentPage" @current-change="clickPage"
                    :total="totalSize"  :page-size="8" layout="total, prev, pager, next,jumper">
    </el-pagination>
  </div>
  </div>
</template>
<script>
    import Fetch from "../../fetch";
    import Module from "../../module/prototype"
    export default {
        name: "employeeManage",
      data(){
          return{
            dialogFormVisible: false,
            formLabelWidth:'80px',
            tableData:[],
            totalSize:1,
            inform:{
              currentPage:1,
              rows:8,
            },
            form:{
              employeeName:'',
              sex:'',
              age:'',
              idCard:'',
              phone:'',
              hireDate:'',
              post:''
            },
            searchForm:{
              param:''
            },
            rules:{
              employeeName: [
                {required: true, message: '请输入姓名', trigger: 'blur'}
              ],
              idCard: [
                {required: true, message: '请输入身份证', trigger: 'blur'}
              ],
              phone: [
                {required: true, message: '请输入电话', trigger: 'blur'}
              ],
              hireDate: [
                {required: true, message: '请输入入职日期', trigger: 'blur'}
              ],
            }
          }
      },
      mounted(){
       this.search();
      },
      methods: {
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        init () {
          this.dialogFormVisible = true;
          for(let item in this.form){
            this.form[item] = ''
          }
        },
        clickPage (page) {
          this.inform.currentPage = page
          this.search()
        },
        search() {
              Fetch.getEmployeeInfo(this.inform).then(res => {
                if (res.code == 0) {
                  this.tableData = res.content.dataList
                  this.totalSize = res.content.totalSize
                } else {
                  this.$notify({
                    title: '获取失败',
                    type: "error"
                  })
                }
              })
        },
        isInArray: function (arr, value) {
          for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
              return true;
            }
          }
          return false;
        },
        searchByNameOrId(searchForm) {
          let params = this.searchForm.param.toString()
          if (isNaN(params)) {
             let post=['管理员','超级管理员','业务员','主管','跟货员','司机','调度员']
            if(this.$options.methods.isInArray(post,params)){
              Fetch.getEmployeeInfoByPost(this.searchForm).then(res => {
                if (res.code == 0) {
                  this.tableData = res.content.result
                } else {
                  this.$notify({
                    title:res.msg,
                    type: "error"
                  })
                }
              })
            }
            else{
            Fetch.getEmployeeInfoByName(this.searchForm).then(res => {
              if (res.code == 0) {
                this.tableData = res.content.result
              } else {
                this.$notify({
                  title:res.msg,
                  type: "error"
                })
              }
            })
            }
          } else if(params=="" ){
            this.search()
          }
          else
          {
            Fetch.getEmployeeInfoById(this.searchForm).then(res => {
              if (res.code == 0) {
                this.tableData = res.content.result
              } else {
                this.$notify({
                  title:res.msg,
                  type: "error"
                })
              }
            })
          }
        },
        update (row){
          this.dialogFormVisible = true;
          this.form = Module.deepClone(row);
        },
        sure() {
          this.$refs['form'].validate(valid => {
            if (valid) {
              let params = Module.deepClone(this.form);
              let newForm = Module.formParamsFilter(params)
              if (params.jobNo && params.jobNo != '') {
                Fetch.updateEmployeeInfo(newForm).then(res => {
                  if (res.code == 0) {
                    this.$notify({
                      title: '修改成功',
                      message: "修改成功",
                      type: "success"
                    })
                    this.search();
                    this.dialogFormVisible = false;
                  } else {
                    this.$notify({
                      title: '修改失败',
                      type: "error"
                    })
                  }
                })
              } else {
                Fetch.addEmployeeInfo(newForm).then(res => {
                  if (res.code == 0) {
                    this.$notify({
                      title: '新增成功',
                      message: "新增成功",
                      type: "success"
                    })
                    this.search();
                    this.dialogFormVisible = false;
                  } else {
                    this.$notify({
                      title: '添加失败',
                      type: "error"
                    })
                  }
                })
              }
            }
            else{
            }
          })
        },
        deleteNotes (id) {
          this.$confirm('请仔细检查并确认是否删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Fetch.deleteEmployeeInfo({jobNo:id}).then(res=>{
              if(res.code == 0){
                this.$notify({
                  title: '删除成功',
                  message: "删除成功",
                  type: "success"
                });
                this.search()
              }else{
                this.$notify({
                  title: '删除失败',
                  message: res.msg,
                  type: "error"
                });
              }
            }).catch(err=>{
              this.$notify({
                title: '删除失败',
                message: "网络不给力",
                type: "error"
              });
            })
          }).catch(error => {

          })
        },
        // hireDateFilterHandler(value, row, column) {
        //   const property = column['property'];
        //   return row[property] === value;
        // },
        // ageFilterHandler(value, row, column) {
        //   const property = column['property'];
        //   return row[property] === value;
        // },
        }
    }
</script>

<style scoped>

</style>
