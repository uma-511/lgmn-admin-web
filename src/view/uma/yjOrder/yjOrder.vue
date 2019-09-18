<template>
  <Card>
    <SearchYJOrder :clients="clientList"
                   :names="nameList"
                   :specses="specsList"
                   :widths="widthList"
                   :floors="floorList"
                   :colors="colorList"
                   :labels="labelList"
                   :numbers="numberList"
                   @on-add-click="add"
                   @on-search-click="search"></SearchYJOrder>
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
            :dataUrl='dataUrl'
            :queryOrders='orders'
            size='small'
            :height='tableHeight'></tables>
    <AddYJOrder v-model="addModel"
                :clients="clientList"
                :names="nameList"
                :specses="specsList"
                :widths="widthList"
                :floors="floorList"
                :colors="colorList"
                :labels="labelList"
                :numbers="numberList"
                :width='600'
                @on-added="onAdded"
                @on-value-change="onAddStatusChange"></AddYJOrder>

    <EditYJOrder v-model="editModel"
                 :clients="clientList"
                 :names="nameList"
                 :specses="specsList"
                 :widths="widthList"
                 :floors="floorList"
                 :colors="colorList"
                 :labels="labelList"
                 :numbers="numberList"
                 :width='600'
                 :currentId="currentId"
                 @on-added="onAdded"
                 @on-value-change="onEditStatusChange"></EditYJOrder>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import { PostWithAuth, excel } from '@/api/global'
import { getDateStr } from '@/libs/tools'
import searchFormData from './form/search-yjOrder-form'
import AddYJOrder from './addYJOrder'
import EditYJOrder from './editYJOrder'
import SearchYJOrder from './searchYJOrder'
export default {
  components: {
    Tables,
    AddYJOrder,
    EditYJOrder,
    SearchYJOrder
  },
  data () {
    var vue = this
    return {
      addModel: false,
      editModel: false,
      formData: [],
      createUrl: 'create.lgmn.com',
      updateUrl: 'update.lgmn.com',
      deleteUrl: 'yjOrderApi/delete',
      detailUrl: 'detail.lgmn.com',
      dataUrl: 'yjOrderApi/page',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      totalCount: 0,
      orders: [{ property: 'createTime', direction: 'DESC' }],
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      clientList: [{ id: 0, name: '' }],
      nameList: [{ id: 0, value: '' }],
      specsList: [{ id: 0, value: '' }],
      widthList: [{ id: 0, value: '' }],
      floorList: [{ id: 0, value: '' }],
      colorList: [{ id: 0, value: '' }],
      labelList: [{ id: 0, name: '' }],
      numberList: [{ id: 0, num: '' }],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '订单编号',
          key: 'orderNum',
          width: 100
        }, {
          title: '编号',
          key: 'number',
          width: 100
        }, {
          title: '名称',
          key: 'name',
          width: 100
        }, {
          title: '规格',
          key: 'specs',
          width: 100
        }, {
          title: '宽度',
          key: 'width',
          width: 100
        }, {
          title: '颜色',
          key: 'color',
          width: 100
        }, {
          title: '标签模板',
          key: 'labelName',
          width: 150
        }, {
          title: '计划数量',
          key: 'plannedQuantity',
          width: 100
        }, {
          title: '每包饼数',
          key: 'perPackQuantity',
          width: 100
        }, {
          title: '交货日期',
          key: 'deliveryDate',
          width: 100,
          render: (h, { row }) => {
            const ts = row.deliveryDate
            return h('div', getDateStr(ts, 'date'))
          }
        }, {
          title: '客户名称',
          key: 'clientName',
          width: 100
        }, {
          title: '楼层',
          key: 'floor',
          width: 100
        }, {
          title: '工艺要求',
          key: 'requirement',
          width: 300
        }, {
          title: '预警天数',
          key: 'alertDay',
          width: 100
        }, {
          title: '看板显示阈值',
          key: 'lookboardThreshold',
          width: 100
        }, {
          title: '备注',
          key: 'remark',
          width: 300
        }, {
          title: '制单人',
          key: 'createUser',
          width: 100
        }, {
          title: '制单日期',
          key: 'createTime',
          width: 100,
          render: (h, { row }) => {
            const createTime = row.createTime
            return h('div', getDateStr(createTime, 'date'))
          }
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit'],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.exportDataHandler(params.row)
                  }
                }
              }, '导出数据')
            }
          ]
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
      this.currentId = item.row.id
    },
    async detail (item) {

    },
    async remove (item) {
      PostWithAuth(this.deleteUrl + '/' + item.row.id, {}).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('删除成功')
          this.onAdded()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    onAdded () {
      this.$refs['table'].getData()
    },
    onAddStatusChange (val) {
      this.addModel = val
    },
    onEditStatusChange (val) {
      this.editModel = val
    },
    search (data) {
      console.log(data)
      this.$refs['table'].getData(data)
    },
    getConfigList () {
      PostWithAuth('umaConfigApi/group', {}).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('获取配置成功')
          const configs = res.data.data.configs
          this.nameList = configs['0001']
          this.specsList = configs['0003']
          this.widthList = configs['0002']
          this.floorList = configs['0005']
          this.colorList = configs['0004']
        } else {
          this.$Message.error('获取配置失败')
        }
      })
    },
    getClientList () {
      // PostWithAuth('customerApi/customerSelectList', {}).then(res => {
      //   if (res.data.code === '200') {
      //     // this.$Message.success('获取配置成功')
      //     const data = res.data.data
      //     this.clientList = data
      //   } else {
      //     this.$Message.error('获取配置失败')
      //   }
      // })
    },
    getProductList () {
      // PostWithAuth('yjProductApi/productSelectList', {}).then(res => {
      //   if (res.data.code === '200') {
      //     // this.$Message.success('获取编号成功')
      //     const data = res.data.data
      //     this.numberList = data
      //   } else {
      //     this.$Message.error('获取编号失败')
      //   }
      // })
    },
    getLabelFormatList () {
      PostWithAuth('labelFormatApi/labelformatSelectList', {}).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('获取标签模板成功')
          const data = res.data.data
          this.labelList = data
        } else {
          this.$Message.error('获取标签模板失败')
        }
      })
    },
    exportDataHandler (val) {
      excel('yjOrderApi/exportData/' + val.id).then(res => {
        if (res.status === 200) {
          var blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = val.clientName + '_' + val.orderNum + '.xls'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
        } else {
          this.$Message.error('导出失败')
        }
      })
    }
  },
  mounted () {
    this.searchForm = searchFormData
    this.getConfigList()
    this.getClientList()
    this.getProductList()
    this.getLabelFormatList()
  }
}
</script>
