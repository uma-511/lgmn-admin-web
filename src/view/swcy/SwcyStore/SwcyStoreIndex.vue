<template>
  <Card>
    <SwcyStoreAddForm @on-add-click="add"
                   @on-search-click="search">
    </SwcyStoreAddForm>
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
            :addable="true"
            :searchable="true"
            :searchForm="searchForm"
            :dataUrl='queryUrl'
            size='small'
            :height='tableHeight'></tables>
            <SwcyStoreAddForm v-model="addModel"
                :saveUrl='createUrl'
                @on-added="onAdded"
                @on-value-change="onAddStatusChange">
            </SwcyStoreAddForm>
            <SwcyStoreEditForm v-model="editModel"
                :editUrl='updateUrl'
                :detailUrl='detailUrl'
                :currentId="currentId"
                @on-added="onAdded"
                @on-value-change="onEditStatusChange">
            </SwcyStoreEditForm>
            <SwcyStoreDetailForm v-model="detailModel"
                :detailUrl='detailUrl'
                :currentId="currentId">
            </SwcyStoreDetailForm>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import { PostWithAuth } from '@/api/global'
import Tables from '_c/tables'
import SwcyStoreAddForm from './SwcyStoreAddForm'
import SwcyStoreEditForm from './SwcyStoreEditForm'
import SwcyStoreDetailForm from './SwcyStoreDetailForm'
import SwcyStoreSearchForm from './SwcyStoreSearchForm'

export default {
  components: {
    Tables,
    SwcyStoreAddForm,
    SwcyStoreEditForm,
    SwcyStoreDetailForm,
    SwcyStoreSearchForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      editModel: false,
      detailModel: false,
      formData: [],
      createUrl: 'swcyStoreApi/add',
      updateUrl: 'swcyStoreApi/update',
      deleteUrl: 'swcyStoreApi/delete',
      detailUrl: 'swcyStoreApi/detail',
      queryUrl: 'swcyStoreApi/page',
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
          title: '',
          key: 'id'
        },
        {
          title: '用户id',
          key: 'uid'
        },
        {
          title: '品牌id',
          key: 'brandId'
        },
        {
          title: '共享商名称',
          key: 'name'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '纬度',
          key: 'lat'
        },
        {
          title: '经度',
          key: 'lng'
        },
        {
          title: '行业id',
          key: 'industryId'
        },
        {
          title: '省id',
          key: 'provinceId'
        },
        {
          title: '市id',
          key: 'cityId'
        },
        {
          title: '区id',
          key: 'areaId'
        },
        {
          title: '点赞量',
          key: 'likeVolume'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '商店图片',
          key: 'photo'
        },
        {
          title: '',
          key: 'desc'
        },
        {
          title: '行业名称',
          key: 'industryName'
        },
        {
          title: '省份',
          key: 'provinceName'
        },
        {
          title: '城市',
          key: 'cityName'
        },
        {
          title: '区县',
          key: 'areaName'
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
    }
  },
  mounted () {
  }
}
</script>
