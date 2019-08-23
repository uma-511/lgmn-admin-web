export default [{
  type: 'input',
  title: '设备IP',
  field: 'ip',
  props: {
    clearable: true,
    placeholder: '请输入设备IP'
  },
  validate: [{
    required: true,
    message: '请输入设备IP',
    trigger: 'blur'
  }]
}, {
  type: 'input',
  title: '设备名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入设备名称'
  },
  validate: [{
    required: true,
    message: '请输入设备名称',
    trigger: 'blur'
  }]
}, {
  type: 'select',
  title: '设备类型',
  field: 'type',
  options: [{
    'value': 0,
    'label': '打印机',
    'disabled': false
  },
  {
    'value': 1,
    'label': '触摸屏',
    'disabled': false
  }, {
    'value': 2,
    'label': '扫描抢',
    'disabled': false
  }, {
    'value': 3,
    'label': '秤',
    'disabled': false
  }, {
    'value': 4,
    'label': '标签打印机',
    'disabled': false
  }, {
    'value': 5,
    'label': '手持机',
    'disabled': false
  }, {
    'value': 6,
    'label': '电视',
    'disabled': false
  }
  ],
  props: {
    'multiple': false,
    'placeholder': '请选择',
    'not-found-text': '无匹配数据',
    'placement': 'bottom'
  },
  validate: [{
    required: true,
    type: 'number',
    message: '请选择设备类型',
    trigger: 'change'
  }]
}, {
  type: 'switch',
  title: '使用状态',
  field: 'status',
  value: 1,
  props: {
    'trueValue': 1,
    'falseValue': 0,
    'slot': {
      open: '启用',
      close: '停用'
    }
  }
}, {
  type: 'hidden',
  title: '设备分组id',
  field: 'groupId',
  props: {
    clearable: true,
    placeholder: '请输入设备分组id'
  },
  validate: [{
    required: true,
    message: '请输入设备分组id',
    trigger: 'blur'
  }]
}, {
  type: 'input',
  title: '设备分组名称',
  field: 'groupName',
  props: {
    readonly: true
  }
}]
