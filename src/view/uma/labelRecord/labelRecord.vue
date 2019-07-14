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
            :addable="false"
            :searchable="true"
            :searchForm="searchForm"
            dataUrl='viewLabelRecordApi/page'
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
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-labelRecord-form'
import editForm from './form/edit-labelRecord-form'
import detailForm from './form/detail-labelRecord-form'
import searchFormData from './form/search-labelRecord-form'
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
      createUrl: 'labelRecordApi/add',
      updateUrl: 'labelRecordApi/update',
      deleteUrl: 'labelRecordApi/delete',
      detailUrl: 'viewLabelRecordApi/detail',
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
        // }, {
        //   title: '${column.comment}',
        //   key: 'id'
        }, {
          title: '存货编码',
          key: 'labelNum'
        }, {
          title: '标签',
          key: 'packId'
        }, {
          title: '订单号',
          key: 'orderNo'
        }, {
          title: '产品',
          key: 'productName'
        }, {
          title: '型号',
          key: 'modelName'
        }, {
          title: '存储状态',
          key: 'status'
        }, {
          title: '生产日期',
          key: 'prodTime',
          render: (h, { row }) => {
            return h('Time', {
              props: {
                time: parseInt(row.prodTime),
                type: 'datetime'
              }
            })
          }
        // }, {
        //   title: '入库日期',
        //   key: 'inTime'
        // }, {
        //   title: '出库日期',
        //   key: 'outTime'
        // }, {
        //   title: '作废日期',
        //   key: 'invalidTime'
        // }, {
        //   title: '标签类型：0：产品标签 1：打包标签',
        //   key: 'labelType'
        // }, {
        //   title: '净重',
        //   key: 'netWeight'
        // }, {
        //   title: '毛重',
        //   key: 'grossWeight'
        // }, {
        //   title: '皮重',
        //   key: 'skinWeight'
        // }, {
        //   title: '生产人id',
        //   key: 'prodUser'
        // }, {
        //   title: '入库人id',
        //   key: 'inUser'
        // }, {
        //   title: '出库人id',
        //   key: 'outUser'
        // }, {
        //   title: '作废人id',
        //   key: 'invalidUser'
        // }, {
        //   title: '记录类型 0：生成 1：导入',
        //   key: 'recordType'
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['detail']
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
    },
    async detail (item) {
      const _f = clone(detailForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
      this.currentId = item.row.id + ''
    },
    async remove (item) {
    },
    onshowStatusChange (val) {
      this.addModel = val
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
