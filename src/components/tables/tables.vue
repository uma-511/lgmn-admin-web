<template>
  <div>
    <div v-if="searchable && searchPlace === 'top' || addable" class="search-con search-con-top">
      <TablesToolBar v-if="searchable" ref="searchBar" :formData="formDynamic"></TablesToolBar>
      <Button
        @click="handleSearch"
        v-if="searchable"
        class="search-btn"
        type="primary"
        size="small"
        icon="ios-search"
      >搜索</Button>
      <Button
        type="success"
        icon="ios-add"
        size="small"
        v-if="addable"
        @click="onAddClick"
      >{{ $t('add') }}</Button>
      <Button
        type="error"
        icon="ios-de"
        size="small"
        v-if="batchDelete"
        @click="onBatchDeleteClick"
      >{{ $t('batch_delete') }}</Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <Page
      v-if="paging"
      show-total
      show-sizer
      show-elevator
      :total="totalCount"
      :current="postData.pageNumber+1"
      :page-size="postData.pageSize"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    ></Page>
    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <TablesToolBar ref="searchBar" :formData="formDynamic"></TablesToolBar>
      <Button
        @click="handleSearch"
        class="search-btn"
        type="primary"
        size="small"
        icon="ios-search"
      >搜索</Button>
      <Button
        type="success"
        icon="ios-add"
        size="small"
        v-if="addable"
        @click="onAddClick"
      >{{ $t('add') }}</Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import TablesToolBar from './toolbar'
import { PostWithAuth } from '@/api/global'
import './index.less'
export default {
  name: 'Tables',
  components: {
    TablesToolBar
  },
  props: {
    value: {
      type: Array | Object,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    },
    searchForm: {
      type: Array,
      default() {
        return []
      }
    },
    addable: {
      type: Boolean,
      default: false
    },
    dataUrl: {
      type: String,
      default: ''
    },
    batchDelete: {
      type: Boolean,
      default: false
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    batchDeleteUrl: {
      type: String,
      default: ''
    },
    autoLoad: {
      type: Boolean,
      default: true
    },
    paging: {
      type: Boolean,
      default: true
    },
    queryOrders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      formDynamic: [],
      totalCount: 0,
      totalPage: 0,
      postData: {
        pageNumber: 0,
        pageSize: 10
      },
      postOrders: []
    }
  },
  methods: {
    suportEdit(item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle(item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey() {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear(e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch() {
      // this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      let form = this.$refs['searchBar']
      let _postData = this.postData
      form.fApi.submit((formData) => {
        Object.assign(_postData, formData)
        this.getData()
      })
    },
    handleTableData() {
      this.insideTableData = this.value.list.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
      this.totalCount = this.value.count
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect(selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel(selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll(selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange(selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange(column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange(row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick(row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick(row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand(row, status) {
      this.$emit('on-expand', row, status)
    },
    onAddClick() {
      this.$emit('on-add-click')
    },
    onPageChange(pageNumber) {
      this.postData.pageNumber = pageNumber - 1
      this.getData()
    },
    onPageSizeChange(pageSize) {
      this.postData.pageSize = pageSize
      this.getData()
    },
    getData(data) {
      let _postData = this.postData
      _postData.orders = this.queryOrders
      if (data) {
        this.postData.pageNumber = 0
        _postData = {
          pageNumber: this.postData.pageNumber,
          pageSize: this.postData.pageSize
        }
        _postData.orders = this.queryOrders
        Object.assign(_postData, data)
        this.postData = _postData
      }

      if (_postData) {
        PostWithAuth(this.dataUrl, _postData).then(res => {
          if (res) {
            this.insideTableData = res.data.data.list
            this.totalCount = res.data.data.count
            this.totalPage = res.data.data.totalPage
          }
        })
      }
    },
    getPageInfo() {
      let pageInfo = {
        totalCount: this.totalCount,
        totalPage: this.totalPage
      }
      return pageInfo
    }
  },
  watch: {
    searchForm (val) {
      const _d = val
      this.formDynamic = _d
    },
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      if (this.searchable) this.handleSearch()
    },
    paging (val) {
      if (!val) {
        this.postData.pageSize = 99999
      }
    },
    queryOrders (val) {
      this.postOrders = val
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    if (this.autoLoad) {
      this.getData()
    }
    // this.setDefaultSearchKey()
    // this.handleTableData()
  }
}
</script>
