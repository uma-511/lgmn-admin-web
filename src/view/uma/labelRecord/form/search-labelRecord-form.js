export default [
  {
    type: 'DatePicker',
    field: 'sectionDay',
    title: '生产日期',
    value: [],
    props: {
      type: 'daterange',
      format: 'yyyy-MM-dd',
      placeholder: '请选择生产日期'
    }
  },
  {
    type: 'input',
    title: '订单号',
    field: 'orderNo',
    props: {
      clearable: true,
      placeholder: '请输入订单号'
    }
  },
  {
    type: 'input',
    title: '条形码',
    field: 'labelNum',
    props: {
      clearable: true,
      placeholder: '请输入条形码'
    }
  }
]
