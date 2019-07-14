export default [
  {
    type: 'input',
    title: '客户名称',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入客户名称'
    },
    validate: [{
      required: true,
      message: '请输入客户名称',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '客户编码',
    field: 'customerCode',
    props: {
      clearable: true,
      placeholder: '请输入客户编码'
    },
    validate: [{
      required: true,
      message: '请输入客户编码',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '联系电话',
    field: 'phone',
    props: {
      clearable: true,
      placeholder: '请输入联系电话'
    },
    validate: [{
      required: true,
      message: '请输入联系电话',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '传真',
    field: 'fax',
    props: {
      clearable: true,
      placeholder: '请输入传真'
    },
    validate: [{
      required: true,
      message: '请输入传真',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '地址',
    field: 'address',
    props: {
      clearable: true,
      placeholder: '请输入地址'
    },
    validate: [{
      required: true,
      message: '请输入地址',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '备注',
    field: 'remark',
    props: {
      clearable: true,
      placeholder: '请输入备注'
    },
    validate: [{
      required: true,
      message: '请输入备注',
      trigger: 'blur'
    }]
  // },
  // {
  //   type: 'input',
  //   title: '创建用户（保存用户名）',
  //   field: 'createUser',
  //   props: {
  //     clearable: true,
  //     placeholder: '请输入创建用户（保存用户名）'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入创建用户（保存用户名）',
  //     trigger: 'blur'
  //   }]
  }
]
