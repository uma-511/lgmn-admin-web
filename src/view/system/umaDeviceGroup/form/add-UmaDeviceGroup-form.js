export default [{
  type: 'input',
  title: '设备分组名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入设备分组名称'
  },
  validate: [{
    required: true,
    message: '请输入设备分组名称',
    trigger: 'blur'
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
}]
