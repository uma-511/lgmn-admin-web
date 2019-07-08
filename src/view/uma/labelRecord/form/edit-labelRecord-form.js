export default [
     {
  type: 'hidden',
  field: 'id',
  value: '14'
},
     {
  type: 'input',
  title: '存货编码',
  field: 'labelNum',
  props: {
    clearable: true,
    placeholder: '请输入存货编码'
  },
  validate: [{
    required: true,
    message: '请输入存货编码',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '包号',
  field: 'packId',
  props: {
    clearable: true,
    placeholder: '请输入包号'
  },
  validate: [{
    required: true,
    message: '请输入包号',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '订单号',
  field: 'orderId',
  props: {
    clearable: true,
    placeholder: '请输入订单号'
  },
  validate: [{
    required: true,
    message: '请输入订单号',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '产品id',
  field: 'prodId',
  props: {
    clearable: true,
    placeholder: '请输入产品id'
  },
  validate: [{
    required: true,
    message: '请输入产品id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '型号id',
  field: 'modelId',
  props: {
    clearable: true,
    placeholder: '请输入型号id'
  },
  validate: [{
    required: true,
    message: '请输入型号id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '存储状态',
  field: 'status',
  props: {
    clearable: true,
    placeholder: '请输入存储状态'
  },
  validate: [{
    required: true,
    message: '请输入存储状态',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '生产日期',
  field: 'prodTime',
  props: {
    clearable: true,
    placeholder: '请输入生产日期'
  },
  validate: [{
    required: true,
    message: '请输入生产日期',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '入库日期',
  field: 'inTime',
  props: {
    clearable: true,
    placeholder: '请输入入库日期'
  },
  validate: [{
    required: true,
    message: '请输入入库日期',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '出库日期',
  field: 'outTime',
  props: {
    clearable: true,
    placeholder: '请输入出库日期'
  },
  validate: [{
    required: true,
    message: '请输入出库日期',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '作废日期',
  field: 'invalidTime',
  props: {
    clearable: true,
    placeholder: '请输入作废日期'
  },
  validate: [{
    required: true,
    message: '请输入作废日期',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '标签类型：0：产品标签 1：打包标签',
  field: 'labelType',
  props: {
    clearable: true,
    placeholder: '请输入标签类型：0：产品标签 1：打包标签'
  },
  validate: [{
    required: true,
    message: '请输入标签类型：0：产品标签 1：打包标签',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '净重',
  field: 'netWeight',
  props: {
    clearable: true,
    placeholder: '请输入净重'
  },
  validate: [{
    required: true,
    message: '请输入净重',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '毛重',
  field: 'grossWeight',
  props: {
    clearable: true,
    placeholder: '请输入毛重'
  },
  validate: [{
    required: true,
    message: '请输入毛重',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '皮重',
  field: 'skinWeight',
  props: {
    clearable: true,
    placeholder: '请输入皮重'
  },
  validate: [{
    required: true,
    message: '请输入皮重',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '生产人id',
  field: 'prodUser',
  props: {
    clearable: true,
    placeholder: '请输入生产人id'
  },
  validate: [{
    required: true,
    message: '请输入生产人id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '入库人id',
  field: 'inUser',
  props: {
    clearable: true,
    placeholder: '请输入入库人id'
  },
  validate: [{
    required: true,
    message: '请输入入库人id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '出库人id',
  field: 'outUser',
  props: {
    clearable: true,
    placeholder: '请输入出库人id'
  },
  validate: [{
    required: true,
    message: '请输入出库人id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '作废人id',
  field: 'invalidUser',
  props: {
    clearable: true,
    placeholder: '请输入作废人id'
  },
  validate: [{
    required: true,
    message: '请输入作废人id',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '记录类型 0：生成 1：导入',
  field: 'recordType',
  props: {
    clearable: true,
    placeholder: '请输入记录类型 0：生成 1：导入'
  },
  validate: [{
    required: true,
    message: '请输入记录类型 0：生成 1：导入',
    trigger: 'blur'
  }]
},
]