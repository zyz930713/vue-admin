<!--
  * @description:"第二种publicTable封装"
  * @fileName: "demo"
  * @author: "wei"
  * @date:"2019-4-29"
!-->
<template>
  <div>
    <el-table
      v-loading="options.loading"
      :data="dataSource"
      :max-height="options.maxHeight"
      :stripe="options.stripe"
      :border="options.border"
      header-row-class-name="table-header-row"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange">

      <el-table-column v-if="options.mutiSelect" type="selection" style="width:50px" align="center"/>
      <el-table-column v-if="options.index" label="序号" type="index" width="50" align="center"/>
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align||'center'"
          :width="column.width"
          :fixed="column.fixed">
          <template slot-scope="scope">

            <template v-if="!column.render">
              {{ scope.row[column.prop] }}
            </template>

            <template v-else>
              <RenderDom :row="scope.row" :index="index" :render="column.render" />
            </template>

            <template v-if="column.button">
              <template v-for="(btn, i) in column.group">
                <el-button
                  :key="i"
                  :type="btn.type"
                  :size="btn.size || 'mini'"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  @click.stop="btn.onClick(scope.row, scope.$index)"
                >{{ btn.name }}</el-button>
              </template>
            </template>
          </template>

        </el-table-column>
      </template>

    </el-table>

    <el-pagination
      v-if="pagination"
      :total="pagination.total"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
    />

  </div>
</template>

<script>
export default {
  components: {
    RenderDom: {
      functional: true,
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
         * @param {Function} createElement
         * @param {Object} ctx
         * @argument
         */
      render(createElement, ctx) {
        const { row, index } = ctx.props
        return ctx.props.render(row, index)
      }
    }
  },
  props: {
    dataSource: {
      type: Array,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => {}
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.$parent.options = Object.assign({
      maxHeight: 500,
      stripe: true,
      border: true
    }, this.options)

    this.options.initTable && this.fetch()
  },
  methods: {
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetch()
    },
    handleIndexChange(current) {
      this.pagination.pageIndex = current
      this.fetch()
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    }
  }
}
</script>

<style>
</style>
