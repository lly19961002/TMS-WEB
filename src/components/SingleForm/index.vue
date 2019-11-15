
<template>
<div  class="singleform">
<div >
  <el-form  label-width="80px" style="width:100%">
      <el-form-item  v-for="item in ModuleData.query"  :prop="item.name" :label="item.label"  :label-width="formLabelWidth">
          <el-col :span="8" v-if="item.type==='select'">
            <el-select  v-model="item.cvalue"  style="width:150px;" size="mini" @change=change()>
                <el-option v-for="item in item.data" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-col>
             <el-col :span="10" v-else-if="item.type==='daterange'">
                <el-date-picker style="width:215px" v-model="item.cvalue" type="daterange"  size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :span="8" v-else>
            <el-input  v-model="item.cvalue" autocomplete="off"  size="mini" style="width: 150px" clearable></el-input>
            </el-col>
        </el-form-item>
         <el-form-item style="width:200px">
        <el-button  type="primary" icon="el-icon-search" size="mini" @click="search()">查询</el-button>
        </el-form-item>
  </el-form>
</div>
<div >
    <div class="button" style="clear:both;" >
    <el-button v-for="item in ModuleData.buttons" :icon="item.icon" type="primary" size="mini" plain style="float:left" @click="buttonClick(item)">{{item.label}}
    </el-button>
    </div>
<el-table :data="tableData" ref="multipleTable" height="500" size="mini" border stripe style="width: 95%;margin-top:35px" fit @selection-change="handleSelectionChange">
<el-table-column  type="selection" width="80" >
</el-table-column>
<el-table-column sortable v-for="item in ModuleData.tableHeader"  :key="item.num" :label="item.name"  :property="item.num" style="width:100px">
</el-table-column>

</el-table>
 <el-pagination   background style="float:right" :current-page="inform.currentPage"  @current-change="clickPage"
                       :total="totalSize"  :page-size="10" layout="total, prev, pager, next,jumper">
      </el-pagination>
</div>
<div>
    <el-dialog :visible.sync="dialogFormVisible2" style="width:1050px;margin-left:400px;max-height: 700px">
        <el-form ref="updateForm" style="min-height:100px;width:100%">
            <el-form-item v-if="item.type!='hide'" v-for="item in ModuleData.updateform"  :prop="item.name" :label="item.name"  :label-width="formLabelWidth">
          <el-col :span="8" v-if="item.type==='select'">
            <el-select  v-model="item.cvalue"  style="width:150px;" size="mini" @change=change()>
                <el-option v-for="item in item.data" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-col>
             <el-col :span="10" v-else-if="item.type==='daterange'">
                <el-date-picker style="width:215px" v-model="item.cvalue" type="daterange"  size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :span="8" v-else>
            <el-input  v-model="item.cvalue" autocomplete="off"  size="mini" style="width: 150px" clearable></el-input>
            </el-col>
        </el-form-item>
         <el-form-item style="width:200px;margin-left:130px">
         <el-row >
          <el-col :span="12">
          <el-button size="mini" type="primary" @click="updateForm()" class="marginTop" >确认
          </el-button>
          </el-col>
          <el-col :span="12">
          <el-button size="mini" type="primary" @click="cancle2" class="marginTop" >取消
          </el-button>
          </el-col>
        </el-row>
        </el-form-item>
        <div style="clear:both;height:0;font-size:1px;line-height:0px;"></div>
        </el-form>
    </el-dialog>
</div>
<el-drawer :visible.sync="dialogFormVisible" direction="ttb" title="新增" size="100%">
    <div>
        <el-form ref="insertmainForm" style="min-height:100px;width:100%">
            <el-form-item  v-for="item in ModuleData.insertmainform"  :prop="item.name" :label="item.name"  :label-width="formLabelWidth">
          <el-col :span="8" v-if="item.type==='select'">
            <el-select  v-model="item.cvalue"  style="width:150px;" size="mini" @change=change()>
                <el-option v-for="item in item.data" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-col>
             <el-col :span="10" v-else-if="item.type==='daterange'">
                <el-date-picker style="width:215px" v-model="item.cvalue" type="daterange"  size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :span="8" v-else>
            <el-input  v-model="item.cvalue" autocomplete="off"  size="mini" style="width: 150px" clearable></el-input>
            </el-col>
        </el-form-item>
        
        </el-form>
        <div>
            <el-tabs type="border-card">
                <el-tab-pane label="地点明细">
                    <div>
                    </div>
                </el-tab-pane>
                
            </el-tabs>
                  
        </div>
        </div>
</el-drawer>
<div >
</div>
</div>
</template>
<script>
import Fetch from "../../fetch";
import qs from 'qs';
export default {
    name: "Single",
    props:{
        ModuleData:Object
    },
 data(){
   return{
    dialogFormVisible: false,
    dialogFormVisible2: false,
    tableData:[], 
    columnWidth:'120px',
    formLabelWidth:'70px',
    totalSize:0,
    selectRow:[],
    inform:{
        currentPage:1,
        rows:10
    },
   }

    },
    created(){
       
    },
    mounted(){
        this.search()
    },
    methods:{
        search(){
            var view = {}
            for (const item of this.ModuleData.query) {
            view[item.name] = item.cvalue
            }
            var views=new FormData()
            var viewStr=JSON.stringify(view)
            views.append('view',viewStr)
            console.log(view)
            var jsonStr={'pageNo':this.inform.currentPage,'view':view}
            console.log(jsonStr)
            var param = new FormData()
            param.append('jsonStr',JSON.stringify(jsonStr))
            var url='/api/'+this.ModuleData.ModuleName+'/select/selectForPage'
            Fetch.requestPost(url,param).then(res=>{
            if(res.code==0){
                this.tableData=res.content.resultList
                this.totalSize=res.content.totalSize
            }
            })
        },
         clickPage(page) {
        this.inform.currentPage = page
        this.search()
      },
      handleSelectionChange(val){
        this.selectRow=val
      },
      cancle(){
        this.dialogFormVisible=false
        // this.ModuleData.form= {brand_right: 0}
      },
      cancle2(){
        this.dialogFormVisible2=false
      },
      buttonClick(item){
          if(item.type=="insert"){
              this.insert()
          }
          if(item.type=="update"){
              this.update()
          }
          if(item.type=="delete"){
              this.delete()
          }
      },
      insert(){
        this.dialogFormVisible=true
      },
      insertForm(){
          var jsonStr = {}
         for (const item of this.ModuleData.insertmainform) {
          jsonStr[item.num] = item.cvalue
        }
       let param = new FormData()
       jsonStr=JSON.stringify(jsonStr)
       param.append('jsonStr',jsonStr)
        // jsonStr = qs.stringify(params)
        console.log(jsonStr)
        var url='/api/'+this.ModuleData.ModuleName+'/insert/insert'
        Fetch.requestPost(url,param).then(res=>{
            if (res.code == 0) {
              this.$notify({
                title: '新增成功',
                message: "新增成功",
                type: "success"
              });
              this.search()
              this.cancle()
            } else {
              this.$notify({
                title: '新增失败',
                message: res.msg,
                type: "error"
              });
            }
          })
                
      },
      update(){
        var jsonStr = {}
        jsonStr.id = this.selectRow[0].id
       let param = new FormData()
       jsonStr=JSON.stringify(jsonStr)
       param.append('jsonStr',jsonStr)
        var url='/api/'+this.ModuleData.ModuleName+'/get/getObject'
        Fetch.requestPost(url,param).then(res=>{
            if(res.code==0){
                this.dialogFormVisible2=true
                for (const item of this.ModuleData.updateform) {
                    var name=item.num
                    item.cvalue=res.content.resultList[name]
                }
            }
          })
      },
       updateForm(){
          var jsonStr = {}
         for (const item of this.ModuleData.updateform) {
          jsonStr[item.num] = item.cvalue
        }
       let param = new FormData()
       jsonStr=JSON.stringify(jsonStr)
       param.append('jsonStr',jsonStr)
        var url='/api/'+this.ModuleData.ModuleName+'/update/update'
        Fetch.requestPost(url,param).then(res=>{
            if (res.code == 0) {
              this.$notify({
                title: '修改成功',
                message: "修改成功",
                type: "success"
              });
            
            } else {
              this.$notify({
                title: '修改失败',
                message: res.msg,
                type: "error"
              });
            }
          })
        this.search()
        this.cancle2()      
      },
      delete(){
         var jsonStr = {}
        jsonStr.id = this.selectRow[0].id
       let param = new FormData()
       jsonStr=JSON.stringify(jsonStr)
       param.append('jsonStr',jsonStr)
        var url='/api/'+this.ModuleData.ModuleName+'/delete/delete'
        Fetch.requestPost(url,param).then(res=>{
            if(res.code==0){
                         this.$notify({
                title: '删除成功',
                message: "删除成功",
                type: "success"
              });
            
            } else {
              this.$notify({
                title: '删除失败',
                message: res.msg,
                type: "error"
              });
            }
            })
            this.search()
      }
    }
  
       
    
}
</script>
<style>
.el-form-item__content {
      margin-left: 0px !important;
    }
.el-form-item{
    width: 230px;
   float: left;
}

</style>


