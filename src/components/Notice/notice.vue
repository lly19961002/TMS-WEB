<template>
  <div :style="{backgroundImage:'url('+url+')'}" style="border: 5px solid #DCDFE6;background-size: 100% 100%;width: 100%;height: 700px">
    <div style="width:40%;height:80px; position:absolute;margin-left: 5px">
     <el-row style="padding-top: 25px;background-color:#F7F7F8 ;margin-top: 20px;margin-left: 30px;margin-right: 10px">
       <el-col :span="20" style="line-height: 50px;border:2px solid #EBEEF5;margin-left:10px">
         {{this.name}}  您好 现在是 {{new Date().toLocaleString()}}
       </el-col>
     </el-row>
    </div>
    <div style="width:40%;height:80px; position:absolute;margin-left: 40%">
      <el-calendar v-model="value">
      </el-calendar>
    </div>
  </div>
</template>

<script>
  import Fetch from "../../fetch";
  import Module from"../../module/prototype"
  export default {
    name: "notice",
    data(){
      return{
        value: new Date(),
        url:bj,
        dialogFormVisible:false,
        name:'',
        date: '',
        role:'',

      }
    },
    mounted() {
      this.search()
      this.getButton()
    },
    created(){
      this.name=sessionStorage.getItem('name')
    },
    methods:{
    }
  }
</script>

<style scoped>

</style>


