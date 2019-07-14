export default [
  {
    type: 'hidden',
    field: 'id',
    value: '14'
  },
  {
    type: 'input',
    title: '存货编码',
    field: 'labelNum',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '包号',
    field: 'packId',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '订单号',
    field: 'orderId',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '产品id',
    field: 'prodId',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '型号id',
    field: 'modelId',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '存储状态',
    field: 'status',
    props: {
      readonly: true
    }
  },
  {
    type: 'DatePicker',
    title: '生产日期',
    field: 'prodTime',
    value: '',
    props: {
      readonly: true,
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    type: 'DatePicker',
    title: '入库日期',
    field: 'inTime',
    value: '',
    props: {
      readonly: true,
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    type: 'DatePicker',
    title: '出库日期',
    field: 'outTime',
    value: '',
    props: {
      readonly: true,
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    type: 'DatePicker',
    title: '作废日期',
    field: 'invalidTime',
    value: '',
    props: {
      readonly: true,
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    type: 'input',
    title: '标签类型：0：产品标签 1：打包标签',
    field: 'labelType',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '净重',
    field: 'netWeight',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '毛重',
    field: 'grossWeight',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '皮重',
    field: 'skinWeight',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '生产人id',
    field: 'prodUser',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '入库人id',
    field: 'inUser',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '出库人id',
    field: 'outUser',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '作废人id',
    field: 'invalidUser',
    props: {
      readonly: true
    }
  },
  {
    type: 'input',
    title: '记录类型 0：生成 1：导入',
    field: 'recordType',
    props: {
      readonly: true
    }
  }
]
