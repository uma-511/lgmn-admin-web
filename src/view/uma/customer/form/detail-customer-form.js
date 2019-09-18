export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '客户名称',
    field: 'name',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '客户编码',
    field: 'customerCode',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '联系电话',
    field: 'phone',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '传真',
    field: 'fax',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '地址',
    field: 'address',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '客户联系人',
    field: 'contacts',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '物流公司',
    field: 'logistics',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '物流电话',
    field: 'logisticsPhone',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '物流地址',
    field: 'logisticsAddress',
    props: {
      readonly: true
    }
  },
  {
    type: 'InputNumber',
    title: '订货时间',
    field: 'orderReminder',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '备注',
    field: 'remark',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '创建用户',
    field: 'createUser',
    props: {
      readonly: true
    }
  },
  {
    type: 'DatePicker',
    field: 'createTime',
    title: '创建时间',
    value: '',
    props: {
      readonly: true,
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]
