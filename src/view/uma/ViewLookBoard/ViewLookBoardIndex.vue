<template>
  <!-- <ViewLookBoardAddForm @on-add-click="add"
                          @on-search-click="search">
    </ViewLookBoardAddForm> -->
  <tables border
          editable
          ref='table'
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
          :dataUrl='queryUrl'
          :paging='false'
          :height='tableHeight'
          :autoLoad='false'
          :row-class-name="rowClassName"></tables>
  <!-- <ViewLookBoardAddForm v-model="addModel"
                          :saveUrl='createUrl'
                          @on-added="onAdded"
                          @on-value-change="onAddStatusChange">
    </ViewLookBoardAddForm>
    <ViewLookBoardEditForm v-model="editModel"
                           :editUrl='updateUrl'
                           :detailUrl='detailUrl'
                           :currentId="currentId"
                           @on-added="onAdded"
                           @on-value-change="onEditStatusChange">
    </ViewLookBoardEditForm>
    <ViewLookBoardDetailForm v-model="detailModel"
                             :detailUrl='detailUrl'
                             :currentId="currentId">
    </ViewLookBoardDetailForm> -->
</template>

<script>
import { clone, getDateStr } from '@/libs/tools'
import Tables from '_c/tables'
import ViewLookBoardAddForm from './ViewLookBoardAddForm'
import ViewLookBoardEditForm from './ViewLookBoardEditForm'
import ViewLookBoardDetailForm from './ViewLookBoardDetailForm'
import ViewLookBoardSearchForm from './ViewLookBoardSearchForm'

export default {
  components: {
    Tables,
    ViewLookBoardAddForm,
    ViewLookBoardEditForm,
    ViewLookBoardDetailForm,
    ViewLookBoardSearchForm
  },
  data () {
    // var vue = this
    return {
      addModel: false,
      editModel: false,
      detailModel: false,
      formData: [],
      createUrl: 'viewLookBoardApi/add',
      updateUrl: 'viewLookBoardApi/update',
      deleteUrl: 'viewLookBoardApi/delete',
      detailUrl: 'viewLookBoardApi/detail',
      queryUrl: 'viewLookBoardApi/page',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      totalCount: 0,
      criteria: { pageNumber: 0, pageSize: 15 },
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '生产单号',
          key: 'orderNum',
          width: 190
        },
        // {
        //   title: '客户代码',
        //   key: 'customerCode'
        // },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '规格',
          key: 'specs',
          width: 110
        },
        {
          title: '宽度',
          key: 'width',
          width: 110
        },
        {
          title: '颜色',
          key: 'color'
        },
        {
          title: '进度',
          width: 220,
          render: (h, { row }) => {
            return h('div', row.finishedQuantity + '/' + row.plannedQuantity)
          }
        },
        // {
        //   title: '计划数量',
        //   key: 'plannedQuantity'
        // },
        // {
        //   title: '完成数量',
        //   key: 'finishedQuantity'
        // },
        {
          title: '交货日期',
          key: 'deliveryDate',
          width: 110,
          render: (h, { row }) => {
            const createTime = row.deliveryDate
            return h('div', getDateStr(createTime, 'month'))
          }
        },
        {
          title: '制单日期',
          key: 'createTime',
          width: 110,
          render: (h, { row }) => {
            const createTime = row.createTime
            return h('div', getDateStr(createTime, 'month'))
          }
        },
        {
          title: '超出天数',
          key: 'overDate',
          width: 90,
          render: (h, { row }) => {
            const overDate = row.overDate > 0 ? row.overDate : 0
            return h('div', overDate)
          }
        }
      ]
    }
  },
  methods: {
    async add () {
      this.addModel = true
    },
    async edit (item) {
      this.editModel = true
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
    onshowStatusChange (val) {
      this.addModel = val
    },
    search (data) {
      this.$refs['table'].getData(data)
    },
    onAddStatusChange (val) {
      this.addModel = val
    },
    onEditStatusChange (val) {
      this.editModel = val
    },
    onAdded () {
      this.$refs['table'].getData()
    },
    getData () {
      this.$refs['table'].getData(this.criteria)
    },
    rowClassName (row, index) {
      if (row.overDate >= 0) {
        return 'lookboard-error'
      } else if (row.overDate >= -3) {
        return 'lookboard-waring'
      }
      return ''
    }
  },
  mounted () {
    var _this = this
    _this.getData()
    window.setInterval(function () { _this.getData() }, 15000)
    // this.getData()
  }
}
</script>

<style>
.ivu-table td {
  font-size: 25px;
}
.ivu-table th {
  font-size: 25px;
}
.ivu-table .lookboard-error td {
  background-color: #f52d2d;
  color: #fff;
}
.ivu-table .lookboard-waring td {
  background-color: #fbff00;
  color: rgb(0, 0, 0);
}
</style>
