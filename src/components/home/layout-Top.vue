<template>
  <el-row align="middle" type='flex' class='layout-header'>
      <el-col class='left' :span="12">
         <i :class="{'el-icon-s-fold' : !collapse ,'el-icon-s-unfold':collapse}" @click="collapse=!collapse"></i>
        <span>人间不值得</span>
    </el-col>
<!-- 右侧 -->
       <el-col class='right' :span="12">
          <el-row type='flex' align="middle" justify="end">
            <img :src="userInfo.photo" alt="" class="img">
            <el-dropdown trigger="click" @command="clickMenu">
            <span style="font-size:20px">{{userInfo.name}}</span>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="baidu">百度</el-dropdown-item>
                <el-dropdown-item command="quiet">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-row>
    </el-col>
</el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  data () {
    return {
      userInfo: {},
      collapse: false
    }
  },
  watch: {
    collapse () {
      eventBus.$emit('changeCollapse')// 触发一个改变折叠状态
    }
  },
  methods: {
    // 点击菜单
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'baidu') {
        window.location.href = 'https://www.baidu.com/'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      this.$axios({
        url: 'user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUser', () => {
      this.getUserInfo()
    })
  }

}
</script>

<style lang='less' scoped>
 .layout-header {
  height: 60px;
  .left {
          i {
              font-size:20px;
          }
      }
      .right {
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 4px;
          }
      }
  }

</style>
