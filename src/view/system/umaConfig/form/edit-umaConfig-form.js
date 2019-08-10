export default [{
  type: 'hidden',
  field: 'id',
  value: '14'
},
{
  type: 'input',
  title: '配置类别名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入配置类别名称'
  },
  validate: [{
    required: true,
    message: '请输入配置类别名称',
    trigger: 'blur'
  }]
}, {
  type: 'switch',
  title: '是否启用',
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
}
]
