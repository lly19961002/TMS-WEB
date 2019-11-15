<template>
  <div style="margin-left: 20px;margin-top: 20px; background-color:#E4E7ED" >
    <div style="margin-left: 20px;padding-top: 15px">
      <single ref="single" :ModuleData="ModuleData" >
      </single>
    </div>

  </div>
</template>

<script>
  import Fetch from "../../fetch";
  import Module from "../../module/prototype"
  import single from "../Single/index.vue"
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
         insertform:[
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
    single
    },
    created(){
      this.name = sessionStorage.getItem('name')
    },
    mounted() {
    },
    methods:{
      
      change(){
        this.searchForm.family=''
        if(this.searchForm.type=="粗类别"){
          this.family=[
            {
              value: '餐饮',
              label: '餐饮'
            }, {
              value: '交通/住宿',
              label: '交通/住宿'
            },{
              value: '休闲/娱乐/文化',
              label: '休闲/娱乐/文化'
            }, {
              value: '商店/生活服务',
              label: '商店/生活服务'
            },{
              value: '公共机构/办公/住宅',
              label: '公共机构/办公/住宅'
            }, {
              value: '景点/户外',
              label: '景点/户外'
            },{
              value: '学校/教育机构',
              label: '学校/教育机构'
            }, {
              value: '其他地点',
              label: '其他地点'
            },
          ]
        }
        else{
          this.family=[
            {
              value: '茶餐厅',
              label: '茶餐厅'
            }, {
              value: '咖啡馆',
              label: '咖啡馆'
            },{
              value: '公寓式酒店',
              label: '公寓式酒店'
            }, {
              value: '面包/甜品',
              label: '面包/甜品'
            },{
              value: '韩国料理',
              label: '韩国料理'
            }, {
              value: 'KTV',
              label: 'KTV'
            },{
              value: '桌游/棋牌',
              label: '桌游/棋牌'
            }, {
              value: '火锅',
              label: '火锅'
            },{
              value: '西餐',
              label: '西餐'
            }, {
              value: '东南亚菜',
              label: '东南亚菜'
            },{
              value: '海鲜',
              label: '海鲜'
            }, {
              value: '电动游乐',
              label: '电动游乐'
            },{
              value: '剧院',
              label: '剧院'
            }, {
              value: '小吃',
              label: '小吃'
            },{
              value: '美容/美体',
              label: '美容/美体'
            }, {
              value: '快餐',
              label: '快餐'
            },{
              value: '四川菜',
              label: '四川菜'
            }, {
              value: '江浙菜',
              label: '江浙菜'
            },{
              value: '自助餐',
              label: '自助餐'
            }, {
              value: '公寓/小区/里弄',
              label: '公寓/小区/里弄'
            },{
              value: '茶室',
              label: '茶室'
            }, {
              value: '新疆/清真',
              label: '新疆/清真'
            },{
              value: '饮料/冰品',
              label: '饮料/冰品'
            }, {
              value: '家具家居',
              label: '家具家居'
            },{
              value: '超市',
              label: '超市'
            }, {
              value: '日本料理',
              label: '日本料理'
            },{
              value: '综合商场',
              label: '综合商场'
            }, {
              value: '机场',
              label: '机场'
            },{
              value: '湖南菜',
              label: '湖南菜'
            }, {
              value: '时尚服饰',
              label: '时尚服饰'
            },{
              value: '素菜馆',
              label: '素菜馆'
            }, {
              value: '运动用品',
              label: '运动用品'
            },{
              value: '火车站',
              label: '火车站'
            }, {
              value: '各类市场',
              label: '各类市场'
            },{
              value: '玩具店',
              label: '玩具店'
            }, {
              value: '写字楼/办公室',
              label: '写字楼/办公室'
            },{
              value: '母婴用品/儿童玩具',
              label: '母婴用品/儿童玩具'
            }, {
              value: '体育场/馆',
              label: '体育场/馆'
            },{
              value: '广东菜',
              label: '广东菜'
            }, {
              value: '鞋包',
              label: '鞋包'
            },{
              value: '风景区',
              label: '风景区'
            }, {
              value: '广场/街区',
              label: '广场/街区'
            },{
              value: '面食',
              label: '面食'
            }, {
              value: '化妆品店',
              label: '化妆品店'
            },{
              value: '银行/信用社',
              label: '银行/信用社'
            }, {
              value: '新疆/清真',
              label: '新疆/清真'
            },{
              value: '地铁站/轻轨站',
              label: '地铁站/轻轨站'
            }, {
              value: '数码家电',
              label: '数码家电'
            },{
              value: '公共艺术区',
              label: '公共艺术区'
            }, {
              value: '珠宝饰品',
              label: '珠宝饰品'
            },{
              value: '港口/码头',
              label: '港口/码头'
            }, {
              value: '软件/音像',
              label: '软件/音像'
            },{
              value: '学校宿舍',
              label: '学校宿舍'
            }, {
              value: '海滩/河畔/湖畔',
              label: '海滩/河畔/湖畔'
            },{
              value: '公园',
              label: '公园'
            }, {
              value: '酒吧',
              label: '酒吧'
            },{
              value: '游乐场',
              label: '游乐场'
            }, {
              value: '度假村',
              label: '度假村'
            },{
              value: '台球馆',
              label: '台球馆'
            }, {
              value: '桥梁',
              label: '桥梁'
            },{
              value: '收费站',
              label: '收费站'
            }, {
              value: '加油站/服务区',
              label: '加油站/服务区'
            },{
              value: '书店',
              label: '书店'
            }, {
              value: '其他',
              label: '其他'
            },
          ]




        }
      }
    }
  }
</script>

<style scoped>

</style>
