<template>
  <Tables ref='table'
          :columns="columns"
          v-model='data'
          :addable="false"
          :searchable="false"
          :autoLoad="false"
          :dataUrl='dataUrl'>

  </Tables>
</template>

<script>
import Tables from '_c/tables'
import { PostWithAuth } from '@/api/global'
export default {
  components: {
    Tables
  },
  data () {
    return {
      searchForm: { hadPaid: 0 },
      dataUrl: 'yjOrderApi/page',
      columns: [{
        title: '订单编号',
        key: 'orderNum'
      }, {
        title: '编号',
        key: 'number'
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
        title: '计划数量',
        key: 'plannedQuantity'
      }, {
        title: '客户名称',
        key: 'clientName'
      }, {
        key: 'handle',
        renderHeader (h, { column, index }) {
          return h('span', '操作')
        },
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
                  this.payConfirm(params.row)
                }
              }
            }, '确认回款')
          }
        ]
      }],
      data: []
    }
  },
  methods: {
    onAdded () {
      this.$refs['table'].getData(this.searchForm)
    },
    payConfirm (val) {
      PostWithAuth('yjOrderApi/payConfirm/' + val.id, {}).then(res => {
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
    this.onAdded()
  }
}
</script>
