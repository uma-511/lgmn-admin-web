export default [{
  type: 'hidden',
  field: 'id',
  value: '14'
}, {
  type: 'input',
  title: '设备ip',
  field: 'ip',
  props: {
    readonly: true
  }
}, {
  type: 'input',
  title: '设备名称',
  field: 'name',
  props: {
    readonly: true
  }
}, {
  type: 'input',
  title: '设备类型：0：打印机 1：触摸屏 2：扫描抢 3：秤 4：标签打印机 5：手持机',
  field: 'type',
  props: {
    readonly: true
  }
}, {
  type: 'input',
  title: '使用状态：1：正常，0：停用',
  field: 'status',
  props: {
    readonly: true
  }
}, {
  type: 'input',
  title: '设备分组id',
  field: 'groupId',
  props: {
    readonly: true
  }
}, {
  type: 'input',
  title: '设备分组名称',
  field: 'groupName',
  props: {
    readonly: true
  }
}]
