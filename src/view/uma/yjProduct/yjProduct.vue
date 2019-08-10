<template>
  <Card>
    <tables border
            editable
            search-place="top"
            ref='table'
            :columns='columns'
            v-model='tableData'
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            @on-add-click="add"
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            :dataUrl='dataUrl'
            :queryOrders='orders'
            size='small'
            :height='tableHeight'></tables>
    <AddYJProductForm v-bind:value='addModel'
                      :width='600'
                      @on-added="onAdded"
                      @on-value-change="onAddStatusChange"></AddYJProductForm>
    <EditYJProductForm v-bind:value='editModel'
                       :width='600'
                       :currentId='currentId'
                       @on-added="onAdded"
                       @on-value-change="onEditStatusChange"></EditYJProductForm>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import { PostWithAuth } from '@/api/global'
import { getDateStr } from '@/libs/tools'
import DynamicForm from '_c/dynamic-form'
import searchForm from './form/search-yjProduct-form'
import AddYJProductForm from './addYJProductForm'
import EditYJProductForm from './editYJProductForm'
export default {
  components: {
    Tables,
    DynamicForm,
    AddYJProductForm,
    EditYJProductForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      editModel: false,
      formData: [],
      createUrl: 'create.lgmn.com',
      updateUrl: 'update.lgmn.com',
      deleteUrl: 'yjProductApi/delete',
      detailUrl: 'detail.lgmn.com',
      dataUrl: 'yjProductApi/page',
      currentId: '',
      tableData: [],
      searchForm: [],
      orders: [{ property: 'createTime', direction: 'DESC' }],
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
          title: '编号',
          key: 'num'
        }, {
          title: '名称',
          key: 'name'
        }, {
          title: '规格',
          key: 'specs'
        }, {
          title: '颜色',
          key: 'str1'
        }, {
          title: '宽度',
          key: 'width'
        }, {
          title: '创建人',
          key: 'createUserName'
        }, {
          title: '创建时间',
          key: 'createTime',
          render: (h, { row }) => {
            const createTime = row.createTime
            return h('div', getDateStr(createTime, 'date'))
          }
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 120,
          options: ['delete', 'edit']
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
          this.$Message.success('删除成功')
          this.onAdded()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onAdded () {
      this.$refs['table'].getData()
    },
    onAddStatusChange (val) {
      this.addModel = val
    },
    onEditStatusChange (val) {
      this.editModel = val
    }
  },
  mounted () {
    this.searchForm = searchForm
  }
}
</script>
