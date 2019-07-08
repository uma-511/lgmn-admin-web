/**
 * 动态表单数据格式
 * ===============
 *
 * 表单状态： 添加：add | 编辑：edit | 详情：detail，表单状态为非必填项，默认为1
 * 表单状态值：
 * 1：add: (0/1),非必填，默认值：1
 * 2: add: {
 *      render: 是否渲染(0/1),非必填，默认值：1
 *      hide: 是否隐藏(0/1),非必填,默认值: 0
 *    }
 * 以字段名作为key
 * fieldName: {
 *   label: '标签名',
 *   value: '字段值',
 *   add: ...,
 *   edit: ...,
 *   detail: ...
 * }
 */
export default {
  name: {
    label: 'name',
    value: '',
    type: 'Input',
    add: {
      render: 1,
      hide: 0,
      props: {
        size: 'small',
        clearable: true,
        placeholder: '测试用'
      }
    },
    edit: 0,
    detail: 1
  },
  age: {
    label: 'age',
    value: '',
    type: 'InputNumber',
    add: 1,
    edit: 1,
    detail: 1
  },
  nickName: {
    label: 'nickName',
    value: '',
    type: 'Input',
    add: 1,
    edit: 0,
    detail: 1
  },
  radio: {
    label: 'RadioGroup',
    value: 'radio1',
    type: 'RadioGroup',
    children: {
      type: 'Radio',
      items: [{
        label: 'radio1'
      }, {
        label: 'radio2'
      }]
    }
  },
  checkbox: {
    label: 'CheckboxGroup',
    value: 'radio1',
    type: 'CheckboxGroup',
    children: {
      type: 'Checkbox',
      items: [{
        label: 'radio1'
      }, {
        label: 'radio2'
      }]
    }
  }
}
