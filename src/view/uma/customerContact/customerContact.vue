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
      data-url="customerContactApi/page"
      size="small"
      :height="tableHeight"
    ></tables>
    <DynamicForm
      v-model="addModel"
      :width="600"
      :transfer="false"
      :inner="true"
      :status="formStatus"
      :formData="formData"
      :createUrl="createUrl"
      :updateUrl="updateUrl"
      :detailUrl="detailUrl"
      :currentId="currentId"
      @on-value-change="onshowStatusChange"
      @on-submit-success="getData"
    ></DynamicForm>
    <!-- <MyAddForm :value='myAddForm' @on-value-change="onAddFormStatusChange" @on-added="onAdded"></MyAddForm> -->
  </Card>
</template>

<script>
import { clone, getDateStr } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-customerContact-form'
import editForm from './form/edit-customerContact-form'
import detailForm from './form/detail-customerContact-form'
import searchFormData from './form/search-customerContact-form'
// import MyAddForm from './my_add_form'
export default {
  components: {
    Tables,
    DynamicForm
    // MyAddForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      // myAddForm: false,
      formData: [],
      createUrl: 'customerContactApi/add',
      updateUrl: 'customerContactApi/update',
      deleteUrl: 'customerContactApi/delete',
      detailUrl: 'customerContactApi/detail',
      currentId: '',
      formStatus: 'add',
      tableData: [],
      searchForm: [],
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 530,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
          // }, {
          //   title: 'ID',
          //   key: 'id'
          // }, {
          //   title: '客户id',
          //   key: 'customerId'
        }, {
          title: '联系人姓名',
          key: 'name'
        }, {
          title: '联系电话',
          key: 'phone'
        }, {
          title: '职位',
          key: 'position'
        }, {
          title: '备注',
          key: 'remark'
        }, {
          title: '创建人',
          key: 'createUser'
        }, {
          title: '创建时间',
          key: 'createTime',
          render: (h, { row }) => {
            const createTime = row.createTime
            return h('div', getDateStr(createTime, 'year'))
          }
        }, {
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
  props: {
    id: Number
  },
  watch: {
    id (id) {
      this.loadContactData(id)
    }
  },
  methods: {
    async add () {
      let _f = clone(addForm)
      _f = [{
        type: 'input',
        title: '客户id',
        field: 'customerId',
        value: this.id,
        props: {
          hidden: true
        }
      }].concat(_f)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
      // this.myAddForm = true
    },
    async edit (item) {
      const _f = clone(editForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'edit'
      this.currentId = item.row.id + ''
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
          this.$Message.success('删除成功')
          this.getData()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onAdded () {
      this.$refs['table'].getData()
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    // onAddFormStatusChange (val) {
    //   this.myAddForm = val
    // },
    loadContactData (id) {
      this.$refs['table'].getData({ customerId: id })
    },
    getData () {
      this.$refs['table'].getData()
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
