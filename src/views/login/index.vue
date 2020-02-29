<template>
<div class="login">
<el-card class="box-card">
<div class="title">
    <img src="@/assets/logo1.png" alt="" >
    <!-- <span style="font-size:25px;font-weight:700;">渲染</span> -->
</div>
<el-form style="margin-top:20px">
<el-form-item>
        <el-input placeholder="请输入手机号"></el-input>
</el-form-item>
<el-form-item>
        <el-input style="width:60%" placeholder="请输入验证码"></el-input>
        <el-button style="float:right" plain>发送验证码</el-button>
</el-form-item>
<el-form-item>
    <el-checkbox class="item">
        我已阅读和同意<span style="color:red;font-weight:700">用户协议</span>和<span style="color:red;font-weight:700">隐私条款</span>
        </el-checkbox>
</el-form-item>
<el-form-item>
        <el-button style="width:100%;" type="primary">登录</el-button>
</el-form-item>
</el-form>
</el-card>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.login{
// width: 100vh;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-size: cover;
background-image: url('../../assets/bgc2.jpg')
}
.box-card{
width: 440px;
height: 340px;
background: url('../../assets/login_bgc.jpg');
}
.title {
    text-align: center;
    img{
    height: 50px;
}
}
</style>
