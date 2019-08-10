export default [{
  type: 'hidden',
  field: 'id',
  value: '14'
}, {
  type: 'input',
  title: '姓名',
  field: 'nikeName',
  props: {
    clearable: true,
    placeholder: '请输入姓名'
  },
  validate: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }]
}, {
  type: 'input',
  title: '登录账号',
  field: 'account',
  props: {
    clearable: true,
    placeholder: '请输入登录账号'
  },
  validate: [{
    required: true,
    message: '请输入登录账号',
    trigger: 'blur'
  }]
}]
