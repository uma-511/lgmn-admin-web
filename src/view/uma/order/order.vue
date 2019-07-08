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
import addForm from './form/add-Order-form'
import editForm from './form/edit-Order-form'
import detailForm from './form/detail-Order-form'
import searchFormData from './form/search-Order-form'
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
          title: '${column.comment}',
          key: 'orderNo'
        }
        , {
          title: '产品id',
          key: 'prodId'
        }
        , {
          title: '型号id',
          key: 'modelId'
        }
        , {
          title: '客户id',
          key: 'clientId'
        }
        , {
          title: '工艺要求',
          key: 'requirement'
        }
        , {
          title: '备注',
          key: 'remark'
        }
        , {
          title: '标签id',
          key: 'lableId'
        }
        , {
          title: '订单创建时间',
          key: 'createTime'
        }
        , {
          title: '订单创建人',
          key: 'createUser'
        }
        , {
          title: '交货时间',
          key: 'deliveryDate'
        }
        , {
          title: '数量',
          key: 'quantity'
        }
        , {
          title: '保留int1',
          key: 'int1'
        }
        , {
          title: '保留int2',
          key: 'int2'
        }
        , {
          title: '保留int3',
          key: 'int3'
        }
        , {
          title: '保留int4',
          key: 'int4'
        }
        , {
          title: '保留int5',
          key: 'int5'
        }
        , {
          title: '保留varchar(50)1',
          key: 'var501'
        }
        , {
          title: '保留varchar(50)2',
          key: 'var502'
        }
        , {
          title: '保留varchar(50)3',
          key: 'var503'
        }
        , {
          title: '保留varchar(50)4',
          key: 'var504'
        }
        , {
          title: '保留varchar(50)5',
          key: 'var505'
        }
        , {
          title: '保留varchar(100)1',
          key: 'var1001'
        }
        , {
          title: '保留varchar(100)2',
          key: 'var1002'
        }
        , {
          title: '保留varchar(100)3',
          key: 'var1003'
        }
        , {
          title: '保留varchar(100)4',
          key: 'var1004'
        }
        , {
          title: '保留varchar(100)5',
          key: 'var1005'
        }
        , {
          title: '保留varchar(200)1',
          key: 'var2001'
        }
        , {
          title: '保留varchar(200)2',
          key: 'var2002'
        }
        , {
          title: '保留varchar(200)3',
          key: 'var2003'
        }
        , {
          title: '保留varchar(200)4',
          key: 'var2004'
        }
        , {
          title: '保留varchar(200)5',
          key: 'var2005'
        }
        , {
          title: '保留datetime1',
          key: 'datetime1'
        }
        , {
          title: '保留datetime2',
          key: 'datetime2'
        }
        , {
          title: '保留decimal(10,2)1',
          key: 'decimal1021'
        }
        , {
          title: '保留decimal(10,2)2',
          key: 'decimal1022'
        }
        , {
          title: '保留decimal(10,2)3',
          key: 'decimal1023'
        }
        , {
          title: '保留decimal(10,2)4',
          key: 'decimal1024'
        }
        , {
          title: '保留decimal(11,3)1',
          key: 'decimal1131'
        }
        , {
          title: '保留decimal(11,3)2',
          key: 'decimal1132'
        }
        , {
          title: '保留decimal(11,3)3',
          key: 'decimal1133'
        }
        , {
          title: '保留decimal(11,3)4',
          key: 'decimal1134'
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