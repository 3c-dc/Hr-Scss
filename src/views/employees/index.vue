<template>
  <div class="dashboard-container">
    <div class="app-container">
      <template>
        <div class="dashboard-container">
          <div class="app-container">
            <page-tools :show-before="true">
              <span slot="before">共 {{ page.total }} 条记录</span>
              <template slot="after">
                <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
                <el-button size="small" type="danger" @click="exportData()">导出</el-button>
                <!-- <el-button size="small" type="primary">新增员工</el-button> -->
                <el-button icon="plus" type="primary" size="small" @click="showDialog = true">新增员工</el-button>
              </template>
            </page-tools>
            <!-- 放置表格和分页 -->
            <el-card v-loading="loading">
              <el-table border :data="list">
                <el-table-column label="序号" sortable="" type="index" />
                <el-table-column label="姓名" sortable="" prop="username" />
                <el-table-column label="头像" align="center" width="120px">
                  <!-- 具名插槽 两种用法 -->
                  <template v-slot="{row}">
                    <!-- 第一种 v-solt -->
                    <img
                      v-imagerror="require('@/assets/common/bigUserHeader.png')"
                      :src="row.staffPhoto"
                      style="border-radius: 50%; width: 100px; height: 100px"
                      @click="showQrCode(row.staffPhoto)"
                    >
                  </template>
                  <!-- <template slot-scope="{row}">
                    第二种 solt-scope
                  </template> -->
                </el-table-column>
                <el-table-column label="工号" sortable="" prop="workNumber" />

                <!-- 格式化聘用形式 -->
                <el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatEmployment" />
                <!-- <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" /> -->

                <el-table-column label="部门" sortable="" prop="departmentName" />

                <!-- <el-table-column label="入职时间" sortable="" prop="timeOfEntry" /> -->
                <el-table-column label="入职时间" sortable="" align="center">
                  <!-- 作用域插槽 -->
                  <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
                </el-table-column>

                <!-- <el-table-column label="账户状态" sortable="" prop="enableState" /> -->

                <el-table-column label="账户状态" align="center" sortable="" prop="enableState">
                  <template slot-scope="{ row }">
                    <!-- 根据当前状态来确定 是否打开开关 -->
                    <el-switch :value="row.enableState === 1" />
                  </template>
                </el-table-column>

                <el-table-column label="操作" sortable="" fixed="right" width="280">
                  <template slot-scope="{ row }">

                    <!-- <el-button type="text" size="small">查看</el-button> -->
                    <!-- <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button> -->
                    <el-button :disabled="!checkPermission('POINT-USER-UPDATE')" type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>

                    <el-button type="text" size="small">转正</el-button>
                    <el-button type="text" size="small">调岗</el-button>
                    <el-button type="text" size="small">离职</el-button>
                    <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
                    <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页组件 -->
              <el-row type="flex" justify="center" align="middle" style="height: 60px">
                <el-pagination
                  layout="prev, pager, next"
                  :page-size="page.size"
                  :current-page="page.page"
                  :total="page.total"
                  @current-change="changePage"
                />
              </el-row>
            </el-card>
          </div>
        </div>
      </template>
      <!-- 放置新增组件 -->
      <AddDemployee :show-dialog.sync="showDialog" />
      <!-- 放置员工头像二维码显示 -->
      <el-dialog title="二维码" :visible.sync="showCodeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <!-- 放置角色分配组件 -->
      <assign-role ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddDemployee from './components/add-employee'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'

export default {
  components: {
    AddDemployee,
    AssignRole
  },
  data() {
    return {
      showRoleDialog: false,
      showCodeDialog: false,
      loading: false,
      list: [], // 接数据的
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      },
      showDialog: false, // 控制新增员工的弹窗
      userId: null
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      // console.log(cellValue)
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 导出excel数据
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 导出excel
      import('@/vendor/Export2Excel').then(async excel => {
        //  excel是引入文件的导出对象
        // 导出  header从哪里来
        // data从哪里来
        // 现在没有一个接口获取所有的数据
        // 获取员工的接口 页码 每页条数    100   1 10000
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 返回的data就是 要导出的结构
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader, // 复杂表头
          merges // 合并选项
        })

        // excel.export_json_to_excel({
        //   header: ['姓名', '工资'],
        //   data: [['张三', 3000], ['李四', 5000]],
        //   filename: '员工工资表'
        // })
        // [{ username: '张三',mobile: 13112345678 }]  => [[]]
        // 要转化 数据结构 还要和表头的顺序对应上
        // 要求转出的标题是中文
      })
    },
    // 将表头数据和数据进行对应
    // [{}]  =>   [[]]
    formatJson(headers, rows) {
      return rows.map(item => {
        // item是一个对象  { mobile: 132111,username: '张三'  }
        // ["手机号", "姓名", "入职日期" 。。]
        return Object.keys(headers).map(key => {
          // 需要判断 字段
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
        // ["132", '张三’， ‘’，‘’，‘’d]
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
      // 需要处理时间格式问题
    },
    showQrCode(url) {
      // url存在的情况下 才弹出层
      console.log(url)
      // debugger
      if (url) {
        this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    // 编辑角色
    async  editRole(id) {
      this.userId = id // props传值 是异步的
      await this.$refs.assignRole.getUserDetailById(id) // 父组件调用子组件方法
      this.showRoleDialog = true
    }
  }

}
</script>

<style>

</style>
