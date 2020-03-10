<template>
  <el-tabs class="select-image" v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="selct-image-list">
        <el-card v-for="item in list" :key="item.id" class="card">
          <img :src="item.url" alt="" class="img" @click="clickImg(item.url)">
        </el-card>
      </div>
       <el-row class="page">
      <el-pagination background layout="prev,pager,next"
      :total="page.total"
      :current-page='page.currentPage'
      :page-size="page.pageSize"
      @current-change="changePage">
      </el-pagination>
    </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
      <el-upload action class="el-upload" :http-request="uploadImge">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      },
      activeName: 'material',
      list: []
    }
  },
  methods: {
    // 当点击图片的时候，换图片
    clickImg (url) {
      this.$emit('selectOneImg', url)// 将url参数传出去
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 获取全部素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize // 每页显示的条数
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 一共多少页
      })
    },
    // 上传
    uploadImge (parmars) {
      const data = new FormData()
      data.append('image', parmars.file)
      this.$axios({
        url: '/user/images',
        data,
        method: 'post'
      })
        .then(result => {
          this.$message.success('上传成功')
        })
        .catch(() => {
          this.$message.error('上传素材失败')
        })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.select-image {
  .selct-image-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .card{
      width: 150px;
      height: 150px;
      margin: 20px 0;
        .img{
          width: 100%;
          height: 100%;
              }
    }
  }
  .el-upload {
    display: flex;
    justify-content: center;
    i {
      font-size: 50px;
      padding: 50px;
      border: 2px dashed #ccc;
    }
  }
  .page{
    display: flex;
    justify-content: center;
    height: 80px;
  }
}
</style>
