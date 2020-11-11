export default [
  {
    type: 'DatePicker',
    field: 'prodTimes',
    title: '生产日期',
    value: [],
    props: {
      'type': 'datetimerange',
      'format': 'yyyy-MM-dd',
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
  },
  {
    type: 'input',
    title: '客户名称',
    field: 'customerName',
    props: {
      clearable: true,
      placeholder: '请输入客户名称'
    }
  },
  {
    type: 'input',
    title: '产品编号',
    field: 'productName',
    props: {
      clearable: true,
      placeholder: '请输入产品编号'
    }
  },
  {
    type: 'input',
    title: '产品名称',
    field: 'modelName',
    props: {
      clearable: true,
      placeholder: '请输入产品名称'
    }
  },
  {
    type: 'input',
    title: '规格',
    field: 'specs',
    props: {
      clearable: true,
      placeholder: '请输入规格'
    }
  },
  {
    type: 'input',
    title: '色号',
    field: 'color',
    props: {
      clearable: true,
      placeholder: '请输入色号'
    }
  },
  {
    type: 'input',
    title: '宽度',
    field: 'color',
    props: {
      clearable: true,
      placeholder: '请输入宽度'
    }
  },
  {
    type: 'DatePicker',
    field: 'deliveryDates',
    title: '送货日期',
    value: [],
    props: {
      'type': 'datetimerange',
      'format': 'yyyy-MM-dd',
      'placeholder': '请选择送货日期'
    }
  },
  {
    type: 'select',
    title: '库存状态',
    field: 'status',
    props: {
      clearable: true,
      placeholder: '请选择'
    },
    options: [{
      value: 0, label: '待进仓'
    }, {
      value: 1, label: '已进仓'
    }, {
      value: 2, label: '已出仓'
    }, {
      value: 8, label: '已作废'
    }]
  }
]
