export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '客户名称',
    field: 'customer',
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
    title: '联系人',
    field: 'contact',
    props: {
      clearable: true,
      placeholder: '请输入联系人'
    },
    validate: [{
      required: true,
      message: '请输入联系人',
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
    title: '送货单号',
    field: 'deliveryNum',
    props: {
      clearable: true,
      placeholder: '请输入送货单号'
    },
    validate: [{
      required: true,
      message: '请输入送货单号',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '司机',
    field: 'driver',
    props: {
      clearable: true,
      placeholder: '请输入司机'
    },
    validate: [{
      required: true,
      message: '请输入司机',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '车牌号',
    field: 'carNum',
    props: {
      clearable: true,
      placeholder: '请输入车牌号'
    },
    validate: [{
      required: true,
      message: '请输入车牌号',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '开单人',
    field: 'createUser',
    props: {
      clearable: true,
      placeholder: '请输入开单人'
    },
    validate: [{
      required: true,
      message: '请输入开单人',
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
    title: '仓管',
    field: 'store',
    props: {
      clearable: true,
      placeholder: '请输入仓管'
    },
    validate: [{
      required: true,
      message: '请输入仓管',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '收货人',
    field: 'revicer',
    props: {
      clearable: true,
      placeholder: '请输入收货人'
    },
    validate: [{
      required: true,
      message: '请输入收货人',
      trigger: 'blur'
    }]
  }
]
