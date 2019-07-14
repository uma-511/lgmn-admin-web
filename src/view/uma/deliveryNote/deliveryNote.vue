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
            dataUrl='deliveryNoteApi/page'
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
                 @on-value-change="onshowStatusChange"
                 @on-submit-success="getData"></DynamicForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-deliveryNote-form'
import editForm from './form/edit-deliveryNote-form'
import detailForm from './form/detail-deliveryNote-form'
import searchFormData from './form/search-deliveryNote-form'
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
      createUrl: 'deliveryNoteApi/add',
      updateUrl: 'deliveryNoteApi/update',
      deleteUrl: 'deliveryNoteApi/delete',
      detailUrl: 'deliveryNoteApi/detail',
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
        //   title: 'ID',
        //   key: 'id'
        }, {
          title: '客户名称',
          key: 'customer'
        }, {
          title: '联系人',
          key: 'contact'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '联系电话',
          key: 'phone'
        }, {
          title: '送货单号',
          key: 'deliveryNum'
        }, {
          title: '司机',
          key: 'driver'
        }, {
          title: '车牌号',
          key: 'carNum'
        }, {
          title: '开单时间',
          key: 'createTime',
          render: (h, { row }) => {
            return h('Time', {
              props: {
                time: parseInt(row.createTime),
                type: 'datetime'
              }
            })
          }
        }, {
          title: '开单人',
          key: 'createUser'
        }, {
          title: '备注',
          key: 'remark'
        }, {
          title: '仓管',
          key: 'store'
        }, {
          title: '收货人',
          key: 'revicer'
        }, {
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
      this.currentId = item.row.id + ''
    },
    async remove (item) {
      PostWithAuth(this.deleteUrl + '/' + item.row.id, {}).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('删除成功')
          this.getData()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    getData () {
      this.$refs['table'].getData()
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
