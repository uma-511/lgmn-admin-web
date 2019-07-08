export default [{
  type: 'input',
  title: '权限名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入权限名称'
  },
  validate: [{
    required: true,
    message: '请输入权限名称',
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
