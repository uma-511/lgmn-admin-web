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
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            dataUrl='system/user'
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
import addForm from './form/add-Model-form'
import editForm from './form/edit-Model-form'
import detailForm from './form/detail-Model-form'
import searchFormData from './form/search-Model-form'
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
      createUrl: 'create.lgmn.com',
      updateUrl: 'update.lgmn.com',
      deleteUrl: 'delete.lgmn.com',
      detailUrl: 'detail.lgmn.com',
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
        }
        , {
          title: '${column.comment}',
          key: 'id'
        }
        , {
          title: '产品id（当启用产品分类时必填）',
          key: 'pid'
        }
        , {
          title: '产品名称',
          key: 'name'
        }
        , {
          title: '长度',
          key: 'longs'
        }
        , {
          title: '宽度',
          key: 'width'
        }
        , {
          title: '高度',
          key: 'height'
        }
        , {
          title: '重量',
          key: 'weight'
        }
        , {
          title: '长度单位',
          key: 'longUnit'
        }
        , {
          title: '宽度单位',
          key: 'widthUnit'
        }
        , {
          title: '高度单位',
          key: 'heightUnit'
        }
        , {
          title: '重量单位',
          key: 'weightUnit'
        }
        , {
          title: '颜色',
          key: 'color'
        }
        , {
          title: '备注',
          key: 'remark'
        }
        , {
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