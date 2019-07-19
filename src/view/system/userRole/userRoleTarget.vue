<template>
  <Table ref="table"
         height="700"
         highlight-row
         @on-selection-change="select"
         :data="tableData"
         :columns="columns">
  </Table>
</template>

<script>
import { userRoleList } from '@/api/userRole'
export default {
  name: 'UserRoleTarget',
  data () {
    return {
      tableData: [],
      selectedData: [],
      columns: [{
        type: 'selection',
        width: 50
      },
      { title: '权限名称', key: 'name' },
      {
        title: '中文名称',
        key: 'chineseName'
      }],
      dto: {
        userId: ''
      }
    }
  },
  methods: {
    select (selection, row) {
      this.selectedData = selection
      if (selection.length > 0) {
        this.updateToRightStatus(true)
      } else {
        this.updateToRightStatus(false)
      }
    },
    loadData () {
      this.dto.userId = this.getUserId()
      userRoleList(this.dto).then(res => {
        if (res) {
          this.tableData = res.data.data
        }
      })
    },
    getSelectedData () {
      return this.selectedData
    }
  },
  inject: ['updateToRightStatus', 'getUserId']
}
</script>
