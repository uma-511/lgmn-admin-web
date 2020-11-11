export default [
  {
    type: 'DatePicker',
    field: 'createDates',
    title: '制单日期',
    value: ['', ''],
    props: {
      'type': 'datetimerange',
      'format': 'yyyy-MM-dd',
      'placeholder': '请选择制单日期'
    }
  },
  {
    type: 'input',
    title: '客户名称',
    field: 'clientName',
    props: {
      clearable: true,
      placeholder: '请输入客户名称'
    }
  },
  {
    type: 'input',
    title: '送货单号',
    field: 'deliveryNum',
    props: {
      clearable: true,
      placeholder: '请输入送货单号'
    }
  },
  {
    type: 'input',
    title: '产品编号',
    field: 'number',
    props: {
      clearable: true,
      placeholder: '请输入产品编号'
    }
  },
  {
    type: 'input',
    title: '产品名称',
    field: 'name',
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
  }
]
