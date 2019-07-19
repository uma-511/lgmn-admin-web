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
import { rolePermissionList } from '@/api/rolePermission'
export default {
  name: 'RolePermissionTarget',
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
        roleId: ''
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
      this.dto.roleId = this.getRoleId()
      rolePermissionList(this.dto).then(res => {
        if (res) {
          this.tableData = res.data.data
        }
      })
    },
    getSelectedData () {
      return this.selectedData
    }
  },
  inject: ['updateToRightStatus', 'getRoleId']
}
</script>
