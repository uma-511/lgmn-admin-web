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
    // var vue = this
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
          title: '条形号',
          key: 'labelNum'
        }, {
          title: '订单号',
          key: 'orderNo'
        }, {
          title: '客户',
          key: 'customerName'
        }, {
          title: '型号',
          key: 'modelName'
        }, {
          title: '产品编号',
          key: 'productName'
        }, {
          title: '型号',
          key: 'modelName'
        }, {
          title: '规格',
          key: 'specs'
        }, {
          title: '色号',
          key: 'color'
        }, {
          title: '卷数',
          key: 'quantity'
        }, {
          title: '质检员',
          key: 'prodAccount'
        }, {
          title: '机台号',
          key: 'machineNum'
        }, {
          title: '流水号',
          key: 'packId'
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
        }, {
          title: '存储状态',
          key: 'status',
          render: (h, { row }) => {
            var statusStr = ''
            switch (row.status) {
              case 0:
                statusStr = '待进仓'
                break
              case 1:
                statusStr = '已进仓'
                break
              case 2:
                statusStr = '已出仓'
                break
              default:
                statusStr = '已作废'
            }
            return h('div', statusStr)
          }
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
    },
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row'
      } else if (index === 3) {
        return 'demo-table-error-row'
      }
      return ''
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
<style>
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
