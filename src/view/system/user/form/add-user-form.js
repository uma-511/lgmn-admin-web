export default [{
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
}, {
  type: 'input',
  title: '登录密码',
  field: 'password',
  props: {
    type: 'password',
    clearable: true,
    placeholder: '请输入登录密码'
  },
  validate: [{
    required: true,
    message: '请输入登录密码',
    trigger: 'blur'
  }]
}]
