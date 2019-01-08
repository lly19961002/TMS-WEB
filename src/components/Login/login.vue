<!--suppress ALL -->
<template>
  <div class="login" >
    <el-form :model="form" ref="form" label-width="80px" style="text-align:center" :rules="rules" >
      <el-row >
        <el-col :span="24">
          <h1 class="login-title">整车营运管理系统</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"  >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model.trim="form.username" @keyup.enter.native="login(form)" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"  >
          <el-form-item label="密码" prop="password">
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
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      login(params) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            Fetch.login(this.form).then(res => {
              sessionStorage.setItem('userName',this.form.username);
              if (res.code == 0) {
                this.$router.push('/headtop')
                for (var i = 0; i < res.content.accessibleUrl.length; i++) {
                  var access_url = [];
                  access_url.push(res.content.accessibleUrl[i].url)
                }
                sessionStorage.setItem('allMenu', access_url)
                name=res.content.accessibleUrl[0].employee_name
                sessionStorage.setItem('name',name);
              }
              else {
                this.$notify({
                  title: '登录失败',
                  type: "error"
                })
              }
            })
          }
        })
      },
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
