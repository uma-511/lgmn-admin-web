export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '登录密码',
    field: 'password',
    props: {
      type: 'password',
      clearable: true,
      placeholder: '请输入登录密码'
    },
    validate: [
      {
        required: true,
        message: '请输入登录密码',
        trigger: 'blur'
      }
    ]
  }
]
