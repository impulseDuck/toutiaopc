<template>
<div class="layout-Left">
   <div class="title">
        <img src="../../assets/img/logo1.png" alt="">
   </div>
  <el-menu background-color="#323745" text-color="#fff" router>
       <el-menu-item index='/home'>
       <i class="el-icon-s-home"></i>
       <span>首页</span>
   </el-menu-item>
  <el-submenu index='1'>
     <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
          </template>
        <el-menu-item index="/home/publish?">发布文章</el-menu-item>
         <el-menu-item index="/home/content">内容列表</el-menu-item>
         <el-menu-item index="/home/comment">评论文章</el-menu-item>
         <el-menu-item index="/home/material">素材管理</el-menu-item>
  </el-submenu>
<el-submenu index='2'>
     <template slot="title">
          <i class="el-icon-s-ticket"></i>
          <span>粉丝管理</span>
          </template>
          <el-menu-item index="/home/fansInfo">图文数据</el-menu-item>
         <el-menu-item index="/home/fans">粉丝概况</el-menu-item>
         <el-menu-item index="/home/fansImg">粉丝画像</el-menu-item>
         <el-menu-item index="/home/fansList">粉丝列表</el-menu-item>
  </el-submenu>
    <el-menu-item index='/home/account'>
       <i class="el-icon-s-custom"></i>
       <span>账户信息</span>
   </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-Left{
    width:230px;
    height: 100vh;
    background-color: #2e2f32;
    background-image: url('../../assets/img/3.png');
    .title{
        text-align: center;
        padding: 10px 0;
        img{
          height: 40px;
        }
    }
    .el-menu{
      border-right: none
    }
}
</style>
