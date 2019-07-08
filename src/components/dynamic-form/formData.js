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
 *
 * 表单控件类型：
 *
 * 以字段名作为key
 * fieldName: {
 *   label: '标签名',
 *   value: '字段值',
 *   type: '表单控件类型',
 *   add: ...,
 *   edit: ...,
 *   detail: ...
 * }
 */
export default {
  name: {
    label: 'name',
    value: '',
    add: {
      render: 1,
      hide: 0
    },
    edit: 0,
    detail: 1
  },
  age: {
    label: 'age',
    value: '',
    add: 1,
    edit: 1,
    detail: 1
  },
  nickName: {
    label: 'nickName',
    value: '',
    add: 1,
    edit: 0,
    detail: 1
  }
}
