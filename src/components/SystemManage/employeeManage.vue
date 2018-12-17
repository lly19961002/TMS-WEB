<template>

<div>
  <div style="margin-bottom: 20px;margin-top: 100px">
  <el-form ref="form" :model="form" label-width="80px">
    <el-row :gutter="50">
      <el-col :sm="5">
        <el-button plain type="success" icon="el-icon-download" @click="exportExcel">新增</el-button>
      </el-col>
      <el-col :sm="1" :offset="9">
        <el-input type="username" placeholder="请输入要查找的姓名" style="width: 300px"></el-input>
      </el-col>
      <el-button plain type="primary" icon="el-icon-search"  @click="search(form)">查询</el-button>
    </el-row>
  </el-form>
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
        name: "employeeManage"
    }
</script>

<style scoped>

</style>
