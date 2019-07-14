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
            :searchable="true"
            :searchForm="searchForm"
            dataUrl='labelFormatApi/page'
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
                 @on-value-change="onshowStatusChange"></DynamicForm>
    <AddLabelFormat :value="showStatus" @on-showStatus-change="onMyShowStatusChange" @on-added="onAdded"></AddLabelFormat>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
// import addForm from './form/add-labelFormat-form'
import editForm from './form/edit-labelFormat-form'
import detailForm from './form/detail-labelFormat-form'
import searchFormData from './form/search-labelFormat-form'
import AddLabelFormat from './addLabelFormat'
export default {
  components: {
    Tables,
    DynamicForm,
    AddLabelFormat
  },
  data () {
    var vue = this
    return {
      addModel: false,
      showStatus: false,
      formData: [],
      createUrl: 'labelFormatApi/add',
      updateUrl: 'labelFormatApi/update',
      deleteUrl: 'labelFormatApi/delete',
      detailUrl: 'labelFormatApi/detail',
      currentId: '',
      formStatus: 'add',
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
          title: 'ID',
          key: 'id'
        }, {
          title: '标签名称',
          key: 'name'
        }, {
          title: '模板路径',
          key: 'path'
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete']
        }
      ]
    }
  },
  methods: {
    async add () {
      this.showStatus = true
    },
    async edit (item) {
      const _f = clone(editForm)
      this.addModel = true
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
          this.onAdded()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onAdded () {
      this.$refs['table'].getData()
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    onMyShowStatusChange (val) {
      this.showStatus = val
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
