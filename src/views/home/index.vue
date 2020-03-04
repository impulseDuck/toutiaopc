<template>
<el-container>
    <el-aside style="width:230px;background:#2e2f32" >
    <layout-Left></layout-Left>
    </el-aside>
   <el-container>
      <el-header>
           <layout-Top></layout-Top>
      </el-header>
    <el-main style="padding: 0">
            <router-view></router-view>
    </el-main>
   </el-container>
</el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
