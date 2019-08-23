export default [{
  type: 'input',
  title: '设备ip',
  field: 'ip',
  props: {
    clearable: true,
    placeholder: '请输入设备ip'
  }
}, {
  type: 'input',
  title: '设备名称',
  field: 'name',
  props: {
    clearable: true,
    placeholder: '请输入设备名称'
  }
}, {
  type: 'input',
  title: '设备类型：0：打印机 1：触摸屏 2：扫描抢 3：秤 4：标签打印机 5：手持机',
  field: 'type',
  props: {
    clearable: true,
    placeholder: '请输入设备类型：0：打印机 1：触摸屏 2：扫描抢 3：秤 4：标签打印机 5：手持机'
  }
}, {
  type: 'input',
  title: '使用状态：1：正常，0：停用',
  field: 'status',
  props: {
    clearable: true,
    placeholder: '请输入使用状态：1：正常，0：停用'
  }
}, {
  type: 'input',
  title: '设备分组id',
  field: 'groupId',
  props: {
    clearable: true,
    placeholder: '请输入设备分组id'
  }
}, {
  type: 'input',
  title: '设备分组名称',
  field: 'groupName',
  props: {
    clearable: true,
    placeholder: '请输入设备分组名称'
  }
}]
