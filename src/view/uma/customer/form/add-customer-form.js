export default [
  {
    type: 'input',
    title: '客户名称',
    field: 'name',
    props: {
      clearable: true,
      placeholder: '请输入客户名称'
    },
    validate: [
      {
        required: true,
        message: '请输入客户名称',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '客户编码',
    field: 'customerCode',
    props: {
      clearable: true,
      placeholder: '请输入客户编码'
    },
    validate: [
      {
        // required: true,
        message: '请输入客户编码',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '联系电话',
    field: 'phone',
    props: {
      clearable: true,
      placeholder: '请输入联系电话'
    },
    validate: [
      {
        // required: true,
        message: '请输入联系电话',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '传真',
    field: 'fax',
    props: {
      clearable: true,
      placeholder: '请输入传真'
    },
    validate: [
      {
        // required: true,
        message: '请输入传真',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '地址',
    field: 'address',
    props: {
      clearable: true,
      placeholder: '请输入地址'
    },
    validate: [
      {
        // required: true,
        message: '请输入地址',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '客户联系人',
    field: 'contacts',
    props: {
      clearable: true,
      placeholder: '请输入客户联系人'
    },
    validate: [
      {
        // required: true,
        message: '请输入客户联系人',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '物流公司',
    field: 'logistics',
    props: {
      clearable: true,
      placeholder: '请输入物流公司'
    },
    validate: [
      {
        // required: true,
        message: '请输入物流公司',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '物流电话',
    field: 'logisticsPhone',
    props: {
      clearable: true,
      placeholder: '请输入物流电话'
    },
    validate: [
      {
        // required: true,
        message: '请输入物流电话',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    title: '物流地址',
    field: 'logisticsAddress',
    props: {
      clearable: true,
      placeholder: '请输入物流地址'
    },
    validate: [
      {
        // required: true,
        message: '请输入物流地址',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'InputNumber',
    title: '订货时间',
    field: 'orderReminder',
    props: {
      clearable: true,
      min: 0,
      placeholder: '请设置订货时间'
    }
  },
  {
    type: 'input',
    title: '备注',
    field: 'remark',
    props: {
      clearable: true,
      placeholder: '请输入备注'
    },
    validate: [
      {
        // required: true,
        message: '请输入备注',
        trigger: 'blur'
      }
    ]
    // },
    // {
    //   type: 'input',
    //   title: '创建用户（保存用户名）',
    //   field: 'createUser',
    //   props: {
    //     clearable: true,
    //     placeholder: '请输入创建用户（保存用户名）'
    //   },
    //   validate: [{
    //     required: true,
    //     message: '请输入创建用户（保存用户名）',
    //     trigger: 'blur'
    //   }]
  }
]
