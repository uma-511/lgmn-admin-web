<template>
  <Card>
    <tables border
            editable
            search-place="top"
            :columns='columns'
            v-model='tableData'
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            size='small'
            :height='tableHeight'></tables>
    <DynamicForm v-bind:value='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 @on-value-change="onshowStatusChange"></DynamicForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import { getUserPage } from '@/api/data'
import addRoleForm from './form/add-role-form'
import editRoleForm from './form/edit-role-form'
import detailRoleForm from './form/detail-role-form'
export default {
  components: {
    Tables,
    DynamicForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      formData: [],
      createUrl: 'create.lgmn.com',
      updateUrl: 'update.lgmn.com',
      deleteUrl: 'delete.lgmn.com',
      formStatus: 'add',
      tableData: [],
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        { title: '角色名称', key: 'name' },
        {
          title: '中文名称',
          key: 'chineseName'
        },
        {
          title: '是否可用',
          key: 'valid',
          render: (h, params) => {
            const data = params.row
            const status = data.valid
            const _this = this
            return h('div', [
              h('i-switch', {
                props: {
                  'true-value': 1,
                  'false-value': 0,
                  value: status
                },
                on: {
                  'on-change': (value) => {
                    data.valid = value
                    updateRole(data).then(res => {
                      if (res) {
                        _this.$Message.success(res.data.message)

                        if (res.data.code === '200') {
                          _this.index()
                        }
                      }
                    })
                  }
                }
              })
            ])
          }
        },
        {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit', 'detail']
        }
      ]
    }
  },
  methods: {
    async edit (item) {
      const _f = clone(editRoleForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'edit'
    },
    async detail (item) {
      const _f = clone(detailRoleForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
    },
    async add () {
      const _f = clone(addRoleForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
    },
    async remove (item) {
      let confirmed = await shell.confirm({ title: '确认删除', message: `确定要删除${item.name}吗？` })
      if (!confirmed) return
      let res = await http.delete(`/api/demo/${item.id}`)
      if (res.ok) {
        shell.newNotification({ title: '删除成功', type: 'success' })
        this.search()
      } else {
        shell.newNotification({ title: '删除成功', type: 'error' })
      }
    },
    onshowStatusChange (val) {
      this.addModel = val
    }
  },
  mounted () {
    getUserPage().then(res => {
      this.tableData = res.data
    })
  }
}
</script>
