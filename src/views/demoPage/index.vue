<!--
  * @description:"模板页面构建"
  * @fileName: "demo"
  * @author: "wei"
  * @date:"2019-4-29"
!-->
<template>
  <div class="app-container">
    <div class="search-container">
      <div class="searchItem">
        <label for="selectVal"><span class="labelHead" style="color:#666">班次：</span></label>
        <el-select v-model="selectVal" placeholder="全部" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :value="item.key" :label="item.value"/>
        </el-select>
      </div>
      <div class="searchItem">
        <label for="pickerVal"><span class="labelHead" style="color:#666">日期：</span></label>
        <el-date-picker
          v-model="pickerVal"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </div>
      <div class="searchItem">
        <el-input v-model="inputVal" placeholder="姓名工种" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter1"/>
      </div>
      <div class="searchItem">
        <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleFilter2">查询</el-button>
      </div>
    </div>
    <div class="total-container">
      <span class="totalText">总人次：<span class="totalNum">{{ totalPersonNum }}</span>次</span>
    </div>
    <div class="table-container">
      <public-table
        :columns="columns"
        :data-source="tableData"
        :options="options"
        :pagination="pagination"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
      />
    </div>
    <div class="pagination-container" style="margin-top:20px;">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[3,5,7,9]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <div class="chart-container">
      <div class="chart-wrapper">
        <bar-chart :chart-data="barChartData"/>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart'
import PublicTable from './components/PublicTable'
const barChartData = {
  newVisitis: {
    expectedData: [40, 120, 71, 134, 105, 55, 85],
    actualData: ['1', '2', '3', '4', '5', '6', '7']
  }
}
export default {
  name: 'TableDemo',
  components: {
    BarChart,
    PublicTable
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      calendarTypeOptions: [
        { key: '1', value: '第一班' },
        { key: '2', value: '第二班' },
        { key: '3', value: '第三班' },
        { key: '4', value: '第四班' }
      ],
      selectVal: '',
      pickerVal: '',
      inputVal: '',
      totalPersonNum: 200,
      columns: [
        {
          prop: 'id',
          label: '编号',
          width: 60
        },
        {
          prop: 'title',
          label: '标题',
          // render 可以根据你想要渲染的方式渲染
          // jsx 不提供 v-model 指令，若你想要使用，，推荐使用插件 babel-plugin-jsx-v-model
          // jsx https://github.com/vuejs/babel-plugin-transform-vue-jsx
          render: (row, index) => {
            return (
              <span style='color: blue' onClick={e => this.handleClick(e, row)}>{row.title}</span>
            )
          }
        },
        {
          prop: 'author',
          label: '作者'
        },
        {
          button: true,
          label: '按钮组',
          group: [{
            // you can props => type size icon disabled plain
            name: '编辑',
            type: 'warning',
            icon: 'el-icon-edit',
            plain: true,
            onClick: (row, index) => { // 箭头函数写法的 this 代表 Vue 实例
              console.log(row, index)
            }
          }, {
            name: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            disabled: false,
            onClick(row) { // 这种写法的 this 代表 group 里的对象
              this.disabled = true
              console.log(this)
            }
          }]
        }
      ],
      tableData: [
        {
          id: 1,
          title: '标题1',
          author: '郭大大'
        },
        {
          id: 2,
          title: '标题2',
          author: '郭大大2'
        }
      ],
      pagination: {
        total: 3,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: true,
        index: true,
        loading: false,
        initTable: true
      },
      barChartData: barChartData.newVisitis,
      total: 5,
      listQuery: {
        page: 1,
        limit: 3
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter1() {
      console.log('input')
    },
    handleFilter2() {
      console.log('查询')
    },
    getList() {
      this.listLoading = false
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },

    handleClick(e, row) {
      e.cancelBubble = true
      console.log(row)
    },
    handleRowClick(row, event, column) {
      console.log('click row:', row, event, column)
    },
    handleSelectionChange(selection) {
      console.log(selection)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .search-container{
    padding: 10px;
    background: #fff;
    margin-bottom:10px;
    .searchItem{
      display: inline-block;
      padding:5px 15px 5px 0;
    }
  }
  .total-container{
    padding:15px 0 15px 10px;
    .totalText{
      color:#000;
      font-size: 20px;
      .totalNum{
        color:#000;
        font-size: 26px;
      }
    }
  }
  .table-container{
    margin-bottom:15px;
    background: #fff;
   }
   .pagination-container{
     padding:10px 0;
     margin-bottom:15px;
    //  display: none;
     background: #fff;
   }
  .chart-container{
    padding:20px 0;
    background: #fff;
    .chart-wrapper{
      height:40vh;
    }
  }
</style>

