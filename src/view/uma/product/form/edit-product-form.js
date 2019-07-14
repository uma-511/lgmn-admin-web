export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '产品名称',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入产品名称'
    },
    validate: [{
      required: true,
      message: '请输入产品名称',
      trigger: 'blur'
    }]
  }
]
