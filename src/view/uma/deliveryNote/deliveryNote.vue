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
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            dataUrl='system/user'
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
import addForm from './form/add-DeliveryNote-form'
import editForm from './form/edit-DeliveryNote-form'
import detailForm from './form/detail-DeliveryNote-form'
import searchFormData from './form/search-DeliveryNote-form'
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
      detailUrl: 'detail.lgmn.com',
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
        }
        , {
          title: '${column.comment}',
          key: 'id'
        }
        , {
          title: '客户名称',
          key: 'customer'
        }
        , {
          title: '联系人',
          key: 'contact'
        }
        , {
          title: '地址',
          key: 'address'
        }
        , {
          title: '联系电话',
          key: 'phone'
        }
        , {
          title: '送货单号',
          key: 'deliveryNum'
        }
        , {
          title: '司机',
          key: 'driver'
        }
        , {
          title: '车牌号',
          key: 'carNum'
        }
        , {
          title: '开单时间',
          key: 'createTime'
        }
        , {
          title: '开单人',
          key: 'createUser'
        }
        , {
          title: '备注',
          key: 'remark'
        }
        , {
          title: '仓管',
          key: 'store'
        }
        , {
          title: '收货人',
          key: 'revicer'
        }
        , {
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
    },
    async detail (item) {
      const _f = clone(detailForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
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