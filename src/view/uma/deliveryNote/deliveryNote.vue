<template>
  <Card>
    <tables
      border=""
      editable
      ref="table"
      search-place="top"
      :columns="columns"
      v-model="tableData"
      @on-edit="edit"
      @on-delete="remove"
      @on-detail="detail"
      @on-add-click="add"
      :addable="true"
      :searchable="true"
      :searchForm="searchForm"
      :queryOrders="orders"
      data-url="deliveryNoteApi/page"
      size="small"
      :height="tableHeight"
    ></tables>
    <!-- <DynamicForm v-bind:value='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 :createUrl='createUrl'
                 :updateUrl='updateUrl'
                 :detailUrl='detailUrl'
                 :currentId='currentId'
                 @on-value-change="onshowStatusChange"
    @on-submit-success="getData"></DynamicForm>-->
    <Modal v-model="showModal" fullscreen title="出库单编辑">
      <p slot="header" style="height:50px;color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>出库单编辑</span>
        <Button type="success" style="margin-left:100px;" @click="exportExcel">导出Excel</Button>
      </p>
      <DeliveryList ref="deliveryList" :currentId="currentId"></DeliveryList>
      <p slot="footer"></p>
    </Modal>
    <AddDeliveryNote
      v-model="addModel"
      :clients="clientList"
      :width="600"
      @on-added="onAdded"
      @on-value-change="onAddStatusChange"
    ></AddDeliveryNote>
    <EditDeliveryNote
      v-model="editModel"
      :clients="clientList"
      :width="600"
      :currentId="currentId"
      @on-added="onAdded"
      @on-value-change="onEditStatusChange"
    ></EditDeliveryNote>
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
import searchFormData from './form/search-deliveryNote-form'
import DeliveryList from '../deliveryList/deliveryList'
import AddDeliveryNote from './addDeliveryNote'
import EditDeliveryNote from './editDeliveryNote'
export default {
  components: {
    Tables,
    DynamicForm,
    DeliveryList,
    AddDeliveryNote,
    EditDeliveryNote
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
        }, {
          title: '开单时间',
          key: 'createTime',
          render: (h, { row }) => {
            const ts = row.createTime
            return h('div', getDateStr(ts, 'year'))
          }
        }, {
          title: '开单人',
          key: 'createUser'
        }, {
          title: '出货状态',
          key: 'printed',
          render: (h, { row }) => {
            const status = row.printed
            const statusName = status === 1 ? '完成' : '出货中'
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
          title: '汇款日期',
          key: 'paymentTime',
          width: 100,
          render: (h, { row }) => {
            const ts = row.paymentTime
            return h('div', getDateStr(ts, 'date'))
          }
        }, {
          title: '是否已回款',
          key: 'hadPaid',
          width: 100,
          render: (h, { row }) => {
            const ts = row.hadPaid === 1 ? '是' : '否'
            const prop = {
              color: row.hadPaid === 1 ? 'success' : 'error'
            }
            return h('Tag',
              {
                props: prop
              },
              ts
            )
          }
        }, {
          title: '确认回款人',
          key: 'payConfirmer',
          width: 100
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit', 'detail'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  title: '你确定完成出货单吗?'
                },
                on: {
                  'on-ok': () => {
                    this.setPrinted(params)
                  }
                }
              }, [h('Button', '完成出货')]
              )
            },
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
    this.searchForm = searchFormData
    this.getClientList()
  }
}
</script>
