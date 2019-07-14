export default [
  {
    type: 'input',
    title: '标签名称',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入标签名称'
    },
    validate: [{
      required: true,
      message: '请输入标签名称',
      trigger: 'blur'
    }]
  }
]
