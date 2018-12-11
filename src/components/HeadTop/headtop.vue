<template>
  <div style="margin-top: 1px">
  <el-container style="height: 800px; border: 1px solid #eee;">
    <el-header style="text-align: left;   height: 80px;">
      <span style="font-size: 40px ">整车运输管理系统</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu  @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>运单管理</template>
              <el-menu-item index="1-1">运单受理</el-menu-item>
              <el-menu-item index="1-2">异常记录</el-menu-item>
              <el-menu-item index="1-3">异常处理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>核实开单</template>
              <el-menu-item index="2-1">运单记录</el-menu-item>
              <el-menu-item index="2-2">托运开单</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>车辆调度</template>
            <el-menu-item index="3-1">车辆管理</el-menu-item>
            <el-menu-item index="3-2">车辆调度</el-menu-item>
            <el-menu-item index="3-3">故障记录</el-menu-item>
            <el-menu-item index="3-4">故障处理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>发车管理</template>
            <el-menu-item index="4-1">发车记录</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>在途监控</template>
            <el-menu-item index="5-1">车辆定位</el-menu-item>
            <el-menu-item index="5-2">故障报告</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>到货管理</template>
            <el-menu-item index="6-1">异常统计</el-menu-item>
            <el-menu-item index="6-2">签收记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<style>
  .el-header {
    background-color: #545c64;
    color: #fff;
    line-height: 80px;


  }
  .el-aside {
    color: #333;
  }
</style>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
