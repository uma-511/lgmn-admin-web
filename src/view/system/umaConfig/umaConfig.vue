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
            @on-add-click="add"
            @on-current-change="onSelectChange"
            :addable="false"
            :searchForm="searchForm"
            :dataUrl="dataUrl"
            highlight-row
            size='small'
            ref="table"
            :height='tableHeight'></tables>
    <DynamicForm v-bind:value='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 :createUrl='createUrl'
                 :updateUrl='updateUrl'
                 :detailUrl='detailUrl'
                 :currentId='currentId'
                 @on-add-success="onAddOrUpdateSuccess"
                 @on-update-success="onAddOrUpdateSuccess"
                 @on-value-change="onshowStatusChange"></DynamicForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-umaConfig-form'
import editForm from './form/edit-umaConfig-form'
import detailForm from './form/detail-umaConfig-form'
import searchFormData from './form/search-umaConfig-form'
import { PostWithAuth } from '@/api/global'
export default {
  components: {
    Tables,
    DynamicForm
  },
  data () {
    // var vue = this
    return {
      addModel: false,
      formData: [],
      createUrl: 'umaConfigApi/add',
      updateUrl: 'umaConfigApi/update',
      deleteUrl: 'umaConfigApi/delete',
      detailUrl: 'umaConfigApi/detail',
      dataUrl: 'umaConfigApi/page',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      typeId: '',
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '配置名称',
          key: 'name'
        }, {
          title: '状态',
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
          // }, {
          //   key: 'handle',
          //   renderHeader (h, { column, index }) {
          //     return h('span', vue.$t('option'))
          //   },
          //   width: 200,
          //   options: ['delete', 'edit']
        }
      ]
    }
  },
  methods: {
    async add () {
      const _f = clone(addForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
    },
    async edit (item) {
      const _f = clone(editForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'edit'
      this.currentId = item.row.id + ''
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
    onAddOrUpdateSuccess () {
      this.$refs['table'].getData()
    },
    onSelectChange (currentRow, oldCurrentRow) {
      this.typeId = currentRow.id
    }
  },
  watch: {
    typeId () {
      this.$emit('on-type-id-change', this.typeId)
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
