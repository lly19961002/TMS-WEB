<template>
  <div style="margin-left: 20px;margin-top: 20px; background-color:#E4E7ED" >
    <div style="margin-left: 20px;padding-top: 15px">
      <singleform ref="singleform" :ModuleData="ModuleData" >
      </singleform>
    </div>

  </div>
</template>

<script>
  import Fetch from "../../fetch";
  import Module from "../../module/prototype"
  import singleform from "../SingleForm/index.vue"
  export default {
    name: "orderStatus",
    data(){
      return{
        ModuleData:{
          ModuleName:'infoclass',
          tableHeader:[
          {num:"roughFamily",name:"粗类别"},
          {num:"thinFamily",name:"细类别"},
          {num:"userid",name:"用户ID"},
          {num:"placeid",name:"地点ID"},
          {num:"city",name:"所属城市"},
          {num:"count",name:"次数"}
        ],
        query:[
          {label:"次数",name:"count",type:"input",cvalue:''},
          {label:"类型",name:"kind",type:"select",cvalue:'',data:[{
          value: '粗类别',label: '粗类别'
          }]},
          {label:"时间",name:"time",type:"daterange",cvalue:''},
        ],
        buttons:[
          {label:"新增",type:"insert",icon:"el-icon-document-add"},
          {label:"修改",type:"update",icon:"el-icon-edit-outline"},
          {label:"删除",type:"delete",icon:"el-icon-document-delete"},
        ],
         insertmainform:[
          {num:"userid",name:"用户ID",type:"input",cvalue:''}
        ],
        insertchildrenform:[
          {num:"placeid",name:"地点ID",type:"input",cvalue:''},
          {num:"roughFamily",name:"粗类别",type:"select",cvalue:'',
          data:[{value: '餐饮',label: '餐饮'},
          {value: '休闲/娱乐/文化',label: '休闲/娱乐/文化'}]},
          {num:"thinFamily",name:"细类别",type:"select",cvalue:'',
          data:[{value: '火锅',label: '火锅'},
          {value: 'KTV',label: 'KTV'}]},
          {num:"city",name:"所属城市",type:"select",cvalue:'',
          data:[{value: 'beijing',label: '北京'},
          {value: 'shanghai',label: '上海'}]},
          {num:"count",name:"次数",type:"input",cvalue:''}
        ],
        updateform:[
          {num:"roughFamily",name:"粗类别",type:"select",cvalue:'',
          data:[{value: '餐饮',label: '餐饮'},
          {value: '休闲/娱乐/文化',label: '休闲/娱乐/文化'}]},
          {num:"thinFamily",name:"细类别",type:"select",cvalue:'',
          data:[{value: '火锅',label: '火锅'},
          {value: 'KTV',label: 'KTV'}]},
          {num:"userid",name:"用户ID",type:"input",cvalue:''},
          {num:"placeid",name:"地点ID",type:"input",cvalue:''},
          {num:"city",name:"所属城市",type:"select",cvalue:'',
          data:[{value: 'beijing',label: '北京'},
          {value: 'shanghai',label: '上海'}]},
          {num:"count",name:"次数",type:"input",cvalue:''},
          {num:"id",name:"id",type:"hide",cvalue:''}
        ],
        },
      
      }
    },
    components:{
    singleform
    },
    created(){
      this.name = sessionStorage.getItem('name')
    },
    mounted() {
    },
  }
</script>

<style scoped>

</style>
