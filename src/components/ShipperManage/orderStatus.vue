<template>
  <div style="margin-left: 20px;margin-top: 20px; background-color:#E4E7ED" >
    <div style="margin-bottom: 15px;margin-top: 20px">
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-row :gutter="50">
          <el-col :sm="5" :offset="4">
            <el-form-item  prop="param">
              <el-input  v-model="searchForm.userId" autocomplete="off" placeholder="请输入要查找的用户ID" style="width: 250px" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-button  type="primary" icon="el-icon-search"  @click="searchByName">查询</el-button>
        </el-row>
      </el-form>
    </div>
    <div style="margin-left: 20px;padding-top: 15px">
      <el-table :data="tableData" size="mini" border stripe style="width: 95%">
        <el-table-column  type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column property="userId" label="用户ID" width="150">
        </el-table-column>
        <el-table-column property="placeId" label="地点ID" width="150">
        </el-table-column>
        <el-table-column property="count" label="次数" width="150">
        </el-table-column>
        <el-table-column property="longitude" label="经度" width="200">
        </el-table-column>
        <el-table-column property="latitude" label="纬度" width="200">
        </el-table-column>
        <el-table-column property="city" label="所属城市" width="100">
        </el-table-column>
        <el-table-column property="roughFamily" label="粗类别" width="150">
        </el-table-column>
        <el-table-column property="thinFamily" label="细类别" width="150">
        </el-table-column>
        <el-table-column  label="操作"  fixed="right" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteByPeople(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination   background style="float:right" :current-page="inform.currentPage" @current-change="clickPage"
                       :total="totalSize"  :page-size="8" layout="total, prev, pager, next,jumper">
      </el-pagination>
    </div>

     </div>
</template>

<script>
  import Fetch from "../../fetch";
  import Module from "../../module/prototype"
    export default {
        name: "orderStatus",
      data(){
          return{
            dialogFormVisible: false,
            name:'',
            active:'',
            description:'',
            tableData:[],
            totalSize:'',
            inform:{
              currentPage:1,
              rows:10
            },
            searchForm:{
              userId:'',
              currentPage:1,
              rows:10
            },
            orderNo:[]
          }
      },
      created(){
        this.name = sessionStorage.getItem('name')
      },
      mounted() {
        this.search()
      },
      methods:{
        search(){
            let params={currentPage: this.inform.currentPage,rows:this.inform.rows}
            Fetch.getByPeople(params).then(res=>{
              if(res.code==0){
                this.tableData=res.content.faultRecordList
                this.totalSize=res.content.totalSize
              }
            })
          },
        clickPage(page) {
          this.inform.currentPage = page
          this.search()
        },
        deleteByPeople(row) {
          this.$confirm('请仔细检查并确认是否删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params={id:row.id,userId:row.userId,placeId:row.placeId,count:row.count}
            Fetch.deleteByPeople(params).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: '删除成功',
                  message: "删除成功",
                  type: "success"
                });
                this.search()
              } else {
                this.$notify({
                  title: '删除失败',
                  message: res.msg,
                  type: "error"
                });
              }
            }).catch(err => {
              this.$notify({
                title: '删除失败',
                message: "网络不给力",
                type: "error"
              });
            })
          }).catch(error => {

          })
        },
        searchByName(searchForm) {
          if (this.searchForm.userId == "") {
            this.search()
          }
          else {
            Fetch.selectByPeople(this.searchForm).then(res => {
              if (res.code == 0) {
                this.tableData=res.content.faultRecordList
                this.totalSize=res.content.totalSize
              } else {
                this.$notify({
                  title: res.msg,
                  type: "error"
                })
              }
            })
          }
        },
      }
    }
</script>

<style scoped>

</style>
