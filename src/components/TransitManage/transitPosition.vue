<template>

    <!--<el-aside width="550px" style="background-color: #E9EEF3;margin-top: 50px">-->
      <!--<el-row>-->
        <!--<el-col :sm="16" >-->
          <!--<el-input v-model="searchForm.params" placeholder="请输入要查询的车牌号或发车单号" style="margin-bottom: 5px;width: 400px;margin-left: 15px" clearable></el-input>-->
        <!--</el-col>-->
        <!--<el-button  type="primary" icon="el-icon-search"  @click="searchByParams">查询</el-button>-->
      <!--</el-row>-->
      <!--<div style="margin-top: 30px;margin-left: 15px">-->
        <!--<el-table :data="tableData" ref="multipleTable" size="mini" border stripe style="width:97%">-->
          <!--<el-table-column  type="index" label="序号" width="70">-->
          <!--</el-table-column>-->
          <!--<el-table-column property="departNo" label="发车单号" width="120">-->
          <!--</el-table-column>-->
          <!--<el-table-column property="departTime" label="用车时间" width="110">-->
          <!--</el-table-column>-->
          <!--<el-table-column property="plateNum" label="车牌号" width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column property="status" label="状态" width="80">-->
          <!--</el-table-column>-->
<!--&lt;!&ndash;          <el-table-column  label="操作"  fixed="right" width="70">&ndash;&gt;-->
<!--&lt;!&ndash;            <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-button type="text" @click="handle(scope.row)">处理</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-table-column>&ndash;&gt;-->
        <!--</el-table>-->
        <!--<el-pagination   background style="float:right" :current-page="inform.currentPage" @current-change="clickPage"-->
                         <!--:total="totalSize"  :page-size="8" layout="total, prev, pager, next,jumper">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</el-aside>-->

      <div id="map"  style="width:900px;height: 600px;margin-left: 50px;margin-top: 50px">

      </div>


</template>

<script>
  import Fetch from "../../fetch";
  import china from"../../../static/china.js"
  import  'echarts/lib/model/Global.js'

    export default {
      name: "transitPosition",
      data() {
        return {
          tableData: [],
          inform: {
            currentPage: 1,
            rows: 8
          },
          searchForm: {
            params: ""
          }
        }
      },
      created(){
        // var script = document.createElement("script");
        // script.src = "http://api.map.baidu.com/api?key=&v=1.1&services=true";
        // document.body.appendChild(script);
      },
      mounted() {
        // this.search()

        this.initEcharts()
        // this.initialize()

      },
      methods: {
        // searchByParams(){
        //   if(isNaN(this.searchForm.params)&&this.searchForm.params.startsWith('F')) {
        //     let params = {departNo: this.searchForm.params}
        //     Fetch.getByNo(params).then(res=>{
        //       if(res.code==0){
        //         this.tableData=res.content.departList
        //       }
        //     })
        //   }
        //   else if(isNaN(this.searchForm.params)){
        //     let params={plate:this.searchForm.params}
        //     Fetch.getByPlate(params).then(res=>{
        //       if(res.code==0){
        //         this.tableData=res.content.departList
        //       }
        //     })
        //   }
        //   else if(this.searchForm.params==null){
        //     this.search()
        //   }
        //   else{
        //     let params={departNo:this.searchForm.params}
        //     Fetch.getByNo(params).then(res=>{
        //       if(res.code==0){
        //         this.tableData=res.content.departList
        //       }
        //     })
        //   }
        // },
        // search() {
        //   Fetch.getDepartRecord(this.inform).then(res => {
        //     if (res.code == 0) {
        //       this.tableData = res.content.dataList
        //     } else {
        //       this.$notify({
        //         title: '获取失败',
        //         type: "error"
        //       })
        //     }
        //   })
        // },
        // initEcharts(){
        //
        //   var Map=this.$echarts.init(document.getElementById('map'))
        //   var data=[
        //     {name: '分店1', value: [121.15, 31.89, 90]},
        //     {name: '分店2', value: [109.781327, 39.608266, 120]},
        //     {name: '分店3', value: [120.38, 37.35, 142]},
        //     {name: '分店4', value: [122.207216, 29.985295, 123]},
        //     {name:'分店5',value:[110.245672,30.7787677,566]}
        //   ]
        //     var option={
        //     // 新建一个地理坐标系 geo ，
        //       bmap: {
        //         map: 'china',//地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
        //         itemStyle:{ // 定义样式
        //           normal:{       // 普通状态下的样式
        //             areaColor:'#6699CC',
        //             borderColor: '#fff',
        //           },
        //           emphasis: {         // 高亮状态下的样式
        //             areaColor: '#e9fbf1'
        //           }
        //       },
        //         center: [104.114129, 37.550339],
        //         zoom:1,
        //         scaleLimit:{min:1,max:50},
        //         roam:true,
        //       },
        //     // hover显示目标数据
        //     tooltip : {
        //       trigger: 'item',
        //       // tooltip的trigger的值可以有'item'、'axis'。
        //       //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        //       //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        //       textStyle:{
        //         align:'left'
        //       },
        //     },
        //     // 图表背景色
        //     backgroundColor: '#404a59',
        //     // 标志颜色
        //     color:'red',
        //     // 新建散点图series
        //     series:[{
        //       name:'',//series名称
        //       type:'scatter',//为散点类型
        //       coordinateSystem: 'bmap',// series坐标系类型
        //       data:data,
        //       symbol:'pin',
        //       symbolSize:[20,20]
        //     }],
        //
        //     // 添加视觉映射组件
        //     visualMap: {
        //       type: 'continuous', // 连续型
        //       min: 0,           // 值域最小值，必须参数
        //       max: 600,     // 值域最大值，必须参数
        //       calculable: true, // 是否启用值域漫游
        //       inRange: {
        //         color: ['red']
        //         // 指定数值从低到高时的颜色变化
        //       },
        //       textStyle: {
        //         color: '#fff' // 值域控件的文本颜色
        //       }
        //     }
        //   }
        // Map.setOption(option)
        //
        //   // if (!app.inNode) {
        //   //   // 添加百度地图插件
        //   //   var bmap = Map.getModel().getComponent('bmap').getBM;
        //   //   bmap.addControl(new BMap.MapTypeControl());
        //   // }
        // },
        initEcharts(){
          var startLong = 106.652024;
          var startLat = 26.617221;
          var endLong = 106.652024;
          var endLat = 26.614221;

          var startLongR = 106.652024;
          var startLatR = 26.617221;
          var endLongR = 106.652024;
          var endLatR = 26.614221;

          var linesPoints = null;
          // 百度地图API功能
          var map = new window.BMap.Map("map");    // 创建Map实例
          map.centerAndZoom(new window.BMap.Point(117.25,31.83), 10);//106.652024,26.617221  // 初始化地图,设置中心点坐标和地图级别
          map.addControl(new window.BMap.MapTypeControl());   //添加地图类型控件
          map.setCurrentCity("合肥");          // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          setInterval( this.$options.methods.goWay,500);
          startLong = endLong;
            startLat = endLat;
            endLong = this.$options.methods.getRound(endLong);
            endLat = this.$options.methods.getRound(endLat);
            // this.$options.methods.drawIcon(startLong,startLat,endLong,endLat);
            //drawRedLine();
          var carMk;
          var myIcon = new BMap.Icon("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2082781506,144700696&fm=26&gp=0.jpg", new window.BMap.Size(37,25), {imageOffset: new window.BMap.Size(0, 0)});//卡车
          carMk = new BMap.Marker(
            new BMap.Point(endLong, endLat),//起始点的经纬度
            {icon: myIcon});
          map.addOverlay(carMk);

          // this.$options.methods.drawGreenLine(startLong, startLat, endLong, endLat);
          // var polyline = new window.BMap.Polyline([
          //   new window.BMap.Point(startLong,startLat),//起始点的经纬度
          //   new window.BMap.Point(endLong,endLat)//终止点的经纬度
          // ], {strokeColor:"green",//设置颜色
          //   strokeWeight:3, //宽度
          //   strokeOpacity:1});//透明度
          // map.addOverlay(polyline);
        },

        getRound(temp){
            var i = Math.round(Math.random()*9+1);
            if(i%2==0){
              return temp + i*0.0001;
            }else{
              return temp - i*0.0001;
            }
          },
        getRound1(temp){
            var i = Math.round(Math.random()*9+1);
            if(i%2==0){
              return temp + i*0.0002;
            }else{
              return temp - i*0.0002;
            }
          },

        drawGreenLine(startLong,startLat,endLong,endLat){
            var polyline = new window.BMap.Polyline([
              new window.BMap.Point(startLong,startLat),//起始点的经纬度
              new window.BMap.Point(endLong,endLat)//终止点的经纬度
            ], {strokeColor:"green",//设置颜色
              strokeWeight:3, //宽度
              strokeOpacity:1});//透明度
            map.addOverlay(polyline);
          },

         drawRedLine(){
            startLongR = endLongR;
            startLatR = endLatR;
            endLongR = this.$options.methods.getRound1(endLongR);
            endLatR = this.$options.methods.getRound1(endLatR);
            var polyline1 = new BMap.Polyline([
              new BMap.Point(startLongR,startLatR),//起始点的经纬度
              new BMap.Point(endLongR,endLatR)//终止点的经纬度
            ], {strokeColor:"red",//设置颜色
              strokeWeight:3, //宽度
              strokeOpacity:1});//透明度
            map.addOverlay(polyline1);
          },

         drawIcon(startLong,startLat,endLong,endLat) {
           var carMk;
           var myIcon = new window.BMap.Icon("http://sandbox.runjs.cn/uploads/rs/101/wmbvrxnx/kache.png", new window.BMap.Size(37,25), {imageOffset: new window.BMap.Size(0, 0)});//卡车
           if (carMk) {

              map.removeOverlay(carMk);
            }
            carMk = new window.BMap.Marker(
              new window.BMap.Point(endLong, endLat),//起始点的经纬度
              {icon: myIcon});
            map.addOverlay(carMk);
           this.$options.methods.drawGreenLine(startLong, startLat, endLong, endLat);
          },

        initialize() {
          var mp = new BMap.Map('map');
          mp.centerAndZoom(new BMap.Point(111.742579, 40.818675), 5);
          console.log('百度地图脚本初始化成功...')
          resolve(BMap)
        },

        loadScript() {
          var script = document.createElement("script");
          script.src = "http://api.map.baidu.com/api?v=2.0&ak=f94PmGEs4nniOozbGk9wfZVQkmT7GRjUA&callback=initialize";
          document.body.appendChild(script);
        }
  }
    }

    </script>

