<template>
  <el-card class="content">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
      <el-form class="status">
        <el-form-item label="文章状态">
            <el-radio-group v-model="searchFrom.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item label="频道类型">
        <el-select placeholder="请选择频道" v-model="searchFrom.channel_id">
            <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker type="daterange" v-model="searchFrom.dateRange"
        start-placeholder="开始日期"  end-placeholder="结束日期"
        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="total">
        <p>共找到{{page.total}}条符合条件的内容</p>
    </el-row>
    <div class="content-item" v-for="item in list" :key="item.id.toString()">
      <div class="content-left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
            <span>{{item.pubdate}}</span>
          </div>
      </div>
      <div class="content-right">
        <span @click="delItem(item.id.toString())"><i class="el-icon-delete"></i>删除</span>
        <span @click="$router.push(`/home/publish/${item.id.toString()}`)">
          <i class="el-icon-edit"></i>修改</span>
      </div>
    </div>
   <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination background layout="prev,pager,next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage"></el-pagination>
   </el-row>
  </el-card>
</template>

<script>
import { getChannel } from '@/api/channels.js'
import { getContent } from '@/api/content'

export default {
  data () {
    return {
      // page
      page: {
        total: 10,
        pageSize: 10,
        currentPage: 1
      },
      // 定义表单数据对象
      searchFrom: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channel: [],
      list: [],
      defaultImg: require('../../assets/img/head.jpg')
    }
  },
  watch: {
    searchFrom: {
      deep: true,
      handler () {
        this.page.currentPage = 1
        this.changeCondation()
      }
    }
  },
  filters: {
    // 判断文章的状态
    filterStatus (value) {
      // success info waring danger 默认蓝色的5种状态
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
      }
    },
    // 判断状态
    filterType (value) {
      // success info waring danger 默认蓝色的5种状态
      switch (value) {
        case 0:
          return 'waring'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },

  methods: {
    // 删除
    delItem (id) {
      this.$confirm('你确定要删除吗？', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id}`
        }).then(() => {
          this.changeCondation()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 页面切换
    changePage (newPage) {
      this.page.currentPage = newPage// 最新页码
      this.changeCondation()// 直接调用改变事件的方法
    },
    // 改变条件
    changeCondation () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        // 文章状态
        status: this.searchFrom.status === 5 ? null : this.searchFrom.status,
        channel_id: this.searchFrom.channel_id,
        begin_pubdate: this.searchFrom.dateRange && this.searchFrom.dateRange.length ? this.searchFrom.dateRange[0] : null,
        end_pubdate: this.searchFrom.dateRange && this.searchFrom.dateRange.length > 1 ? this.searchFrom.dateRange[1] : null
      }
      // 通过接口传入
      this.getContent(params) // 直接调用获取的方法
    },

    // 获取文章频道
    async  getChannel () {
      const result = await getChannel()
      this.channel = result.data.channels
    },
    // 获取文章列表
    async getContent (params) {
      const result = await getContent(params)
      this.list = result.data.results
      // 将总数赋值给文章列表
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getChannel()
    this.getContent()
  }
}
</script>

<style lang="less" scoped>
.content{
.status{
  margin-left: 40px;
}
.total{
  border-bottom: 1px dashed #ccc;
}
.content-item{
  display: flex;
  justify-content:space-between;
  padding: 20px;
  border-bottom: 1px dashed #ccc;
  .content-left{
    display: flex;
    img{
      height: 180px;
      width: 210px;
      padding-right: 20px;
    }
    .info{
      height: 180px;
      display: flex;
     flex-direction: column;
     justify-content: space-around;
     .tag{
       width: 60px;
       text-align: center;
     }
    }
  }
  .content-right{
   span{
     font-size: 15px;
     margin: 10px;
     i{
       margin: 10px;
     }
   }
  }
}
}
</style>
