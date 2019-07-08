<!--
  * @description:"柱状图"
  * @fileName: "home"
  * @author: "wei"
  * @date:"2019-4-28"
!-->
<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: function() {
        return
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      // this.__resizeHanlder = debounce(() => {
      //   if (this.chart) {
      //     this.chart.resize()
      //   }
      // }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    // const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    // sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    // const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    // sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions(data = {}) {
      // var yMax = 500
      // var dataShadow = []

      // for (var i = 0; i < data.length; i++) {
      //   dataShadow.push(yMax)
      // }
      this.chart.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          data: data.actualData,
          axisLabel: {
            // inside: true,
            textStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          // { // For shadow
          //   type: 'bar',
          //   itemStyle: {
          //     normal: { color: 'rgba(0,0,0,0.05)' }
          //   },
          //   barGap: '-100%',
          //   barCategoryGap: '40%',
          //   data: data.expectedData,
          //   animation: false
          // },
          {
            type: 'bar',
            barWidth: '40%',
            data: data.expectedData,
            animation: 1000,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            }
          }
        ]
      })

      // Enable data zoom when user click bar.
      // var zoomSize = 6
      // myChart.on('click', function(params) {
      //   console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
      //   myChart.dispatchAction({
      //     type: 'dataZoom',
      //     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      //     endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      //   })
      // })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
