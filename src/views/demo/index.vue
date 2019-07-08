<!--
  * @description:"布局示例"
  * @fileName: "demo"
  * @author: "aisheishei"
  * @date:"2019-07-07"
!-->
<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div class="searchForm-container">
      <el-form :inline="true" :model="searchForm" label-width="120px">
        <el-form-item label class="searchFormItem">
          <el-input
            v-model="searchForm.contractNum"
            clearable
            placeholder="请输入合同编号"
            size="medium"
            class="searchFormItem-input"
          />
        </el-form-item>
        <el-form-item label="车队名称：" class="searchFormItem">
          <!-- <el-input v-model="searchForm.executionStat" clearable size="medium" class="searchFormItem-input"/> -->
          <el-select
            v-model="searchForm.teamName"
            size="medium"
            clearable
            placeholder="车队名称"
            class="searchFormItem-input"
          >
            <el-option
              v-for="item in teamNumberList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同类型：" class="searchFormItem">
          <!-- <el-input v-model="searchForm.executionStat" clearable size="medium" class="searchFormItem-input"/> -->
          <el-select
            v-model="searchForm.contractType"
            size="medium"
            clearable
            placeholder="合同类型"
            class="searchFormItem-input"
          >
            <el-option
              v-for="item in contractTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行状态：" class="searchFormItem">
          <!-- <el-input v-model="searchForm.executionStat" clearable size="medium" class="searchFormItem-input"/> -->
          <el-select
            v-model="searchForm.executionStat"
            size="medium"
            clearable
            placeholder="执行状态"
            class="searchFormItem-input"
          >
            <el-option
              v-for="item in executionStatList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="签订日期范围：" class="searchFormItem">
          <el-date-picker
            v-model="searchForm.contractDate"
            :picker-options="pickerOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button size="medium" type="primary" icon="el-icon-plus" @click="onAddTableList">新增运输合同</el-button>
          <!-- <el-button size="medium" type="primary" icon="el-icon-delete" @click="onDelTableList">删除</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮组 -->
    <div class="buttonGroup-container">
      <el-row>
        <el-col :span="24">
          <el-button>执行</el-button>
          <el-button>执行完毕</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="tableList-container">
      <publicTable
        :options="options"
        :table-data="tableData"
        :table-columns="tableColumns"
        :table-option="tableOption"
        @handleButton="handleButton"
        @selection-change="handleSelectionChange"
      />
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        :total="totalNum"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹出层 -->
    <div class="dialog-container">
      <el-dialog
        :visible.sync="addTableDialog"
        title="新增运输合同"
        @close="onAddReset('addTableDialogData')"
      >
        <el-form
          ref="addTableDialogData"
          :model="addTableDialogData"
          :inline="true"
          :label-position="labelPosition"
        >
          <el-form-item label="签订日期：" prop="contractDate">
            <el-input
              v-model="addTableDialogData.contractDate"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="合同编号：" prop="contractNum">
            <el-input
              v-model="addTableDialogData.contractNum"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="合同类型：" prop="contractType">
            <el-select
              v-model="addTableDialogData.contractType"
              size="medium"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in contractTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="车队名称：" prop="teamName">
            <el-input v-model="addTableDialogData.teamName" maxlength="50" size="medium" clearable />
          </el-form-item>

          <el-form-item label="提煤地点：" prop="getCoalAddress">
            <el-input
              v-model="addTableDialogData.getCoalAddress"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="卸煤地点：" prop="removeCoalAddress">
            <el-input
              v-model="addTableDialogData.removeCoalAddress"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="运输重量：" prop="trafficVolume">
            <el-input
              v-model="addTableDialogData.trafficVolume"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="车数：" prop="vehicleNumber">
            <el-input
              v-model="addTableDialogData.vehicleNumber"
              maxlength="50"
              size="medium"
              clearable
            />
          </el-form-item>

          <el-form-item label="上传合同：" prop="upload">
            <el-input v-model="addTableDialogData.upload" maxlength="50" size="medium" clearable />
          </el-form-item>

          <el-form-item label="状态：" prop="executionStat">
            <el-select
              v-model="addTableDialogData.executionStat"
              size="medium"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in executionStatList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :loading="btnLoading" type="primary" @click="onAddSubmit">确 定</el-button>
          <el-button @click="onAddReset('addTableDialogData')">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import publicTable from '@/components/publicTable/index.vue'
export default {
  name: 'Demo',
  components: {
    publicTable
  },
  data() {
    return {
      // 搜索栏数据
      searchForm: {
        contractNum: '',
        teamName: '',
        contractType: '',
        executionStat: '',
        contractData: ''
      },
      // 执行状态-下拉框
      executionStatList: [
        {
          id: 1,
          value: '1',
          label: '完成'
        },
        {
          id: 2,
          value: '2',
          label: '执行中'
        },
        {
          id: 3,
          value: '3',
          label: '失败'
        }
      ],
      // 车队名称-下拉框
      teamNumberList: [
        {
          id: 1,
          value: '1',
          label: '李晓红'
        },
        {
          id: 2,
          value: '2',
          label: '车队1'
        },
        {
          id: 3,
          value: '3',
          label: '车队2'
        }
      ],
      // 合同类型-下拉框
      contractTypeList: [
        {
          id: 1,
          value: '1',
          label: '销售1'
        },
        {
          id: 2,
          value: '2',
          label: '销售2'
        },
        {
          id: 3,
          value: '3',
          label: '销售3'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 表格数据
      options: {
        loading: false,
        initTable: true,
        stripe: false,
        border: true,
        fit: true,
        mutiSelect: true,
        index: true,
        tableOption: true
      },
      tableColumns: [
        { label: '合同编号', prop: 'contractNum' },
        { label: '签订日期', prop: 'contractDate' },
        { label: '合同类型', prop: 'contractType' },
        { label: '车队名称', prop: 'teamName' },
        { label: '提煤地点', prop: 'getCoalAddress' },
        { label: '卸煤地点', prop: 'removeCoalAddress' },
        { label: '运输量', prop: 'trafficVolume' },
        { label: '车数/列数', prop: 'vehicleNumber' },
        { label: '执行状态', prop: 'executionStat' }
      ],
      tableData: [
        {
          id: 1,
          contractDate: '2019-03-25',
          contractNum: 'QW565479',
          contractType: '汽运',
          teamName: '李晓红',
          getCoalAddress: '山西省',
          removeCoalAddress: '2-上海市静安区',
          trafficVolume: '200',
          vehicleNumber: '1',
          executionStat: '执行中'
        },
        {
          id: 2,
          contractDate: '2019-03-26',
          contractNum: 'QW565479',
          contractType: '铁运',
          teamName: '李晓红',
          getCoalAddress: '山西省',
          removeCoalAddress: '2-上海市静安区',
          trafficVolume: '200',
          vehicleNumber: '1',
          executionStat: '执行中'
        },
        {
          id: 3,
          contractDate: '2019-03-27',
          contractNum: 'QW565479',
          contractType: '汽运',
          teamName: '李晓红',
          getCoalAddress: '山西省',
          removeCoalAddress: '2-上海市静安区',
          trafficVolume: '200',
          vehicleNumber: '1',
          executionStat: '执行中'
        }
      ],
      tableOption: {
        label: '操作',
        align: 'center',
        fixed: false,
        width: '130'
      },
      btnArr: [
        {
          btnId: 0,
          show: true,
          disabled: false,
          label: '查看详情',
          type: 'primary',
          size: 'mini',
          methods: 'editCharge'
        }
      ],
      // 选中表格-行数组
      selectIndexArr: [],
      // 分页数据
      currentPage: 1,
      pageSize: 1,
      totalNum: 20,
      // 新增弹出modal
      addTableDialog: false,
      labelPosition: 'right',
      addTableDialogData: {
        upload: '',
        contractType: '',
        contractDate: '',
        contractNum: '',
        teamName: '',
        getCoalAddress: '',
        removeCoalAddress: '',
        vehicleNumber: '',
        trafficVolume: '',
        executionStat: ''
      },
      fileList: [],
      btnLoading: false
    }
  },
  created() {
    console.log('初始化页面')
    this.getBasicData()
  },
  methods: {
    //  渲染表格开始的状态
    getBasicData() {
      const newTableData = this.tableData
      newTableData.map((item) => {
        item['btnArr'] = this.btnArr
        if (item.state === 1) {
          item.stateStr = '已启用'
          const newBtnArr = []
          item.btnArr.map((btn) => {
            if (btn.btnId === 1) {
              const newBtn = JSON.parse(JSON.stringify(btn))
              newBtn.type = 'info'
              newBtn.label = '已启用'
              newBtn.methods = 'onSubmitTable'
              btn = newBtn
            }
            console.log(btn)
            newBtnArr.push(btn)
          })
        }
        if (item.state === 2) {
          item.stateStr = '已禁用'
          const newBtnArr = []
          item.btnArr.map((btn) => {
            if (btn.btnId === 1) {
              const newBtn = JSON.parse(JSON.stringify(btn))
              newBtn.type = 'info'
              newBtn.label = '已禁用'
              newBtn.methods = 'offSubmitTable'
              btn = newBtn
            }
            console.log(btn)
            newBtnArr.push(btn)
          })
          item.btnArr = newBtnArr
        }
      })
      this.tableData = newTableData
      console.log(this.tableData)
    },
    // 查询
    onSearch() {
      console.log('查询')
      // const fd = new FormData()
      // fd.append('id', 1)
      // console.log(fd)
      // var faram = {}
      // faram['id'] = 1
      //  searchForm: {
      //   contractNum: '',
      //   teamName: '',
      //   getCoalAddress: '',
      //   executionStat: '',
      //   auditState: ''
      // },
      console.log(this.searchForm)
      this.tableData = [{
        id: 2,
        contractDate: '2019-03-25',
        contractNum: this.searchForm.contractNum,
        contractType: this.searchForm.contractType,
        teamName: this.searchForm.teamName,
        getCoalAddress: '山西省',
        removeCoalAddress: '上海市静安区',
        trafficVolume: '2.00',
        vehicleNumber: '1.00',
        executionStat: this.searchForm.executionStat
      }]
    },
    // 按钮渲染
    handleButton(val) {
      if (val.methods === 'editCharge') {
        this.editCharge(val.row)
      } else if (val.methods === 'delCharge') {
        this.delCharge(val.row)
      }
    },
    handleSelectionChange(selection) {
      console.log(selection)
      this.selectIndexArr = []
      if (selection) {
        selection.map((item) => {
          this.selectIndexArr.push(item.id)
        })
      }
      console.log(this.selectIndexArr)
    },
    // 删除
    onDelTableList() {
      // console.log(this.selectIndexArr)
      let newArr = []
      if (this.selectIndexArr.length > 0) {
        for (var i = 0; i < this.selectIndexArr.length; i++) {
          newArr = this.tableData.filter((obj) => {
            return obj.id !== this.selectIndexArr[i]
          })
          this.tableData = newArr
        }
      }
    },
    onAddTableList() {
      this.addTableDialog = true
    },
    onAddSubmit() {
      // console.log('提交新增')
      this.tableData.push(this.addTableDialogData)
      this.addTableDialog = false
    },
    onAddReset(formName) {
      // this.$refs[formName].resetFields()
      // this.$nextTick(() => {
      // this.$refs[formName].resetFields()
      // })
      this.addTableDialog = false
      // console.log('取消新增')
    },
    editCharge(row) {
      this.addTableDialogData = row
      // this.addTableDialog = true;
    },
    delCharge(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.tableData.splice(row.id, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  // 模态框
</style>
