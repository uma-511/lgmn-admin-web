export default {
  name: {
    label: 'name',
    value: 'xjb',
    type: 'Input',
    add: {
      render: 1,
      hide: 1
    },
    edit: 0,
    detail: 1
  },
  age: {
    label: 'age',
    value: '25',
    type: 'Input',
    add: 1,
    edit: 1,
    detail: 1
  },
  nickName: {
    label: 'nickName',
    value: '谢纪标',
    type: 'Input',
    add: 1,
    edit: 0,
    detail: 1
  },
  avatar: {
    label: 'avatar',
    value: '7头',
    type: 'Upload',
    children: {
      type: 'Button',
      items: ['upload']
    },
    add: 1,
    edit: 0,
    detail: {
      props: {
        action: 'www.baidu.com'
      }
    }
  }
}
