export default [{
  type: 'input',
  title: '昵称',
  field: 'nikeName',
  props: {
    clearable: true,
    placeholder: '请输入昵称'
  }
}, {
  type: 'input',
  title: '登录手机号',
  field: 'account',
  props: {
    clearable: true,
    placeholder: '请输入手机号'
  }
}, {
  type: 'input',
  title: '角色名称',
  field: 'name',
  props: {
    readonly: true,
    placeholder: '请输入角色名称'
  }
}, {
  type: 'input',
  title: '中文名称',
  field: 'chineseName',
  props: {
    clearable: true,
    placeholder: '请输入中文名称'
  }
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
}]
