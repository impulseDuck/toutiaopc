<template>
  <el-card class="data">
      <bread-crumb slot="header">
      <template slot="title">
          图文数据
      </template>
      </bread-crumb>
      <!-- 放置图标组件 -->
<el-row type="flex" justify="space-around">
    <div class="echarts" ref="myChart">

</div>
</el-row>
  </el-card>
</template>

<script>
import Echarts from 'echarts'
export default {
  mounted () {
    this.myChart = Echarts.init(this.$refs.myChart)
    var data = []

    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI
      var r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    this.myChart.setOption({
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
      }],
      animationDuration: 2000
    })
  }
}
</script>

<style lang="less" scoped>
.data{
    height: 100vh;
    .echarts{
    width: 800px;
    height: 800px;
    border: 1px solid #ccc;
}
}
</style>
