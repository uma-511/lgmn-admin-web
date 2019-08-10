export default [{
  type: 'input',
  title: '订单号',
  field: 'orderNo',
  props: {
    clearable: true,
    placeholder: '请输入订单号'
  }
}, {
  type: 'input',
  title: '条形码',
  field: 'labelNum',
  props: {
    clearable: true,
    placeholder: '请输入条形码'
  }
  // }, {
  //   type: 'DatePicker',
  //   field: 'dateRange',
  //   title: '生产日期',
  //   value: ['2018-02-20', new Date()],
  //   // input值, type为daterange,datetimerange value为数组 [start_value,end_value]
  //   props: {
  //     'type': 'datetimerange',
  //     // 显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
  //     'format': 'yyyy-MM-dd',
  //     // 展示的日期格式
  //     'placement': 'bottom-start',
  //     //	日期选择器出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-end
  //     'placeholder': '请选择生产日期',
  //     // 占位文本
  //     'confirm': false,
  //     // 是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
  //     'size': 'default',
  //     // 尺寸，可选值为large、small、default或者不设置
  //     'disabled': false,
  //     // 是否禁用选择器
  //     'clearable': true,
  //     // 是否显示清除按钮
  //     'readonly': false,
  //     // 完全只读，开启后不会弹出选择器
  //     'editable': false
  //     // 文本框是否可以输入
  //   }
}]
