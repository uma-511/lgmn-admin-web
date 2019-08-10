<template>
  <Card>
    <tables border
            editable
            ref="table"
            search-place="top"
            :columns='columns'
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            @on-add-click="add"
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            :queryOrders='orders'
            dataUrl='customerApi/page'
            size='small'
            :height='tableHeight'></tables>
    <DynamicForm v-model='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 :createUrl='createUrl'
                 :updateUrl='updateUrl'
                 :detailUrl='detailUrl'
                 :currentId='currentId'
                 @on-value-change="onshowStatusChange"
                 @on-add-success="getData"
                 @on-update-success="getData"
                 @on-submit-success="getData"></DynamicForm>
    <Drawer v-model="showContact"
            width='90%'
            :mask-closable="false"
            :title='showContactTitle'>
      <CustomerContact :id='id'></CustomerContact>
    </Drawer>
  </Card>
</template>

<script>
import { clone, getDateStr } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-customer-form'
import editForm from './form/edit-customer-form'
import detailForm from './form/detail-customer-form'
import searchFormData from './form/search-customer-form'
import CustomerContact from '../customerContact/customerContact'
export default {
  components: {
    Tables,
    DynamicForm,
    CustomerContact
  },
  data () {
    var vue = this
    return {
      addModel: false,
      showContact: false,
      showContactTitle: '',
      id: 0,
      formData: [],
      createUrl: 'customerApi/add',
      updateUrl: 'customerApi/update',
      deleteUrl: 'customerApi/delete',
      detailUrl: 'customerApi/detail',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      orders: [{ property: 'createTime', direction: 'DESC' }],
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          //   title: 'ID',
          //   key: 'id'
          // }, {
          title: '客户名称',
          key: 'name'
        }, {
          title: '客户编码',
          key: 'customerCode'
        }, {
          title: '联系电话',
          key: 'phone'
        }, {
          title: '传真',
          key: 'fax'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '客户联系人',
          key: 'contacts'
        }, {
          title: '物流公司',
          key: 'logistics'
        }, {
          title: '物流电话',
          key: 'logisticsPhone'
        }, {
          title: '物流地址',
          key: 'logisticsAddress'
        }, {
          title: '备注',
          key: 'remark'
        }, {
          title: '创建用户',
          key: 'createUser'
        }, {
          type: 'DatePicker',
          title: '创建时间',
          key: 'createTime',
          render: (h, { row }) => {
            const ts = row.createTime
            return h('div', getDateStr(ts, 'date'))
          }
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit', 'detail']
          // ,
          // button: [
          //   (h, params, vm) => {
          //     return h('Button', {
          //       props: {
          //         type: 'success',
          //         size: 'small'
          //       },
          //       on: {
          //         click: () => {
          //           this.showContactHandler(params.row)
          //         }
          //       }
          //     }, '查看联系人')
          //   }
          // ]
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
    getData () {
      this.$refs['table'].getData()
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    showContactHandler (row) {
      this.id = row.id
      this.showContact = true
      this.showContactTitle = '查看联系人《 ' + row.name + ' 》'
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
