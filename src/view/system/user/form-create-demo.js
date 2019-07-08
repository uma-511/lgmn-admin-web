export default [{
  'type': 'input',
  'field': 'goods_name',
  'title': '商品名称',
  'value': '',
  validate: [{
    required: true,
    message: '请输入商品名称',
    trigger: 'blur'
  }]
},
{
  'type': 'inputNumber',
  'field': 'goods_price',
  'title': '商品价格',
  'value': 1
},
{
  type: 'switch',
  title: '是否上架',
  // label名称
  field: 'is_show',
  // 字段名称
  value: '1',
  // input值,
  props: {
    'size': 'default',
    'disabled': false,
    'trueValue': '1',
    'falseValue': '0'
  }
}
]
