<template>
  <Card>
    <ViewOrderReminderAddForm @on-add-click="add"
                              @on-search-click="search">
    </ViewOrderReminderAddForm>
    <tables border
            editable
            search-place="top"
            :columns='columns'
            v-model='tableData'
            ref="table"
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            @on-add-click="add"
            :addable="false"
            :searchable="false"
            :searchForm="searchForm"
            :dataUrl='queryUrl'
            size='small'
            :height='tableHeight'></tables>
    <ViewOrderReminderAddForm v-model="addModel"
                              :saveUrl='createUrl'
                              @on-added="onAdded"
                              @on-value-change="onAddStatusChange">
    </ViewOrderReminderAddForm>
    <ViewOrderReminderEditForm v-model="editModel"
                               :editUrl='updateUrl'
                               :detailUrl='detailUrl'
                               :currentId="currentId"
                               @on-added="onAdded"
                               @on-value-change="onEditStatusChange">
    </ViewOrderReminderEditForm>
    <ViewOrderReminderDetailForm v-model="detailModel"
                                 :detailUrl='detailUrl'
                                 :currentId="currentId">
    </ViewOrderReminderDetailForm>
  </Card>
</template>

<script>
import { clone, getDateStr } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import ViewOrderReminderAddForm from './ViewOrderReminderAddForm'
import ViewOrderReminderEditForm from './ViewOrderReminderEditForm'
import ViewOrderReminderDetailForm from './ViewOrderReminderDetailForm'
import ViewOrderReminderSearchForm from './ViewOrderReminderSearchForm'

export default {
  components: {
    Tables,
    ViewOrderReminderAddForm,
    ViewOrderReminderEditForm,
    ViewOrderReminderDetailForm,
    ViewOrderReminderSearchForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      editModel: false,
      detailModel: false,
      formData: [],
      createUrl: 'viewOrderReminderApi/add',
      updateUrl: 'viewOrderReminderApi/update',
      deleteUrl: 'viewOrderReminderApi/delete',
      detailUrl: 'viewOrderReminderApi/detail',
      queryUrl: 'viewOrderReminderApi/page',
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
        },
        {
          title: '客户名称',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '最近落单日期',
          key: 'createTime',
          render: (h, { row }) => {
            const ts = row.createTime
            return h('div', getDateStr(ts, 'date'))
          }
        },
        {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: [],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.unreminder(params.row)
                  }
                }
              }, '取消提醒')
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
    unreminder (val) {
      PostWithAuth('customerApi/unreminder/' + val.id, {}).then(res => {
        let message = res.data.message
        if (res.data.code === '200') {
          this.$Message.success(message)
          this.onAdded()
        } else {
          this.$Message.error(message)
        }
      })
    }
  },
  mounted () {
  }
}
</script>
