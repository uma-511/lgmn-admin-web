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
import { roleList } from '@/api/userRole'
export default {
  name: 'UserRoleSource',
  data () {
    return {
      tableData: [],
      selectData: [],
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
      this.selectData = selection
      if (selection.length > 0) {
        this.updateToLeftStatus(true)
      } else {
        this.updateToLeftStatus(false)
      }
    },
    loadData () {
      this.dto.userId = this.getUserId()
      roleList(this.dto).then(res => {
        if (res) {
          this.tableData = res.data.data
        }
      })
    },
    getSelectedData () {
      return this.selectData
    }
  },
  inject: ['updateToLeftStatus', 'getUserId']
}
</script>
