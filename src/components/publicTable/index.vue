<!--
  * @description:"publicTable封装"
  * @fileName: "demo"
  * @author: "wei"
  * @date:"2019-4-29"
!-->
<template>
  <div>
    <el-table
      v-loading="options.loading"
      :ref="options.ref"
      :data="tableData"
      :stripe="options.stripe"
      :border="options.border"
      :fit="options.fit"
      :highlight-current-row="options.highlightRow"
      :show-summary="options.showSummary"
      :header-cell-style="tableHeaderColor"
      :row-style="rowStyle"
      header-row-class-name="table-header-row"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column v-if="options.mutiSelect" type="selection" style="width:50px" align="center"/>
      <el-table-column v-if="options.index" label="序号" type="index" width="80" align="center"/>
      <el-table-column
        v-for="(item, index) in tableColumns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align||'center'"
        :min-width="120"
        :fixed="item.fixed">
        <template slot-scope="scope">
          <template v-if="!item.render">
            {{ scope.row[item.prop] }}
          </template>
        </template>
        <!-- 二级表头/三级表头 -->
        <!-- <el-table-column
          v-if="item.children"
          v-for="(child, index) in item.children"
          :key="index"
          :prop="child.prop"
          :label="child.label"
          :align="child.align||'center'"
          :min-width="120">
          <template slot-scope="scope">
            <template v-if="!child.render">
              {{ scope.row[child.prop] }}
            </template>
          </template>
          <el-table-column
            v-if="child.children"
            v-for="(childSon, index) in child.children"
            :key="index"
            :prop="childSon.prop"
            :label="childSon.label"
            :align="childSon.align||'center'"
            :min-width="120">
            <template slot-scope="scope">
              <template v-if="!childSon.render">
                {{ scope.row[childSon.prop] }}
              </template>
            </template>
          </el-table-column>
        </el-table-column> -->
      </el-table-column>
      <!-- 操作列按钮 -->
      <el-table-column
        v-if="options.tableOption"
        :label="tableOption.label"
        :align="tableOption.align||'center'"
        :width="tableOption.width"
        :fixed="tableOption.fixed">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.btnArr" :key="index" class="publicTableBtn">
            <el-button
              v-if="item.show"
              :type="item.type"
              :size="item.size"
              :icon="item.icon"
              :disabled="item.disabled"
              @click="handleButton(item.methods,scope.$index,scope.row,tableData)">
              {{ item.label }}
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => {}
    },
    tableColumns: {
      type: Array,
      default: () => {}
    },
    tableOption: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      result: [
        {
          state: 1,
          type: 'show'
        },
        {
          state: 2,
          type: 'hide'
        },
        {
          state: 3,
          type: 'disabled'
        }
      ]
    }
  },
  created() {
    // const data = this.tableData
    // console.log(data)
  },
  methods: {
    handleButton(methods, index, row, tableData) {
      this.$emit('handleButton', {
        methods: methods,
        index: index,
        row: row,
        tableData: tableData
      })
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleRowClick(row) {
      this.$emit('row-click', row)
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      // console.log('改变表格头部样式')
      if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) {
        return 'color:black'
      }
    },
    rowStyle({ row, rowIndex }) {
      if (row.highLight === 1) {
        return { 'background': '#D7E8FF' }
      }
    }
    // // 表格作废红色
    // tableRowClassName({ row, rowIndex }) {
    //   // console.log(row)
    //   if (row.state === 5) {
    //     return 'warning-row'
    //   }
    //   return ''
    // }
  }
}
</script>

<style>
body .el-table th.gutter {
  display: table-cell !important;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
