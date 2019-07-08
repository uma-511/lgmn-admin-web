export default [{
  type: 'hidden',
  field: 'id',
  value: '14'
}, {
  type: 'input',
  title: '角色名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入角色名称'
  },
  validate: [{
    required: true,
    message: '请输入角色名称',
    trigger: 'blur'
  }]
}, {
  type: 'input',
  title: '中文名称',
  field: 'chineseName',
  props: {
    clearable: true,
    placeholder: '请输入中文名称'
  },
  validate: [{
    required: true,
    message: '请输入中文名称',
    trigger: 'blur'
  }]
}, {
  type: 'switch',
  title: '是否启用',
  field: 'valid',
  value: 1,
  props: {
    size: 'large',
    trueValue: 1,
    falseValue: 0,
    'slot': {
      open: '启用',
      close: '停用'
    }
  }
}, {
  type: 'input',
  title: '备注',
  field: 'remark',
  value: '',
  props: {
    type: 'textarea',
    size: 'large',
    rows: 5,
    clearable: true,
    placeholder: '请输入备注'
  }
}]
