<template>
  <Card>
    <tables border
            editable
            ref="table"
            search-place="top"
            :columns='columns'
            v-model='tableData'
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            @on-add-click="add"
            :addable="true"
            :searchable="false"
            :autoLoad='false'
            :searchForm="searchForm"
            dataUrl='umaDeviceApi/page'
            size='small'
            :height='tableHeight'></tables>
    <DynamicForm v-bind:value='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 :createUrl='createUrl'
                 :updateUrl='updateUrl'
                 :detailUrl='detailUrl'
                 :currentId='currentId'
                 :initData='initData'
                 @on-add-success="onAddOrUpdateSuccess"
                 @on-update-success="onAddOrUpdateSuccess"
                 @on-value-change="onshowStatusChange"></DynamicForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-UmaDevice-form'
import editForm from './form/edit-UmaDevice-form'
import detailForm from './form/detail-UmaDevice-form'
import searchFormData from './form/search-UmaDevice-form'
import { PostWithAuth } from '@/api/global'
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
      createUrl: 'umaDeviceApi/add',
      updateUrl: 'umaDeviceApi/update',
      deleteUrl: 'umaDeviceApi/delete',
      detailUrl: 'umaDeviceApi/detail',
      currentId: '',
      formStatus: 'add',
      group: {},
      groupId: 0,
      initData: {},
      tableData: [],
      searchForm: [],
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '设备IP',
          key: 'ip'
        }, {
          title: '设备名称',
          key: 'name'
        }, {
          title: '设备类型',
          key: 'type',
          render: (h, param) => {
            const type = param.row.type
            const typeName = this.getDeviceType(type)
            return h('Tag',
              {
                props: {
                  color: 'success'
                }
              },
              typeName
            )
          }
        }, {
          title: '使用状态',
          key: 'status',
          render: function (h, param) {
            const status = param.row.status
            const statusName = status === 1 ? '启用' : '停用'
            const prop = {
              color: status === 1 ? 'success' : 'error'
            }
            return h('Tag',
              {
                props: prop
              },
              statusName
            )
          }
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit']
        }
      ]
    }
  },
  methods: {
    async add () {
      if (this.groupId) {
        const _f = clone(addForm)
        this.addModel = true
        this.formData = _f
        this.formStatus = 'add'
        this.initData = clone(this.group)
      } else {
        this.$Message.error('请先选择设备分组')
      }
    },
    async edit (item) {
      const _f = clone(editForm)
      this.addModel = true
      this.currentId = item.row.id
      this.formData = _f
      this.formStatus = 'edit'
    },
    async detail (item) {
      const _f = clone(detailForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
    },
    async remove (item) {
      PostWithAuth(this.deleteUrl + '/' + item.row.id, {}).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('删除成功')
          this.$refs['table'].getData()
        } else {
          this.$Message.error('删除失败')
        }
        this.showStatus = false
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    getDeviceType (type) {
      let typeMap = { 0: '打印机', 1: '触摸屏', 2: '扫描抢', 3: '秤', 4: '标签打印机', 5: '手持机', 6: '电视' }
      return typeMap[type]
    },
    getData (group) {
      this.group = group
      this.groupId = group.groupId | 0
      let param = {
        groupId: this.groupId
      }
      this.$refs['table'].getData(param)
    },
    onAddOrUpdateSuccess () {
      this.getData(this.group)
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
