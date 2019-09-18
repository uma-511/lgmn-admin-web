<template>
  <Card>
    <Row>
      <Col span="6"
           offset="18">流水号：{{deliveryNote.deliveryNum}}</Col>
    </Row>
    <Row>
      <Col span="6">客户：{{this.customer.name}}</Col>
      <Col span="6">联系人：{{this.customer.contacts}}</Col>
      <Col span="6">联系电话：{{this.customer.phone}}</Col>
      <Col span="6">制单人：{{this.deliveryNote.createUser}}</Col>
    </Row>
    <Row>
      <Col span="6">联系地址：{{this.customer.logisticsAddress}}</Col>
      <Col span="6"
           offset="6">制单时间：{{createDate}}</Col>
      </Col>
    </Row>
    <Table border
           editable
           ref="table"
           search-place="top"
           :columns='columns'
           :data='tableData'
           size='small'
           :height='tableHeight'></Table>
    <Row>
      <Col span="6"
           offset="18">合计：{{totalPrice}}</Col>
    </Row>
  </Card>
</template>

<script>
// import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import { PostWithAuth } from '@/api/global'
// import addForm from './form/add-deliveryList-form'
// import editForm from './form/edit-deliveryList-form'
// import detailForm from './form/detail-deliveryList-form'
// import searchFormData from './form/search-deliveryList-form'
export default {
  components: {
    Tables,
    DynamicForm
  },
  data () {
    // var vue = this
    return {
      addModel: false,
      unitPrice: 0,
      totalPrice: 0,
      formData: [],
      createUrl: 'deliveryListApi/add',
      updateUrl: 'deliveryListApi/update',
      deleteUrl: 'deliveryListApi/delete',
      detailUrl: 'deliveryListApi/detail',
      dataUrl: 'deliveryNoteApi/detail',
      formStatus: 'add',
      tableData: [],
      currId: '',
      customer: {
        logisticsAddress: '',
        name: '',
        phone: '',
        contacts: ''
      },
      deliveryNote: {
        deliveryNum: '12345678',
        createUser: '',
        createTime: ''
      },
      createDate: '',
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      columns: [
        {
          // title: '序号',
          // type: 'index',
          // width: 70,
          // align: 'center'
          // } ,{
          //   title: '${column.comment}',
          //   key: 'id'
          // } ,{
          //   title: '${column.comment}',
          //   key: 'deliveryId'
          // } ,{
          //   title: '${column.comment}',
          //   key: 'clientId'
          // } ,{
          //   title: '${column.comment}',
          //   key: 'clientName'
          // }, {
          title: '编号',
          key: 'number'
        }, {
          title: '名称',
          key: 'name'
        }, {
          title: '宽度',
          key: 'width'
        }, {
          title: '规格',
          key: 'specs'
        }, {
          title: '颜色',
          key: 'color'
          // } ,{
          //   title: '工艺要求',
          //   key: 'requirement'
        }, {
          title: '卷数',
          key: 'quantity'
        }, {
          title: '件数',
          key: 'scanQuantity'
          // } ,{
          //   title: '剩余数量',
          //   key: 'residualQuantity'
        }, {
          title: '单价',
          key: 'unitPrice',
          render: (h, param) => {
            let vue = this
            return h('InputNumber', {
              props: {
                value: param.row.unitPrice,
                ref: 'unitPrice',
                'active-change': true,
                min: 1,
                step: 0.01
              },
              on: {
                'on-focus': () => {
                  vue.unitPrice = param.row.unitPrice
                },
                'on-change': (val) => {
                  vue.unitPrice = val
                },
                'on-blur': () => {
                  vue.updatePrice(param)
                }
              }
            })
          }
        }, {
          title: '金额',
          key: 'totalPrice'
        }
        // , {
        //   key: 'handle',
        //   renderHeader (h, { column, index }) {
        //     return h('span', vue.$t('option'))
        //   },
        //   width: 200,
        //   options: ['delete', 'edit', 'detail']
        // }
      ]
    }
  },
  watch: {
    currentId (val) {
      this.currId = val
      this.getData()
    }
  },
  props: {
    value: Boolean,
    currentId: String | Number
  },
  methods: {
    async add () {
      // const _f = clone(addForm)
      // this.addModel = true
      // this.formData = _f
      // this.formStatus = 'add'
    },
    async edit (item) {
      // const _f = clone(editForm)
      // this.addModel = true
      // this.formData = _f
      // this.formStatus = 'edit'
    },
    async detail (item) {
      // const _f = clone(detailForm)
      // this.addModel = true
      // this.formData = _f
      // this.formStatus = 'detail'
    },
    async remove (item) {
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    updatePrice (param) {
      param.row.unitPrice = this.unitPrice
      // param.row.totalPrice = param.row.unitPrice * param.row.quantity
      PostWithAuth(this.updateUrl, param.row).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('修改单价成功')
          this.getData()
        } else {
          this.$Message.error('修改单价失败')
        }
      })
    },
    getData () {
      if (this.currId && this.currId !== '' && this.currId !== '0') {
        PostWithAuth(this.dataUrl + '/' + this.currId, this.formInline).then(res => {
          if (res.data.code === '200') {
            const data = res.data.data
            this.customer = data.customer
            this.deliveryNote = data.deliveryNote
            this.tableData = data.deliveryList
            this.createDate = data.createDate
            this.totalPrice = data.totalPrice
          } else {
            this.$Message.error('获取详情失败')
          }
        })
      }
    },
    computTotalPrice (data) {
      let totalPrice = 0
      data.forEach((item, index) => {
        totalPrice = totalPrice + item.totalPrice
      })
      this.totalPrice = totalPrice
    }
  },
  mounted () {
    // this.searchForm = searchFormData
  }
}
</script>
