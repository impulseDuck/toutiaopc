<template>
<el-card v-loading="loading">
 <bread-crumb slot="header">
 <template slot="title">评论管理</template>
 </bread-crumb>
<el-table :data="list">
    <el-table-column prop="title" label="标题"></el-table-column>
    <!-- 给一个formatter可以用来显示布尔值 -->
    <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
    <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
    <el-table-column prop="fans_comment_count" label="粉丝数"></el-table-column>
    <el-table-column label="操作">
       <template slot-scope="obj">
           <el-button type="text">编辑</el-button>
            <el-button type="text" @click="openClose(obj.row)">{{obj.row.comment_status ? '关闭' : '显示'}}</el-button>
       </template>
    </el-table-column>
</el-table>
<el-row class="page" type="flex" justify="center">
  <el-pagination background layout="prev,pager,next"
:total="page.totalPage"
:current-page="page.currentPage"
:page-size="page.pageSize"
@current-change="changePage">
</el-pagination>
</el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 50
      },
      loading: false // 控制loading遮罩层的显示或者隐藏
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    async getComment () {
      this.loading = true // 打开遮罩层
      const result = await this.$axios({
        url: '/articles', // 地址
        params: {
          response_type: 'comment', // 数据类型
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      })
      // console.log(result)
      this.list = result.data.results // 将数据显示在页面
      this.page.totalPage = result.data.total_count
      this.loading = false // 关闭遮罩层
    },
    // 定义一个格式化的函数
    formatterBoolean (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    },
    async openClose (row) {
      const mess = row.comment_status ? '关闭' : '显示'
      await this.$confirm(`您是否确定${mess}评论`, '提示')
      try {
        await this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString() // 文章id
          },
          data: {
            allow_comment: !row.comment_status // 是打开还是关闭，此状态和文章评论正好相反
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          this.getComment() // 调用重新拉取数据的方法
        })
      } catch (error) {
        this.$message.error(`${mess}评论失败`)
      }
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
