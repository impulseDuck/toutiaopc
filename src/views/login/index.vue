<template>
<div class="login">
<el-card class="box-card" style="background-color:rgba(0,0,0,0.5)">
<div class="title">
    <img src="@/assets/img/logo1.png" alt="" >
    <!-- <span style="font-size:25px;font-weight:700;">渲染</span> -->
</div>
<el-form style="margin-top:20px" ref="loginForm" :model="loginForm" :rules='loginRules'>
<el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
</el-form-item>
<el-form-item  prop="code">
        <el-input style="width:60%" placeholder="请输入验证码"  v-model="loginForm.code"></el-input>
        <el-button style="float:right" plain>发送验证码</el-button>
</el-form-item>
<el-form-item prop="checked">
    <el-checkbox class="item" v-model="loginForm.checked">
        我已阅读和同意<span style="color:red;font-weight:700">用户协议</span>和<span style="color:red;font-weight:700">隐私条款</span>
        </el-checkbox>
</el-form-item>
<el-form-item>
        <el-button @click="login" style="width:100%;" type="primary">登录</el-button>
</el-form-item>
</el-form>
</el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确，请重新输入'
        }],
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}/,
          message: '验证码不正确，请重新输入'
        }],
        checked: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('请您同意以下条款'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      //     回调函数校验
      //       this.$refs.loginForm.validate(function (ok) {
      //         if (ok) {
      //           console.log('校验成功')
      //         } else {
      //           console.log('校验失败')
      //         }
      //       })
      //     promise校验
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事 -> 应该调用登录接口 看看手机号是否正常
        //   this.$axios.get/post/delete/put
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then((result) => {
          window.localStorage.setItem('user-token', result.data.token)
          this.$router.push('/home')
        }).catch(() => {
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang="less">
.login{
// width: 100vh;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
 &:before {
     content: '123';
     width: 100%;
     height: 100%;
     position: absolute;
     background-image: url('../../assets/img/bgc2.jpg');
     filter: blur(5px);
      background-size: cover;

  }

}
.box-card{
width: 440px;
height: 340px;
background: url('../../assets/img/2.png');
z-index: 1
}
.title {
    text-align: center;
    img{
    height: 50px;
}
}
</style>
