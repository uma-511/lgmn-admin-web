<template>
  <Card>
    <tables border
            editable
            search-place="top"
            :columns='columns'
            @on-edit="edit"
            @on-delete="remove"
            @on-detail="detail"
            @on-add-click="add"
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            dataUrl='user/page'
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
import addUserForm from './form/add-user-form'
import editUserForm from './form/edit-user-form'
import detailUserForm from './form/detail-user-form'
import searchFormData from './form/search-user-form'
export default {
  components: {
    Tables,
    DynamicForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      formData: [],
      createUrl: 'user/add',
      updateUrl: 'user/update',
      deleteUrl: 'user/delete',
      detailUrl: 'user/detail',
      currentId: '',
      formStatus: '',
      tableData: [],
      searchForm: [],
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'id'
        },
        {
          title: '头像',
          key: 'avatar',
          render: (h, params) => {
            return h('div', [
              h('Avatar', {
                props: {
                  shape: 'square',
                  src: params.row.avatar
                }
              })
            ])
          }
        },
        {
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('account'))
          },
          key: 'account'
        },
        {
          title: '昵称',
          key: 'nikeName'
        },
        {
          title: '用户类型',
          key: 'userType'
        },
        {
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
      const _f = clone(addUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
    },
    async edit (item) {
      const _f = clone(editUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'edit'
      this.currentId = item.row.id
    },
    async detail (item) {
      const _f = clone(detailUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
      this.currentId = item.row.id
    },
    async remove (item) {

    },
    onshowStatusChange (val) {
      this.addModel = val
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
