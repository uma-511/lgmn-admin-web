export default [
   {
  type: 'input',
  title: '订单编号',
  field: 'orderNum',
  props: {
    clearable: true,
    placeholder: '请输入订单编号'
  },
  validate: [{
    required: true,
    message: '请输入订单编号',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '产品编号',
  field: 'number',
  props: {
    clearable: true,
    placeholder: '请输入产品编号'
  },
  validate: [{
    required: true,
    message: '请输入产品编号',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '名称(uma_config)',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入名称(uma_config)'
  },
  validate: [{
    required: true,
    message: '请输入名称(uma_config)',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '规格(uma_config)',
  field: 'specs',
  props: {
    clearable: true,
    placeholder: '请输入规格(uma_config)'
  },
  validate: [{
    required: true,
    message: '请输入规格(uma_config)',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '宽度(uma_config)',
  field: 'width',
  props: {
    clearable: true,
    placeholder: '请输入宽度(uma_config)'
  },
  validate: [{
    required: true,
    message: '请输入宽度(uma_config)',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '颜色(uma_config)',
  field: 'color',
  props: {
    clearable: true,
    placeholder: '请输入颜色(uma_config)'
  },
  validate: [{
    required: true,
    message: '请输入颜色(uma_config)',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '标签格式',
  field: 'labelId',
  props: {
    clearable: true,
    placeholder: '请输入标签格式'
  },
  validate: [{
    required: true,
    message: '请输入标签格式',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '便签格式名称',
  field: 'labelName',
  props: {
    clearable: true,
    placeholder: '请输入便签格式名称'
  },
  validate: [{
    required: true,
    message: '请输入便签格式名称',
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
  title: '计划数量',
  field: 'plannedQuantity',
  props: {
    clearable: true,
    placeholder: '请输入计划数量'
  },
  validate: [{
    required: true,
    message: '请输入计划数量',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '每包饼数',
  field: 'perPackQuantity',
  props: {
    clearable: true,
    placeholder: '请输入每包饼数'
  },
  validate: [{
    required: true,
    message: '请输入每包饼数',
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
  title: '交货日期',
  field: 'deliveryDate',
  props: {
    clearable: true,
    placeholder: '请输入交货日期'
  },
  validate: [{
    required: true,
    message: '请输入交货日期',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '客户id',
  field: 'clientId',
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
  title: '客户名',
  field: 'clientName',
  props: {
    clearable: true,
    placeholder: '请输入客户名'
  },
  validate: [{
    required: true,
    message: '请输入客户名',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '楼层(uma_config)',
  field: 'floor',
  props: {
    clearable: true,
    placeholder: '请输入楼层(uma_config)'
  },
  validate: [{
    required: true,
    message: '请输入楼层(uma_config)',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '创建人id',
  field: 'createUserId',
  props: {
    clearable: true,
    placeholder: '请输入创建人id'
  },
  validate: [{
    required: true,
    message: '请输入创建人id',
    trigger: 'blur'
  }]
},
  {
  type: 'input',
  title: '创建人名称',
  field: 'createUser',
  props: {
    clearable: true,
    placeholder: '请输入创建人名称'
  },
  validate: [{
    required: true,
    message: '请输入创建人名称',
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
  {
  type: 'input',
  title: '删除标识： 0 未删除， 1 已删除',
  field: 'delFlag',
  props: {
    clearable: true,
    placeholder: '请输入删除标识： 0 未删除， 1 已删除'
  },
  validate: [{
    required: true,
    message: '请输入删除标识： 0 未删除， 1 已删除',
    trigger: 'blur'
  }]
},
 ]