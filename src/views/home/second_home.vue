<template>
<div class="second-home">
   <el-carousel type="card" height="500px">
   <el-carousel-item v-for="item in list" :key=item>
  <img :src="item" alt="">
   </el-carousel-item>
 </el-carousel>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3039270833,855199783&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252855866&di=8a8a3fc2a842f2e1edf46135cb265218&imgtype=0&src=http%3A%2F%2Fcrawl.nosdn.127.net%2F1905c084e436e4d902b843a105699522.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252855865&di=1bbd2c840551e54c26a6f365882d06ca&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d4815be157d5a801209252838ce8.jpg%402o.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252855861&di=f414b9d98d40165bc168c38cc2ca379e&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Ffa38a619ad38b172f37d0212db63b094b5d78527.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252855850&di=b791367c33c338cccf6a72a804e82eb1&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F03b5af637be8d129ea8a29b4137e9228776e174272b82-6YVZ66_fw658'
      ]
    }
  }
}
</script>

<style>
.second-home {
  /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 20px);
  background-size: cover;
  background-color: black;
}

</style>
