<template>
<el-breadcrumb separator=">">
    <!-- el-breadcrumb-item 相当于router-link标签 -->
    <el-breadcrumb-item to='/home'>首页</el-breadcrumb-item>
    <el-breadcrumb-item>
        <!-- 定义一个具名插槽 ，名字是动态的-->
        <slot name="title"></slot>
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
