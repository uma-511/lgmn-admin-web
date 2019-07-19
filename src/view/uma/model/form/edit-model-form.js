export default [{
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
  title: '产品编号',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入产品编号'
  },
  validate: [{
    required: true,
    message: '请输入产品编号',
    trigger: 'blur'
  }]
},
  // {
  //   type: 'inputNumber',
  //   title: '米数',
  //   field: 'longs',
  //   value: '0.1',
  //   props: {
  //     min: 0.1,
  //     step: 0.1,
  //     clearable: true,
  //     placeholder: '请输入米数'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入米数',
  //     trigger: 'blur',
  //     type: 'number'
  //   }]
  // },
  // {
  //   type: 'inputNumber',
  //   title: '宽度',
  //   field: 'width',
  //   value: '0.1',
  //   props: {
  //     min: 0.1,
  //     step: 0.1,
  //     clearable: true,
  //     placeholder: '请输入宽度'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入宽度',
  //     trigger: 'blur',
  //     type: 'number'
  //   }]
  // },
  // {
  //   type: 'inputNumber',
  //   title: '高度',
  //   field: 'height',
  //   value: '0.1',
  //   props: {
  //     min: 0.1,
  //     step: 0.1,
  //     clearable: true,
  //     placeholder: '请输入高度'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入高度',
  //     trigger: 'blur',
  //     type: 'number'
  //   }]
  // },
  // {
  //   type: 'inputNumber',
  //   title: '斤数',
  //   field: 'weight',
  //   value: '0.1',
  //   props: {
  //     min: 0.1,
  //     step: 0.1,
  //     clearable: true,
  //     placeholder: '请输入斤数'
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请输入斤数',
  //     trigger: 'blur',
  //     type: 'number'
  //   }]
  // },
{
  type: 'input',
  title: '材质',
  field: 'longUnit',
  props: {
    clearable: true,
    placeholder: '请输入材质'
  },
  validate: [{
    // required: true,
    message: '请输入材质',
    trigger: 'blur'
  }]
},
{
  type: 'input',
  title: '纹路',
  field: 'widthUnit',
  props: {
    clearable: true,
    placeholder: '请输入纹路'
  },
  validate: [{
    // required: true,
    message: '请输入纹路',
    trigger: 'blur'
  }]
},
{
  type: 'inputNumber',
  title: '规格值',
  field: 'heightUnit',
  value: '0.1',
  props: {
    min: 0.1,
    step: 0.1,
    clearable: true,
    placeholder: '规格值'
  },
  validate: [{
    required: true,
    message: '规格值',
    trigger: 'blur',
    type: 'number'
  }]
},
{
  type: 'input',
  title: '规格',
  field: 'weightUnit',
  props: {
    clearable: true,
    placeholder: '规格'
  },
  validate: [{
    required: true,
    message: '规格',
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
    // required: true,
    message: '请输入备注',
    trigger: 'blur'
  }]
}
]
