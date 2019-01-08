<template>
  <div style="margin-top: 1px">
  <el-container style="height: 900px; border: 1px solid #eee;">
    <el-header style="text-align: left;   height: 80px;">
      <span style="font-size: 40px ">整车营运管理系统</span>
      <el-dropdown placement="top-end" style="height:40px" @command="handleCommand">
      <span style="margin-left:850px;color: white;"> 当前用户：{{username}}<i></i></span>
      <el-dropdown-menu slot="dropdown"  style="height: 15px;" >
        <el-dropdown-item command="logout"  >退出</el-dropdown-item>
        <el-dropdown-item command="edit" >修改密码</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      <div>
      <el-dialog title="账户信息" split-button="true" :visible.sync="dialogFormVisible" style="width: 900px;margin-left:500px;height: 700px" center>
        <el-form :model="form" ref="form" :rules="rules" >
          <el-form-item label="姓名" prop="name"  :label-width="formLabelWidth">
            <el-input v-model="name"  :disabled="true"  autocomplete="off" style="height: 10px"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username"  :label-width="formLabelWidth">
            <el-input v-model="username"  :disabled="true"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"  :label-width="formLabelWidth">
            <el-input v-model="form.password" type="password" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="height: 100px">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit(form)">确 定</el-button>
        </div>
      </el-dialog>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);margin-top: 50px">
        <el-menu  @open="handleOpen" @close="handleClose" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>运单管理</template>
              <el-menu-item index="1-1">运单受理</el-menu-item>
              <el-menu-item index="1-2">异常记录</el-menu-item>
              <el-menu-item index="1-3">异常处理</el-menu-item>
            <el-submenu index="1-4" >
              <template slot="title">客户管理</template>
              <el-menu-item index="1-4-1">发货人管理</el-menu-item>
              <el-menu-item index="1-4-2">收货人管理</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>核实开单</template>
              <el-menu-item index="2-1">运单记录</el-menu-item>
              <el-menu-item index="2-2">托运开单</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>车辆调度</template>
            <el-menu-item index="3-1">车辆管理</el-menu-item>
            <el-menu-item index="3-2">车辆调度</el-menu-item>
            <el-menu-item index="3-3">故障记录</el-menu-item>
            <el-menu-item index="3-4">故障处理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>发车管理</template>
            <el-menu-item index="4-1">发车记录</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>在途监控</template>
            <el-menu-item index="5-1">车辆定位</el-menu-item>
            <el-menu-item index="5-2">故障报告</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>到货管理</template>
            <el-menu-item index="6-1">异常统计</el-menu-item>
            <el-menu-item index="6-2">签收记录</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
          <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
          <el-menu-item v-if="menu.indexOf('/employeeManage')!=-1" index="employeeManage">员工信息</el-menu-item>
          <el-menu-item index="7-2">系统开户</el-menu-item>
          <el-menu-item index="7-3">权限管理</el-menu-item>
        </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-menu"></i>审批管理</template>
            <el-menu-item index="8-1">申请审批</el-menu-item>
            <el-menu-item index="8-2">通知公告</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--<el-container>-->
        <!--<el-header style="background-color: white">-->
          <!--<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">-->
            <!--<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">-->

            <!--</el-tab-pane>-->
          <!--</el-tabs>-->
        <!--</el-header>-->
        <el-main>
      <router-view>

      </router-view>
        </el-main>

    </el-container>
  </el-container>
  </div>
</template>
<style>
  .el-header {
    background-color: #545c64;
    color: #fff;
    line-height: 80px;
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  import Fetch from "../../fetch";
  import Module from "../../module/prototype"

  export default {
    data() {
      return {
        menu:'',
        name:'',
        username:'',
        dialogFormVisible:false,
        formLabelWidth:'80px',
        form:{
          username:'',
          // name:'',
          password:''
        },
        rules:{
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.menu = sessionStorage.getItem('allMenu');
      this.username = sessionStorage.getItem('userName');
      this.name = sessionStorage.getItem('name');
    },
    methods: {
      edit: function (params) {
        this.$refs['form'].validate(valid => {
          if (valid) {
        this.$confirm('确定修改账户密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '放弃修改',
          type: 'warning'
        }).then(() => {
              let params = Module.deepClone(this.form)
              params.username = sessionStorage.getItem('userName');
              Fetch.edit(params).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: '修改成功',
                    message: "修改成功",
                    type: "success"
                  })
                } else {
                  this.$notify({
                    title: '修改失败',
                    type: "error"
                  })
                }
              })
            }).catch(() => {
          this.$notify({
            type: 'info',
            title: '已取消修改'
          })
        })
          }
          this.dialogFormVisible=false;
        })
      },
      handleCommand ( command) {
        if(command=='logout'){
          sessionStorage.removeItem('allMenu');
          this.$router.push('/login')
        }
        else if(command=='edit'){
          this.dialogFormVisible = true;
          for(let item in this.form){
            this.form[item] = ''
          }
        }

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
