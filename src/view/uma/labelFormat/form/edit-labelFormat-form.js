export default [
     {
  type: 'hidden',
  field: 'id',
  value: '14'
},
     {
  type: 'input',
  title: '${column.comment}',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入${column.comment}'
  },
  validate: [{
    required: true,
    message: '请输入${column.comment}',
    trigger: 'blur'
  }]
},
]