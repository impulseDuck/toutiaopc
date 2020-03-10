<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form label-width="80px" :model="FormData" :rules="rules" ref="myForm">
          <el-form-item label="用户名" prop="name">
              <el-input style="width:30%" v-model="FormData.name"></el-input>
          </el-form-item>
          <el-form-item label="简介" >
              <el-input style="width:30%" v-model="FormData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input style="width:30%" v-model="FormData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input disabled style="width:30%"  v-model="FormData.mobile"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
      </el-form>
      <el-upload action="" :show-file-list="false" :http-request="uploadImge">
         <img :src="FormData.photo ? FormData.photo : defaultImg" alt="" class="header-img">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: '../../assets/img/b1.jpg',
      FormData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }, {
          max: 7, min: 1, message: '用户名长度为1-7', trigger: 'blur'
        }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 保存
    save () {
      this.$refs.myForm.validate().then(() => {
        //  如果校验成功 会进入到then
        // 调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 类型
          data: this.FormData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    },
    // 上传图片
    uploadImge (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.FormData.photo = result.data.photo
      })
    },
    // 获取用户信息
    getInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.FormData = result.data
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style>
.header-img{
  position: absolute;
    right:300px;
    top: 150px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
</style>
