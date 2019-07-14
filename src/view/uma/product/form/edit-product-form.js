export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '产品编号',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入产品编号'
    },
    validate: [{
      required: true,
      message: '请输入产品编号',
      trigger: 'blur'
    }]
  }
]
