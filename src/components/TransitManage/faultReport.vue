<template>
  <el-tabs type="border-card">
  <el-tab-pane label="异常报告">
    <div>
      <el-dialog title="在途异常报告" split-button="true" :visible.sync="dialogFormVisible" style="width: 1200px;margin-left:400px;height: 90%" center>
        <div style="margin-left: 50px">
          <el-form :inline="true" :model="form" size="mini" ref="form">
            <el-form-item label="运单号" prop="departNo" style="margin-top:20px">
              <el-input v-model="form.departNo" :readonly="true" required ></el-input>
            </el-form-item>
            <el-form-item label="发生地" prop="faultHappenPlace" style="margin-top:20px">
              <el-input v-model="form.faultHappenPlace" style="margin-left:10px;width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="发生时间" style="margin-top:20px">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="form.faultHappenTime" type="datetime" placeholder="选择日期时间" style="margin-left: 10px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异常原因" prop="cause" required style="margin-top:20px">
              <el-input v-model="form.cause" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" style="margin-left:20px;width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="备注  " prop="remark" style="margin-top:20px">
              <el-input v-model="form.remark" style="margin-left:40px;width: 300px" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="height: 100px;margin-top: 50px;margin-left: 150px">
            <el-button type="primary" @click="sure(form)">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  <div style="margin-top: 30px;margin-left: 50px">
    <el-table :data="tableData" ref="multipleTable" size="mini" border stripe style="width:85%">
      <el-table-column  type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column property="departNo" label="发车单号" width="120">
      </el-table-column>
      <el-table-column property="departTime" label="用车时间" width="120">
      </el-table-column>
      <el-table-column property="plateNum" label="车牌号" width="100">
      </el-table-column>
      <el-table-column property="status" label="运单状态" width="110">
      </el-table-column>
      <el-table-column property="originator" label="制单人" width="100">
      </el-table-column>
      <el-table-column property="createtime" label="制单时间" width="150">
      </el-table-column>
      <el-table-column  label="操作"   width="110">
        <template slot-scope="scope">
          <el-button type="text" @click="report(scope.row)" v-if="scope.row.status!=='在途故障'">异常报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination   background style="float:right" :current-page="inform.currentPage" @current-change="clickPage"
                     :total="totalSize"  :page-size="8" layout="total, prev, pager, next,jumper">
    </el-pagination>
  </div>
  </el-tab-pane>
  <el-tab-pane label="异常记录">
    <div>
      <el-dialog title="在途故障信息修改" split-button="true" :visible.sync="dialogFormVisible1" style="width: 1200px;margin-left:400px;height: 90%" center>
        <div style="margin-left: 50px">
          <el-form :inline="true" :model="form1" size="mini" ref="form1">
            <el-form-item label="发车单号" prop="departNo" style="margin-top:20px">
              <el-input v-model="form1.departNo" :readonly="true" required ></el-input>
            </el-form-item>
            <el-form-item label="发生地" prop="faultHappenPlace" style="margin-top:20px">
              <el-input v-model="form1.faultHappenPlace" style="margin-left:10px;width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="发生时间" style="margin-top:20px">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="form1.faultHappenTime" type="datetime" placeholder="选择日期时间" style="margin-left: 10px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异常原因" prop="fault" required style="margin-top:20px">
              <el-input v-model="form1.fault" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" style="margin-left:20px;width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="备注  " prop="remark" style="margin-top:20px">
              <el-input v-model="form1.remark" style="margin-left:40px;width: 300px" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="height: 100px;margin-top: 50px;margin-left: 150px">
            <el-button type="primary" @click="sure1(form1)">确 定</el-button>
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div style="margin-left: 20px;margin-top: 15px">
      <el-table :data="tableData1" ref="multipleTable" size="mini" border stripe style="width: 98%">
        <el-table-column  type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column property="contactNo" label="发车单号" width="150">
        </el-table-column>
        <el-table-column property="faultHappenTime" label="发生时间" width="150">
        </el-table-column>
        <el-table-column property="faultHappenPlace" label="发生地" width="250">
        </el-table-column>
        <el-table-column property="fault" label="故障描述" width="200">
        </el-table-column>
        <el-table-column property="faultStatus" label="状态" width="80">
        </el-table-column>
        <el-table-column property="originator" label="制单人" width="80">
        </el-table-column>
        <el-table-column property="createtime" label="创建时间" width="150">
        </el-table-column>
        <el-table-column property="remark" label="备注" width="100">
        </el-table-column>
        <el-table-column  label="操作"  fixed="right" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="update(scope.row)" v-if="scope.row.status='待处理'">修改</el-button>
            <el-button type="text" @click="deleteNotes(scope.row.id)" v-if="scope.row.status='待处理'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination   background style="float:right" :current-page="inform.currentPage" @current-change="clickPage"
                       :total="totalSize1"  :page-size="8" layout="total, prev, pager, next,jumper">
      </el-pagination>
    </div>
  </el-tab-pane>
  </el-tabs>
</template>

<script>
    import Fetch from "../../fetch";
    import Module from"../../module/prototype"

    export default {
        name: "faultReport",
      data() {
        return {
          name:'',
          dialogFormVisible:false,
          dialogFormVisible1:false,
          tableData: [],
          tableData1:[],
          inform: {
            currentPage: 1,
            rows: 8
          },
          form:{
            departNo:'',
            cause:'',
            remark:'',
            faultHappenPlace:'',
            faultHappenTime:''
          },
          form1:{
            departNo:'',
            fault:'',
            remark:'',
            faultHappenPlace:'',
            faultHappenTime:''
          },
        }
      },
      created(){
        this.name = sessionStorage.getItem('name')
      },
      mounted() {
        this.search()

      },
      methods: {
        search() {
          let params={currentPage:this.inform.currentPage,rows:this.inform.rows,name:this.name}
          Fetch.getOwnDepartRecord(params).then(res => {
            if (res.code == 0) {
              this.tableData = res.content.dataList
              for( var i=0;i<res.content.dataList.length;i++){
                var timestamp= new Date(res.content.dataList[i].createtime)
                this.tableData[i].createtime=timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
              }
            } else {
              this.$notify({
                title: '获取失败',
                type: "error"
              })
            }
          })
          Fetch.getOwnDepartFault(params).then(res => {
            if (res.code == 0) {
              this.tableData1 = res.content.dataList
              for( var i=0;i<res.content.dataList.length;i++){
                var timestamp= new Date(res.content.dataList[i].createtime)
                this.tableData1[i].createtime=timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
                var timestamp1= new Date(res.content.dataList[i].faultHappenTime)
                this.tableData1[i].faultHappenTime=timestamp1.toLocaleDateString().replace(/\//g, "-") + " " + timestamp1.toTimeString().substr(0, 8)
              }
            } else {
              this.$notify({
                title: '获取失败',
                type: "error"
              })
            }
          })
        },
        report(row){
          this.dialogFormVisible = true;
          this.form.departNo = Module.deepClone(row.departNo);
        },
        sure() {
          this.$refs['form'].validate(valid => {
            if (valid) {
              let params = {
                contactNo: this.form.departNo,
                faultHappenTime: this.form.faultHappenTime,
                faultHappenPlace: this.form.faultHappenPlace,
                typeOfFault: '在途故障',
                fault: this.form.cause,
                originator: this.name,
                faultStatus: '待处理',
                remark: this.form.remark,
                createtime: Module.dateFormat()
              }
              Fetch.addFault(params).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: '新增成功',
                    message: '异常提交成功',
                    type: "success"
                  })
                  this.dialogFormVisible=false
                } else {
                  this.$notify({
                    title: '提交失败',
                    type: "error"
                  })
                }
              })
              this.form = {brand_right: 0}
            }
          })
        },
        update(row){
          this.dialogFormVisible1 = true;
          this.form1 = Module.deepClone(row);
          this.form1.departNo = Module.deepClone(row.contactNo);
        },
        sure1() {
          this.$refs['form1'].validate(valid => {
            if (valid) {
              let params = Module.deepClone(this.form1);
              params.typeOfFault= '在途故障'
              params.originator= this.name
              params.faultStatus= '待处理'
              params.createtime= Module.dateFormat()
              Fetch.updateFault(params).then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: '修改成功',
                    message: '修改成功',
                    type: "success"
                  })
                  this.dialogFormVisible1=false
                  this.search()
                } else {
                  this.$notify({
                    title: '提交失败',
                    type: "error"
                  })
                }
              })
              this.form1 = {brand_right: 0}
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
