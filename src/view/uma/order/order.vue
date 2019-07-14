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
            dataUrl='orderApi/page'
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
                 <MyAddOrderForm :value='myAddOrderForm' :formInline="formInline" @on-value-change="onAddFormStatusChange" @on-added="getTableData"></MyAddOrderForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
// import addForm from './form/add-order-form'
// import editForm from './form/edit-order-form'
import detailForm from './form/detail-order-form'
import searchFormData from './form/search-order-form'
import MyAddOrderForm from './my_add_order_form'
export default {
  components: {
    Tables,
    DynamicForm,
    MyAddOrderForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      myAddOrderForm: false,
      formInline: {},
      formData: [],
      createUrl: 'orderApi/add',
      updateUrl: 'orderApi/update',
      deleteUrl: 'orderApi/delete',
      detailUrl: 'orderApi/detail',
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
          title: '订单号',
          key: 'orderNo'
        }, {
          title: '产品',
          key: 'prodName'
        }, {
          title: '型号',
          key: 'modelName'
        }, {
          title: '客户',
          key: 'clientName'
        }, {
          title: '工艺要求',
          key: 'requirement'
        }, {
          title: '备注',
          key: 'remark'
        }, {
          title: '标签',
          key: 'lableName'
        }, {
          title: '制单时间',
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
          title: '制单员',
          key: 'createUser'
        }, {
          title: '交货时间',
          key: 'deliveryDate',
          render: (h, { row }) => {
            return h('div',
              this.formatDate(new Date(row.deliveryDate), 'yyyy-MM-dd hh:mm')
            )
          }
        }, {
          title: '计划数量',
          key: 'quantity'
        }, {
          title: '楼层',
          key: 'int01'
        }, {
          title: '每包数量',
          key: 'int02'
        }, {
        //   title: '保留int3',
        //   key: 'int3'
        // }, {
        //   title: '保留int4',
        //   key: 'int4'
        // }, {
        //   title: '保留int5',
        //   key: 'int5'
        // }, {
        //   title: '保留varchar(50)1',
        //   key: 'var501'
        // }, {
        //   title: '保留varchar(50)2',
        //   key: 'var502'
        // }, {
        //   title: '保留varchar(50)3',
        //   key: 'var503'
        // }, {
        //   title: '保留varchar(50)4',
        //   key: 'var504'
        // }, {
        //   title: '保留varchar(50)5',
        //   key: 'var505'
        // }, {
        //   title: '保留varchar(100)1',
        //   key: 'var1001'
        // }, {
        //   title: '保留varchar(100)2',
        //   key: 'var1002'
        // }, {
        //   title: '保留varchar(100)3',
        //   key: 'var1003'
        // }, {
        //   title: '保留varchar(100)4',
        //   key: 'var1004'
        // }, {
        //   title: '保留varchar(100)5',
        //   key: 'var1005'
        // }, {
        //   title: '保留varchar(200)1',
        //   key: 'var2001'
        // }, {
        //   title: '保留varchar(200)2',
        //   key: 'var2002'
        // }, {
        //   title: '保留varchar(200)3',
        //   key: 'var2003'
        // }, {
        //   title: '保留varchar(200)4',
        //   key: 'var2004'
        // }, {
        //   title: '保留varchar(200)5',
        //   key: 'var2005'
        // }, {
        //   title: '保留datetime1',
        //   key: 'datetime1'
        // }, {
        //   title: '保留datetime2',
        //   key: 'datetime2'
        // }, {
        //   title: '保留decimal(10,2)1',
        //   key: 'decimal1021'
        // }, {
        //   title: '保留decimal(10,2)2',
        //   key: 'decimal1022'
        // }, {
        //   title: '保留decimal(10,2)3',
        //   key: 'decimal1023'
        // }, {
        //   title: '保留decimal(10,2)4',
        //   key: 'decimal1024'
        // }, {
        //   title: '保留decimal(11,3)1',
        //   key: 'decimal1131'
        // }, {
        //   title: '保留decimal(11,3)2',
        //   key: 'decimal1132'
        // }, {
        //   title: '保留decimal(11,3)3',
        //   key: 'decimal1133'
        // }, {
        //   title: '保留decimal(11,3)4',
        //   key: 'decimal1134'
        // }, {
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
      // const _f = clone(addForm)
      // this.addModel = true
      // this.formData = _f
      // this.formStatus = 'add'
      this.myAddOrderForm = true
      this.formInline = {
        id: '',
        orderNo: '',
        prodId: '',
        modelId: '',
        clientId: '',
        lableId: '',
        requirement: '',
        remark: '',
        quantity: 1,
        deliveryDate: '',
        int01: 1,
        int02: 1
      }
    },
    async edit (item) {
      // const _f = clone(editForm)
      // this.addModel = true
      // this.formData = _f
      // this.formStatus = 'edit'
      // this.currentId = item.row.id + ''
      this.myAddOrderForm = true
      this.formInline = {
        id: item.row.id,
        orderNo: item.row.orderNo,
        prodId: item.row.prodId,
        modelId: item.row.modelId,
        clientId: item.row.clientId,
        lableId: item.row.lableId,
        requirement: item.row.requirement,
        remark: item.row.remark,
        quantity: item.row.quantity,
        deliveryDate: new Date(item.row.deliveryDate),
        int01: item.row.int01,
        int02: item.row.int02
      }
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
          this.getTableData()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    onAddFormStatusChange (val) {
      this.myAddOrderForm = val
    },
    getTableData () {
      this.$refs['table'].getData()
    },
    formatDate (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
