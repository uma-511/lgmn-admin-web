<template>
  <Tree :data="data5"
        :render="renderContent"></Tree>
</template>
<script>
/* eslint-disable */
const prefixCls = "ivu-tree"
export default {
  name: 'PermissionTree',
  data () {
    return {
      data5: [
        {
          title: '合众',
          expand: true,
          render: this.parentRender,
          children: [
            {
              title: 'child 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                  expand: true,
                  isLeaf: true
                },
                {
                  title: 'leaf 1-1-2',
                  expand: true,
                  isLeaf: true
                }
              ]
            },
            {
              title: 'child 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                  expand: true,
                  isLeaf: true
                },
                {
                  title: 'leaf 1-2-1',
                  expand: true,
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small',
      }
    }
  },
  methods: {
    parentRender (h, { root, node, data }) {
      return h(
        "span",
        {
          class: [
            `${prefixCls}-title`,
            {
              [`${prefixCls}-title-selected`]: this.editIndex === data.nodeKey
            }
          ],
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-folder-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-add",
                    type: "primary"
                  }),
                  style: {
                    // width: "64px",
                    padding: "0 5px 0 0"
                  },
                  on: {
                    click: () => {
                      this.append(data, false);
                      this.childrenData.id = this.getCourseData.id
                    }
                  }
                },
                "添加模块"
              )
            ]
          )
        ]
      )
    },
    renderContent (h, { root, node, data }) {
      if (!data.isLeaf) {
        return this.renderModule(h, root, node, data)
      } else {
        return this.renderFunction(h, root, node, data)
      }
    },
    renderModule (h, root, node, data) {
      return h('span', {
        class: [
          `${prefixCls}-title`,
          {
            [`${prefixCls}-title-selected`]: this.editIndex === data.nodeKey
          }
        ],
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-add',
                  type: 'primary'
                }),
                style: {
                  marginRight: '18px'
                },
                on: {
                  click: () => { this.append(data) }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-remove',
                  type: 'error'
                }),
                on: {
                  click: () => { this.remove(root, node, data) }
                }
              })
            ])
        ])
    },
    renderFunction (h, root, node, data) {
      return h('span', {
        class: [
          `${prefixCls}-title`,
          {
            [`${prefixCls}-title-selected`]: this.editIndex === data.nodeKey
          }
        ],
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
              // h('Button', {
              //   props: Object.assign({}, this.buttonProps, {
              //     icon: 'ios-add',
              //     type: 'primary'
              //   }),
              //   style: {
              //     marginRight: '18px'
              //   },
              //   on: {
              //     click: () => { this.append(data) }
              //   }
              // }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-remove',
                  type: 'error'
                }),
                on: {
                  click: () => { this.remove(root, node, data) }
                }
              })
            ])
        ])
    },
    append (data) {
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true
      })
      this.$set(data, 'children', children)
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  }
}
</script>
