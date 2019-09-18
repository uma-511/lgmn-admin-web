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
            :addable="false"
            :searchable="false"
            :searchForm="searchForm"
            :queryOrders="orders"
            dataUrl='deliveryNoteApi/remindpage'
            size='small'
            :height='tableHeight'></tables>
    <Modal v-model="showModal"
           fullscreen
           title="出库单详情">
      <DeliveryList ref="deliveryList"
                    :currentId="currentId"></DeliveryList>
      <p slot="footer">
      </p>
    </Modal>
  </Card>
</template>

<script>
// import { clone } from '@/libs/tools'
import { PostWithAuth, excel } from '@/api/global'
import { getDateStr } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
// import addForm from './form/add-deliveryNote-form'
// import editForm from './form/edit-deliveryNote-form'
// import detailForm from './form/detail-deliveryNote-form'
// import searchFormData from './form/search-deliveryNote-form'
import DeliveryList from '../deliveryList/deliveryList'
export default {
  components: {
    Tables,
    DynamicForm,
    DeliveryList
  },
  data () {
    var vue = this
    return {
      addModel: false,
      editModel: false,
      showModal: false,
      formData: [],
      createUrl: 'deliveryNoteApi/add',
      updateUrl: 'deliveryNoteApi/update',
      deleteUrl: 'deliveryNoteApi/delete',
      detailUrl: 'deliveryNoteApi/detail',
      exportUrl: 'deliveryNoteApi/excel',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      orders: [{ property: 'createTime', direction: 'DESC' }],
      clientList: [{ id: 0, name: '' }],
      currentRecord: {},
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
          title: '送货单号',
          key: 'deliveryNum'
        }, {
          title: '客户名称',
          key: 'customer'
          // }, {
          //   title: '联系人',
          //   key: 'contact'
          // }, {
          //   title: '地址',
          //   key: 'address'
          // }, {
          //   title: '联系电话',
          //   key: 'phone'

          // }, {
          //   title: '司机',
          //   key: 'driver'
          // }, {
          //   title: '车牌号',
          //   key: 'carNum'
        }, {
          title: '开单时间',
          key: 'createTime',
          render: (h, { row }) => {
            const ts = row.createTime
            return h('div', getDateStr(ts, 'year'))
          }
        }, {
          title: '汇款日期',
          key: 'paymentTime',
          width: 100,
          render: (h, { row }) => {
            const ts = row.paymentTime
            return h('div', getDateStr(ts, 'date'))
          }
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          options: ['detail'],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.payConfirm(params.row)
                  }
                }
              }, '确认回款')
            }
          ]
        }
      ]
    }
  },
  methods: {
    async add () {
      // const _f = clone(addForm)
      this.addModel = true
      // this.formData = _f
      this.formStatus = 'add'
    },
    async edit (item) {
      if (item.row.printed === 0) {
        this.editModel = true
        this.currentId = item.row.id + ''
      } else {
        this.$Message.warning('送货单完成，不能编辑')
      }
    },
    async detail (item) {
      this.currentRecord = item.row
      this.currentId = item.row.id + ''
      this.showModal = true
      this.$refs['deliveryList'].getData()
    },
    async remove (item) {
      const vue = this
      if (item.row.printed === 0) {
        PostWithAuth(vue.deleteUrl + '/' + item.row.id, {}).then(res => {
          if (res.data.code === '200') {
            vue.$Message.success('删除成功')
            vue.getData()
          } else {
            vue.$Message.error('删除失败')
          }
        })
      } else {
        vue.$Message.warning('送货单已完成，不能删除')
      }
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    getData () {
      this.$refs['table'].getData()
    },
    onAddStatusChange (val) {
      this.addModel = val
    },
    onAdded () {
      this.currentId = '0'
      this.$refs['table'].getData()
    },
    onEditStatusChange (val) {
      this.editModel = val
    },
    getClientList () {
      PostWithAuth('customerApi/customerSelectList', {}).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('获取配置成功')
          const data = res.data.data
          this.clientList = data
        } else {
          // this.$Message.error('获取配置失败')
        }
      })
    },
    exportExcel () {
      let vue = this
      excel(this.exportUrl + '/' + this.currentId, {}).then(res => {
        if (res.status === 200) {
          var blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = vue.currentRecord.deliveryNum + '.xls'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
        } else {
          this.$Message.error('导出失败')
        }
      })
    },
    setPrinted (params) {
      let row = params.row
      row.printed = 1
      PostWithAuth(this.updateUrl, row).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('完成出货成功')
          this.getData()
        } else {
          this.$Message.error('完成出货失败')
        }
      })
    },
    payConfirm (val) {
      PostWithAuth('deliveryNoteApi/payConfirm/' + val.id, {}).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('删除成功')
          this.onAdded()
        } else {
          this.$Message.error('回款确认失败')
        }
      })
    }
  },
  mounted () {
    // this.searchForm = searchFormData
    // this.getClientList()
  }
}
</script>
