export default [
     {
  type: 'hidden',
  field: 'id',
  value: '14'
},
     {
  type: 'input',
  title: '${column.comment}',
  field: 'deliveryId',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '${column.comment}',
  field: 'clientId',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '${column.comment}',
  field: 'clientName',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '编号',
  field: 'number',
  props: {
    clearable: true,
    placeholder: '请输入编号'
  },
  validate: [{
    required: true,
    message: '请输入编号',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入名称'
  },
  validate: [{
    required: true,
    message: '请输入名称',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '规格',
  field: 'specs',
  props: {
    clearable: true,
    placeholder: '请输入规格'
  },
  validate: [{
    required: true,
    message: '请输入规格',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '宽度',
  field: 'width',
  props: {
    clearable: true,
    placeholder: '请输入宽度'
  },
  validate: [{
    required: true,
    message: '请输入宽度',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '颜色',
  field: 'color',
  props: {
    clearable: true,
    placeholder: '请输入颜色'
  },
  validate: [{
    required: true,
    message: '请输入颜色',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '工艺要求',
  field: 'requirement',
  props: {
    clearable: true,
    placeholder: '请输入工艺要求'
  },
  validate: [{
    required: true,
    message: '请输入工艺要求',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '扫描数量',
  field: 'scanQuantity',
  props: {
    clearable: true,
    placeholder: '请输入扫描数量'
  },
  validate: [{
    required: true,
    message: '请输入扫描数量',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '剩余数量',
  field: 'residualQuantity',
  props: {
    clearable: true,
    placeholder: '请输入剩余数量'
  },
  validate: [{
    required: true,
    message: '请输入剩余数量',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '${column.comment}',
  field: 'unitPrice',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
    {
  type: 'input',
  title: '${column.comment}',
  field: 'totalPrice',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
]