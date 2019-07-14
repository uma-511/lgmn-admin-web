<template>
  <div>
    <Row>
      <Col span="6">
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
                  dataUrl='productApi/page'
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
                      @on-value-change="onshowStatusChange"
                      @on-submit-success="getTableData"></DynamicForm>
        </Card>
      </Col>
      <Col span="18">
        <Model v-show="modelShow" :productId="productId" :productName="productName"></Model>
      </Col>
    </Row>
  </div>
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-product-form'
import editForm from './form/edit-product-form'
import detailForm from './form/detail-product-form'
import searchFormData from './form/search-product-form'
import Model from '../model/model'
export default {
  components: {
    Tables,
    DynamicForm,
    Model
  },
  data () {
    var vue = this
    return {
      productId: 0,
      productName: '',
      addModel: false,
      modelShow: false,
      formData: [],
      createUrl: 'productApi/add',
      updateUrl: 'productApi/update',
      deleteUrl: 'productApi/delete',
      detailUrl: 'productApi/detail',
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
          title: '产品编号',
          key: 'name'
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 150,
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
                    this.showModelHandler(params.row)
                  }
                }
              }, '查看型号')
            }
          ]
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
          this.getTableData()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    getTableData () {
      this.$refs['table'].getData()
    },
    showModelHandler (row) {
      this.productId = row.id
      this.productName = row.name
      this.modelShow = true
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
