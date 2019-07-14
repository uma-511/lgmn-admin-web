export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  // {
  //   type: 'input',
  //   title: '产品id（当启用产品分类时必填）',
  //   field: 'pid',
  //   props: {
  //     clearable: true,
  //     placeholder: '请输入产品id（当启用产品分类时必填）'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入产品id（当启用产品分类时必填）',
  //     trigger: 'blur'
  //   }]
  // },
  {
    type: 'input',
    title: '产品名称',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入产品名称'
    },
    validate: [{
      required: true,
      message: '请输入产品名称',
      trigger: 'blur'
    }]
  },
  {
    type: 'inputNumber',
    title: '长度',
    field: 'longs',
    value: '0.1',
    props: {
      min: 0.1,
      step: 0.1,
      clearable: true,
      placeholder: '请输入长度'
    },
    validate: [{
      required: true,
      message: '请输入长度',
      trigger: 'blur',
      type: 'number'
    }]
  },
  {
    type: 'inputNumber',
    title: '宽度',
    field: 'width',
    value: '0.1',
    props: {
      min: 0.1,
      step: 0.1,
      clearable: true,
      placeholder: '请输入宽度'
    },
    validate: [{
      required: true,
      message: '请输入宽度',
      trigger: 'blur',
      type: 'number'
    }]
  },
  {
    type: 'inputNumber',
    title: '高度',
    field: 'height',
    value: '0.1',
    props: {
      min: 0.1,
      step: 0.1,
      clearable: true,
      placeholder: '请输入高度'
    },
    validate: [{
      required: true,
      message: '请输入高度',
      trigger: 'blur',
      type: 'number'
    }]
  },
  {
    type: 'inputNumber',
    title: '重量',
    field: 'weight',
    value: '0.1',
    props: {
      min: 0.1,
      step: 0.1,
      clearable: true,
      placeholder: '请输入重量'
    },
    validate: [{
      required: true,
      message: '请输入重量',
      trigger: 'blur',
      type: 'number'
    }]
  },
  {
    type: 'input',
    title: '长度单位',
    field: 'longUnit',
    props: {
      clearable: true,
      placeholder: '请输入长度单位'
    },
    validate: [{
      required: true,
      message: '请输入长度单位',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '宽度单位',
    field: 'widthUnit',
    props: {
      clearable: true,
      placeholder: '请输入宽度单位'
    },
    validate: [{
      required: true,
      message: '请输入宽度单位',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '高度单位',
    field: 'heightUnit',
    props: {
      clearable: true,
      placeholder: '请输入高度单位'
    },
    validate: [{
      required: true,
      message: '请输入高度单位',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '重量单位',
    field: 'weightUnit',
    props: {
      clearable: true,
      placeholder: '请输入重量单位'
    },
    validate: [{
      required: true,
      message: '请输入重量单位',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '颜色',
    field: 'color',
    props: {
      clearable: true,
      placeholder: '请输入颜色'
    },
    validate: [{
      required: true,
      message: '请输入颜色',
      trigger: 'blur'
    }]
  },
  {
    type: 'input',
    title: '备注',
    field: 'remark',
    props: {
      clearable: true,
      placeholder: '请输入备注'
    },
    validate: [{
      required: true,
      message: '请输入备注',
      trigger: 'blur'
    }]
  }
]
