<template>
  <Card>
    <H1>产品：《 {{ this.productName }} 》</H1>
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
            dataUrl='modelApi/page'
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
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import addForm from './form/add-model-form'
import editForm from './form/edit-model-form'
import detailForm from './form/detail-model-form'
import searchFormData from './form/search-model-form'
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
      createUrl: 'modelApi/add',
      updateUrl: 'modelApi/update',
      deleteUrl: 'modelApi/delete',
      detailUrl: 'modelApi/detail',
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
          width: 50,
          align: 'center'
          // }, {
          //   title: 'ID',
          //   key: 'id'
          // }, {
          //   title: '产品id（当启用产品分类时必填）',
          //   key: 'pid'
        }, {
          title: '型号名称',
          key: 'name'
          // }, {
          //   title: '米数',
          //   key: 'longs'
          // }, {
          //   title: '宽度',
          //   key: 'width'
          // }, {
          //   title: '高度',
          //   key: 'height'
          // }, {
          //   title: '斤数',
          //   key: 'weight'
        }, {
          title: '材质',
          key: 'longUnit'
        }, {
          title: '纹路',
          key: 'widthUnit'
        }, {
          title: '规格值',
          key: 'heightUnit'
        }, {
          title: '规格',
          key: 'weightUnit'
        }, {
          title: '颜色',
          key: 'color'
        }, {
          title: '备注',
          key: 'remark'
        }, {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 130,
          options: ['delete', 'edit', 'detail']
        }
      ]
    }
  },
  props: {
    productId: Number,
    productName: String
  },
  watch: {
    productId (val) {
      this.getTableData()
    }
  },
  methods: {
    async add () {
      let _f = clone(addForm)
      _f = [{
        type: 'input',
        title: '产品ID',
        field: 'pid',
        value: this.productId,
        props: {
          hidden: true
        }
      }].concat(_f)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
    },
    async edit (item) {
      let _f = clone(editForm)
      _f = [{
        type: 'input',
        title: '产品ID',
        field: 'pid',
        value: this.productId,
        props: {
          hidden: true
        }
      }].concat(_f)
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
      this.$refs['table'].getData({ pid: this.productId })
    }
  },
  mounted () {
    this.searchForm = searchFormData
  }
}
</script>
