<template>

<div>
  <div style="margin-bottom: 40px;margin-top: 50px">
  <el-form ref="form" :model="form" label-width="80px">
    <el-row :gutter="50">
      <el-col :sm="5">
        <el-button plain type="success" icon="el-icon-download" @click="dialogFormVisible = true">新增</el-button>
      </el-col>
      <el-col :sm="1" :offset="9">
        <el-input type="username" placeholder="请输入要查找的姓名" style="width: 300px"></el-input>
      </el-col>
      <el-button plain type="primary" icon="el-icon-search"  @click="search(form)">查询</el-button>
    </el-row>
  </el-form>
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" style="width: 1000px;margin-left: 300px">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="姓名" prop="employee_name" :label-width="formLabelWidth">
          <el-input v-model="form.employee_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="ID_card" :label-width="formLabelWidth">
          <el-input v-model="form.ID_card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="hire_date" :label-width="formLabelWidth">
          <el-date-picker v-model="form.hire_date" type="date" placeholder="选择入职日期"  style="width:100%">
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
  <div style="margin-left: 150px">
  <el-table :data="tableData"   border  style="width: 80%">
    <el-table-column property="job_no" label="工号" >
    </el-table-column>
    <el-table-column property="employee_name" label="姓名">
    </el-table-column>
    <el-table-column property="sex" label="性别">
    </el-table-column>
    <el-table-column property="age" label="年龄">
    </el-table-column>
    <el-table-column property="ID_card" label="身份证">
    </el-table-column>
    <el-table-column property="phone" label="联系方式">
    </el-table-column>
    <el-table-column property="hire_date" label="入职日期">
    </el-table-column>
    <el-table-column property="post" label="职位">
    </el-table-column>
    <el-table-column v-model="operate" label="操作">
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>
<script>
    import Fetch from "../../fetch";

    export default {
        name: "employeeManage",
      data(){
          return{
            dialogFormVisible: false,
            formLabelWidth:'80px',
            tableData:[],
            form:{
              employee_name:'',
              sex:'',
              age:'',
              ID_card:'',
              phone:'',
              hire_date:'',
              post:''
            },
            rules:{
              employee_name: [
                {required: true, message: '请输入姓名', trigger: 'blur'}
              ],
              ID_card: [
                {required: true, message: '请输入身份证', trigger: 'blur'}
              ],
              phone: [
                {required: true, message: '请输入电话', trigger: 'blur'}
              ],
              hire_date: [
                {required: true, message: '请输入入职日期', trigger: 'blur'}
              ],
            }
          }
      },
      mounted(){
        Fetch.getEmployeeInfo().then(res => {
          if (res.code == 0) {
            this.tableData=res.content.employeeInfo
          }
          else {
            this.$no获取tify({
              title: '失败',
              type: "error"
            })
          }
        })
      },
      methods: {
        sure()
        {
          this.$refs['form'].validate(valid => {
            if (valid) {
              let params = this.deepClone(this.form);
              params.hire_date = this.timeChange(this.form.hire_date);
              // if (params.id && params.id != '') {
              Fetch.addEmployeeInfo(this.formParamsFilter(params)).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: '修改成功',
                    message: "修改成功",
                    type: "success"
                  })
                } else {
                  this.$notify({
                    title: '添加失败',
                    type: "error"
                  })
                }
              })
            }
          })
        }

    }
    }
</script>

<style scoped>

</style>
