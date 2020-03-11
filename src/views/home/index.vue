<template>
<el-container>
    <el-aside  :style="{width:collapse ? '64px' : '230px'}" style="background:#2e2f32; transition:all 0.5s" >
    <layout-Left :collapse="collapse"></layout-Left>
    </el-aside>
   <el-container>
      <el-header>
           <layout-Top ></layout-Top>
      </el-header>
    <el-main style="padding: 0">
            <router-view></router-view>
    </el-main>
   </el-container>
</el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
