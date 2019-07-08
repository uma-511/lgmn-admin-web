export default [
   {
  type: 'input',
  title: '客户id',
  field: 'customerId',
  props: {
    clearable: true,
    placeholder: '请输入客户id'
  },
  validate: [{
    required: true,
    message: '请输入客户id',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '联系人姓名',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入联系人姓名'
  },
  validate: [{
    required: true,
    message: '请输入联系人姓名',
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
  title: '职位',
  field: 'position',
  props: {
    clearable: true,
    placeholder: '请输入职位'
  },
  validate: [{
    required: true,
    message: '请输入职位',
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
},
  {
  type: 'input',
  title: '创建人',
  field: 'createUser',
  props: {
    clearable: true,
    placeholder: '请输入创建人'
  },
  validate: [{
    required: true,
    message: '请输入创建人',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '创建时间',
  field: 'createTime',
  props: {
    clearable: true,
    placeholder: '请输入创建时间'
  },
  validate: [{
    required: true,
    message: '请输入创建时间',
    trigger: 'blur'
  }]
},
 ]