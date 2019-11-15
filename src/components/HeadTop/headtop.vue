<template>
  <div style="margin-top: 1px">
  <el-container style="height: 900px;width:95%, border: 1px solid #eee;">
    <el-header style="text-align: left;   height: 80px;width:100%">
      <span style="font-size: 40px ">地点推荐系统</span>
      <el-dropdown placement="top-end" style="height:40px;float:right" @command="handleCommand">
      <span style="color: white;margin-right:10%"> 当前用户：{{username}}<i></i></span>
      <el-dropdown-menu slot="dropdown"  style="height:80px;" >
        <el-dropdown-item command="logout"  >退出</el-dropdown-item>
        <el-dropdown-item command="edit" >修改密码</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      <div>
      <el-dialog title="账户信息" split-button="true" :visible.sync="dialogFormVisible" style="width: 900px;margin-left:500px;height: 700px" center>
        <el-form :model="form" ref="form" :rules="rules" >
          <el-form-item label="用户名" prop="username"  :label-width="formLabelWidth">
            <el-input v-model="username"  :disabled="true"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"  :label-width="formLabelWidth">
            <el-input v-model="form.password" type="password" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="height: 100px">
          <el-button type="primary" @click="edit(form)">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </el-header>
    <el-container>
      <el-aside width="170px" style="background-color: rgb(238, 241, 246);margin-top: 10px">
        <el-menu  @open="handleOpen" @close="handleClose" router >
          <el-menu-item   index="notice"><i class="el-icon-menu"></i> 系统首页 </el-menu-item>
          <el-menu-item   index="orderStatus"><i class="el-icon-menu"></i>根据用户查询</el-menu-item>
          <el-menu-item   index="orderRate"><i class="el-icon-menu"></i>根据地点查询</el-menu-item>
          <el-menu-item   index="byClass"><i class="el-icon-menu"></i>根据类别查询</el-menu-item>
          <el-menu-item   index="TransitPosition"><i class="el-icon-menu"></i>位置信息查看</el-menu-item>
        </el-menu>
      </el-aside>
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
        username:'',
        dialogFormVisible:false,
        formLabelWidth:'80px',
        form:{
          username:'',
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
      this.username = sessionStorage.getItem('userName');
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
