<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form
      class="publish-item"
      ref="myForm"
      :model="publishFrom"
      :rules="publishRules"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入您的标题" v-model="publishFrom.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="publishFrom.content" style="height:300px" ></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
        <el-radio-group v-model="publishFrom.cover.type">
          <el-radio :label="1">单面</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择频道" v-model="publishFrom.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="publish(false)">发表</el-button>
      <el-button @click="publish(true)">存入草稿</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 发布表单数据
      publishFrom: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: [] // 封面图片
        },
        channel_id: null // 频道id
      },
      // 表单校验
      publishRules: {
        title: [
          { required: true, message: '标题不能为空' },
          {
            min: 5,
            max: 15,
            message: '标题为5-15字符',
            trigger: 'blur'
          }
        ],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [
          { required: true, message: '频道内容不能为空', trigger: 'blur' }
        ]
      },
      channels: [] // 接收频道数据
    }
  },
  methods: {
    //
    // 发布
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params// 解构id
        this.$axios({
          method: articleId ? 'put' : 'post',
          url: articleId ? `/articles/${articleId}` : '/articles', // 根据场景决定用什么地址
          params: {
            draft
          },
          data: this.publishFrom
        })
          .then(() => {
            this.$message.success('发布成功')
            this.$router.push('/home/content')
          })
          .catch(() => {
            this.$message.error('发布失败')
          })
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 将频道赋值给本地数据
      })
    },
    // 根据id获取文章详情
    getArticleByid (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.publishFrom = result.data // 将频道赋值给本地数据
      })
    }
  },

  created () {
    this.getChannels()
    const { articleID } = this.$route.params// 解构id
    // if (articleID) {
    //   this.getArticleByid()
    // }
    articleID && this.getArticleByid(articleID)
  }
}
</script>

<style lang="less" scoped>
.publish-item {
  margin-left: 50px;
}
</style>
