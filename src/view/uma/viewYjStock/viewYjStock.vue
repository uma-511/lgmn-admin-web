<template>
  <Card>
    <SearchYJStock :names="nameList"
                   :specses="specsList"
                   :widths="widthList"
                   :colors="colorList"
                   @on-search-click="search"></SearchYJStock>
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
            dataUrl='/viewYjStockApi/page'
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
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import { PostWithAuth } from '@/api/global'
import searchFormData from './form/search-viewYjStock-form'
import SearchYJStock from './searchYJStock'
export default {
  components: {
    Tables,
    DynamicForm,
    SearchYJStock
  },
  data () {
    return {
      nameList: [{ id: 0, value: '' }],
      specsList: [{ id: 0, value: '' }],
      widthList: [{ id: 0, value: '' }],
      floorList: [{ id: 0, value: '' }],
      colorList: [{ id: 0, value: '' }],
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
        }, {
          title: '名称',
          key: 'name'
        }, {
          title: '规格',
          key: 'specs'
        }, {
          title: '宽度',
          key: 'width'
        }, {
          title: '颜色',
          key: 'color'
        }, {
          title: '库存',
          key: 'stock'
        }
      ]
    }
  },
  methods: {
    async add () {
    },
    async edit (item) {
    },
    async detail (item) {
    },
    async remove (item) {
    },
    onshowStatusChange (val) {
    },
    getConfigList () {
      PostWithAuth('umaConfigApi/group', {}).then(res => {
        if (res.data.code === '200') {
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
    search (data) {
      this.$refs['table'].getData(data)
    }
  },
  mounted () {
    this.searchForm = searchFormData
    this.getConfigList()
  }
}
</script>
