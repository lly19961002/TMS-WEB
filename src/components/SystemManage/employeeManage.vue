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
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.employee_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="form.ID_card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.hire_date" type="date" placeholder="选择入职日期"  style="width:100%">
          </el-date-picker>
          <!--<el-input v-model="form.hire_date" autocomplete="off"></el-input>-->
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.post" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <div style="margin-left: 150px">
  <el-table :data="tableData"   border  style="width: 80%">
    <el-table-column v-model="job_no" label="工号" width="180">
    </el-table-column>
    <el-table-column v-model="employee_name" label=姓名" width=180">
    </el-table-column>
    <el-table-column v-model="sex" label="性别">
    </el-table-column>
    <el-table-column v-model="age" label="年龄">
    </el-table-column>
    <el-table-column v-model="ID_card" label="身份证">
    </el-table-column>
    <el-table-column v-model="phone" label="联系方式">
    </el-table-column>
    <el-table-column v-model="hire_date" label="入职日期">
    </el-table-column>
    <el-table-column v-model="post" label="职位">
    </el-table-column>
    <el-table-column v-model="operate" label="操作">
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>

<script>
    export default {
        name: "employeeManage",
      data(){
          return{
            dialogFormVisible: false,
            formLabelWidth:'80px',
            form:{
              employee_name:'',
              sex:'',
              age:'',
              ID_card:'',
              phone:'',
              hire_date:'',
              post:''
            }
          }
      }

    }
</script>

<style scoped>

</style>
