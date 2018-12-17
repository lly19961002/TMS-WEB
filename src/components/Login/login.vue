<template>
  <div class="login" >
    <el-form :model="form" ref="form" label-width="80px" style="text-align:center" >
      <el-row >
        <el-col :span="24">
          <h1 class="login-title">整车运输管理系统</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"  >
          <el-form-item label="用户名" >
            <el-input type="text" v-model.trim="form.username" @keyup.enter.native="login(form)" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"  >
          <el-form-item label="密码">
            <el-input type="password" @keyup.enter.native="login(form)" v-model.trim="form.password" placeholder="请输入密码" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="login(form)">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  import Fetch from "../../fetch"
  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },

    methods:{
      login (params) {
        Fetch.login(this.form).then(res=>{
          if(res == success) {
            console.log("success")
            this.$router.push('/headtop')
          }
        }).catch(err=>{
        alert("登录失败");
        })
        this.$router.push('/employeeManage')
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    border: 5px solid #1f4580;
    border-radius: 10px;
  }
  .login-title {
    font-size: 24px;
    padding: 5px 15px 10px;
    font-family: "Times New Roman",Georgia,Serif;
    text-align: center;
  }

</style>
