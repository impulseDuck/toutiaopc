<template>
<el-card>
    <bread-crumb slot="header">
<template slot="title">素材管理</template>
</bread-crumb>
<el-row type="flex" justify="end">
    <el-upload action="" :show-file-list="false" :http-request="uploadImg">
         <el-button type="primary" round="">上传素材</el-button>
    </el-upload>

</el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab" class="tabs">
    <el-tab-pane label="全部素材" name="all">
    <div class="img-list">
         <el-card class="card" v-for="(item,index) in list" :key='item.id'>
            <img :src="item.url" alt="" @click="clickImg(index)">
            <el-row class="div" type="flex" align="middle" justify="space-around">
                <i class="el-icon-star-on" @click="collectOrCancel(item)" :style="{color:item.is_collected ? 'red' : 'black'}"></i>
                <i class="el-icon-delete-solid" @click="del(item)"></i>
            </el-row>
        </el-card>
    </div>
    </el-tab-pane>
    <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
            <el-card class="card" v-for="(item, index) in list" :key='item.id'>
            <img :src="item.url" alt="" @click="clickImg(index)">
        </el-card>
    </div>
    </el-tab-pane>
</el-tabs>
<!-- 分页 -->
<el-row type='flex' justify="center" style='height:80px' align="middle">
    <el-pagination background layout="prev,pager,next"
    :total="page.total"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    @current-change="changePage">
</el-pagination>
</el-row>
<!-- 预览时候弹出对话框  走马灯-->
  <el-dialog :visible="dialogTableVisible" @opened="openEnd" @close="dialogTableVisible=false">
    <el-carousel indicator-position="outside" height="400px" ref="myCarousel">
      <el-carousel-item v-for="item in list" :key="item.id">
          <img :src="item.url" alt="" style="width:100%;height:100%">
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 10,
        currentPage: 1,
        pageSize: 4
      },
      dialogTableVisible: false,
      clickIndex: -1
    }
  },
  methods: {
    // 当点击图片时弹出对应的预览图片
    clickImg (index) {
      this.clickIndex = index // 给索引赋值
      this.dialogTableVisible = true // 将对话框打开
    },
    // 弹出对话框对应的index
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },

    // 点击删除的时候
    del (row) {
      this.$confirm('您确定删除吗？', '提示').then(() => {
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 当点击收藏或者取消的时候
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 收藏与否
        }
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('收藏/取消失败')
      })
    },

    //   当点击上传素材的时候
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    //   在list中获取图片
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 请求参数
          per_page: this.page.pageSize,
          page: this.page.currentPage
        },
        data: {}
      }).then(result => {
      // 将返回的数据，放在data中
        this.list = result.data.results
        this.total = result.data.total_count
      })
    },
    changeTab () {
      this.getMaterial()
    },
    // 在页码切换时执行
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}

</script>

<style lang="less" scoped>
.img-list{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
.card{
    position: relative;
    width: 240px;
    height: 400px;
    margin: 20px 40px;
img{
    position: absolute;
    width: 80%;
    height: 300px;
}
.div{
    position: absolute;
     left:0;
    bottom:0;
    width: 100%;
    background: #f4f5f6;
    height: 30px;
    i{
        font-size: 20px;
    }
}
}
}

</style>
