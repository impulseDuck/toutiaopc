<template>
<div class="cover-img">

<div @click="openDialog(index)" class="cover-image-item" v-for="(item,index) in list" :key="index" >
    <img :src="item ? item : defaultImg" alt="" >
    <!-- <img :src="defaultImg" alt="" > -->

</div>
<el-dialog :visible="DialogVisible" @close="DialogVisible=false">
<select-image @selectOneImg="recevieImg"></select-image>
</el-dialog>
</div>

</template>

<script>
export default {
  props: ['list'], // 接收传递的参数
  data () {
    return {
      DialogVisible: false,
      selectIndex: -1,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    openDialog (index) {
      this.DialogVisible = true
      this.selectIndex = index
    },
    recevieImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.DialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-img{
    display: flex;
    margin: 20px 100px;
    .cover-image-item{
        border: 2px solid #ccc;
        border-radius: 4px;
        height: 250px;
        width: 250px;
        padding: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
