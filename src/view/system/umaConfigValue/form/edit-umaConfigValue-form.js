export default [{
  type: 'hidden',
  field: 'id',
  value: '14'
},
{
  type: 'input',
  title: '配置类别id',
  field: 'configId',
  props: {
    clearable: true,
    placeholder: '请输入配置类别id'
  },
  validate: [{
    required: true,
    message: '请输入配置类别id',
    trigger: 'blur'
  }]
},
{
  type: 'input',
  title: '配置值',
  field: 'value',
  props: {
    clearable: true,
    placeholder: '请输入配置值'
  },
  validate: [{
    required: true,
    message: '请输入配置值',
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
