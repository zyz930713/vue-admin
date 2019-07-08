<!--
  * @description:"首页"
  * @fileName: "home"
  * @author: "wei"
  * @date:"2019-4-28"
!-->
<template>
  <div class="home-container">
    <el-row :gutter="20">
      <!-- 左侧数据部分 -->
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <el-row :gutter="20" class="homeHead">
          <el-col :span="6">
            <div class="homeHeadItem bg-purple1">
              <span class="item_title">库存预警</span>
              <p class="item_num">2</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="homeHeadItem bg-purple2">
              <span class="item_title">未发货销货订单</span>
              <p class="item_num">4</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="homeHeadItem bg-purple3">
              <span class="item_title">今日购货笔数</span>
              <p class="item_num">7</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="homeHeadItem bg-purple4">
              <span class="item_title">今日销货笔数</span>
              <p class="item_num">9</p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="homeTags">
          <el-col :span="24">
            <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
              <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
                <keep-alive>
                  <el-row :gutter="32">
                    <el-col v-if="activeName=='sc'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        <line-chart :chart-data="lineChartData"/>
                      </div>
                    </el-col>
                    <el-col v-if="activeName=='xh'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        <bar-chart :chart-data="barChartData"/>
                      </div>
                    </el-col>
                    <el-col v-if="activeName=='gh'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        <twoline-chart :chart-data="twolineChartData"/>
                      </div>
                    </el-col>
                    <el-col v-if="activeName=='ck'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        4
                      </div>
                    </el-col>
                  </el-row>
                </keep-alive>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右侧公告部分 -->
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="publicTigs bg-purple5">
              <p class="publicTigs_text">公告</p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="activeName2" style="margin-top:30px;" type="border-card">
              <el-tab-pane v-for="item in tabMapOptions2" :label="item.label" :key="item.key" :name="item.key">
                <keep-alive>
                  <el-row :gutter="32">
                    <el-col v-if="activeName2=='cygn'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        123
                      </div>
                    </el-col>
                    <el-col v-if="activeName2=='gjsj'" :xs="24" :sm="24" :lg="24">
                      <div class="chart-wrapper">
                        456
                      </div>
                    </el-col>
                  </el-row>
                </keep-alive>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'
import TwolineChart from './components/TwolineChart'
import BarChart from './components/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [40, 120, 71, 134, 105, 55, 85],
    actualData: [1, 2, 3, 4, 5, 6, 7]
  }
}
const barChartData = {
  newVisitis: {
    expectedData: [40, 120, 71, 134, 105, 55, 85],
    actualData: ['1', '2', '3', '4', '5', '6', '7']
  }
}
const twolineChartData = {
  newVisitis: {
    expectedData: [40, 120, 71, 134, 105, 55, 85],
    actualData: [1, 2, 3, 4, 5, 6, 7]
  }
}
export default {
  name: 'Home',
  components: {
    LineChart,
    TwolineChart,
    BarChart
  },
  data() {
    return {
      tabMapOptions: [
        { label: '生产', key: 'sc' },
        { label: '销货', key: 'xh' },
        { label: '购货', key: 'gh' },
        { label: '仓库', key: 'ck' }
      ],
      tabMapOptions2: [
        { label: '常用功能', key: 'cygn' },
        { label: '关键数据', key: 'gjsj' }
      ],
      activeName: 'sc',
      activeName2: 'cygn',
      createdTimes: 0,
      lineChartData: lineChartData.newVisitis,
      barChartData: barChartData.newVisitis,
      twolineChartData: twolineChartData.newVisitis
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  padding: 30px;
  .bg-purple1 {
    background: #00BAD2;
  }
  .bg-purple2 {
    background: #3399FF;
  }
  .bg-purple3 {
    background: #FAD954;
  }
  .bg-purple4 {
    background: #F37A8E;
  }
  .chart-wrapper{
    height:60vh;
  }
  .homeHead{
    .homeHeadItem{
        height:180px;
       .item_title{
        font-size: 18px;
        color:#999;
        padding:10px;
        box-sizing: border-box;
        background:#fff;
        margin:0;
        display: inline-block;
      }
      .item_num{
        font-size: 60px;
        font-weight: 600;
        color:#ffffff;
        margin:0;
        padding:20px 0 40px;
        box-sizing: border-box;
        text-align: center;
      }
    }

  }
  .homeTags{
    min-height:60vh;
    padding-top:15px;
  }
  .publicTigs{
    background: #00BAD2;
    width:100%;
    height:180px;
    .publicTigs_text{
      font-size: 24px;
      font-weight: 600;
      color:#000;
      margin:0;
      padding:20px 0 40px;
      box-sizing: border-box;
      text-align: center;
    }
  }
  .sidebarTags{
    width:100%;
    height:500px;
  }

}
</style>
