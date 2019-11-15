<template>
  <div style="margin-left: 20px;margin-top: 20px; background-color:#E4E7ED" >
    <div style="margin-left: 20px;padding-top: 15px">
      <single ref="single" :ModuleData="ModuleData" >
      </single>
    </div>
  </div>
</template>

<script>
 import single from "../Single/index.vue"
export default {
       name: "user",
    data(){
      return{
        ModuleData:{
          ModuleName:'user',
          tableHeader:[
          {num:"roughFamily",name:"粗类别"},
          {num:"thinFamily",name:"细类别"},
          {num:"userId",name:"用户ID"},
          {num:"placeId",name:"地点ID"},
          {num:"city",name:"所属城市"},
          {num:"count",name:"次数"}
        ],
        search:{
        },
        query:[
          {label:"次数",name:"num",type:"input",cvalue:''},
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
         form:[
          {num:"roughFamily",name:"粗类别",type:"select",cvalue:''},
          {num:"thinFamily",name:"细类别",type:"select",cvalue:''},
          {num:"userId",name:"用户ID",type:"input",cvalue:''},
          {num:"placeId",name:"地点ID",type:"input",cvalue:''},
          {num:"city",name:"所属城市",type:"select",cvalue:''},
          {num:"count",name:"次数",type:"input",cvalue:''}
        ],
        },
        type: [{
          value: '粗类别',
          label: '粗类别'
        }, {
          value: '细类别',
          label: '细类别'
        }],
      }
    },
}
</script>
