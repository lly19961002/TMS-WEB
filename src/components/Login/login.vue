<!--suppress ALL -->
<template>
  <div class="index" >
  <div class="login" v-if="islogin">
    <el-form :model="form" ref="form" label-width="120px" style="text-align:center" :rules="rules" >
      <el-row >
        <el-col :span="24">
          <h1 class="login-title">地点推荐管理系统</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" class="marginTop"  >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model.trim="form.username"  placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" class="marginTop" >
          <el-form-item label="密码" prop="password">
            <el-input type="password" @keyup.enter.native="login(form)" v-model.trim="form.password" placeholder="请输入密码" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
        <el-button type="primary" @click="regitNew" class="marginTop" >注册
        </el-button>
        </el-col>
        <el-col :span="30">
          <el-button type="primary" @click="login(form)" class="marginTop" >登录</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="isregit" style="width:900px;margin-left:400px;">
      <el-form :model="regitform" ref="regitform" label-width="120px" style="text-align:center" :rules="regitrules" class="regit">
        <el-row >
          <el-col :span="24">
            <h1 class="login-title">用户注册</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" class="marginTop"  >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model.trim="regitform.username"  placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" class="marginTop" >
            <el-form-item label="密码" prop="password">
              <el-input type="password"  v-model.trim="regitform.password" placeholder="请输入密码" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="20" class="marginTop">
            <el-form-item label="确认密码" prop="passwordRepeat">
              <el-input type="password" @keyup.enter.native="regit(regitform)" v-model="regitform.passwordRepeat" placeholder="请确认密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
          <el-button type="primary" @click="regit(regitform)" class="marginTop" >确认
          </el-button>
          </el-col>
          <el-col :span="10">
          <el-button type="primary" @click="cancel" class="marginTop" >取消
          </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
  </div>
</template>

<script>
  import Fetch from "../../fetch"
import { error } from 'util';
  export default {
    name: 'login',
    data () {
      return {
        islogin:true,
        isregit:false,
        form: {
          username: '',
          password: ''
        },
         regitform: {
          username: '',
          password: '',
          passwordRepeat:''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
        regitrules:{
           username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          passwordRepeat:[
           {required: true, message: '请确认密码', trigger: 'blur'} 
          ]
        }
      }
    },
    methods: {
      regitNew(){
        this.isregit=true
      },
      cancel(){
        this.isregit=false
        this.regitform = {brand_right: 0}
        // this.regitform.username=''
        // this.regitform.password=''
        // this.regitform.passwordRepeat=''
      },
      login(params) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            // this.$router.push('/notice')
             var url='/api/user/login'
            Fetch.requestGet(url,this.form).then(res => {
              console.log(res)
              sessionStorage.setItem('userName',this.form.username);
              if (res.code == 0) {
                this.$router.push('/notice')
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
      regit(params){
        if(params.password!=params.passwordRepeat){
          this.$notify({
            title:"验证失败",
            type:"error",
            message:"两次输入的密码不一致，请重新输入"
          })
        }
        else{
            var url='/api/user/insert/insert'
           let param = new FormData()
          var jsonStr=JSON.stringify(params)
          param.append('jsonStr',jsonStr)
            Fetch.requestPost(url,param).then(res => {
              if (res.code == 0) {
                 this.$notify({
                  title: '注册成功请登录',
                  type: "success"
                })
                }
              else {
                this.$notify({
                  title: '注册失败',
                  type: "error"
                })
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
  .marginTop{
    margin-top: 20px
  } 
  .login {
    width: 350px;
    height: 380px;
    right:20px;
    position: absolute;
    margin-top: 150px;
    margin-right: 50px ;
    border: 5px solid #1f4580;
    border-radius: 10px;
    background-color:white;  
  }
  .login-title {
    font-size: 24px;
    padding: 5px 15px 10px;
    font-family: "Times New Roman",Georgia,Serif;
    text-align: center;
  }
  .index {
    background-image: url("../../image/bj.jpg");
    background-size: 100% 110%;
    width: 100%;
    height: 980px;
  }


</style>
