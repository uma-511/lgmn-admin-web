<template>
  <div>
    <Row class="search-con search-con-top">
      <Col span="20">
      <Button @click="toAdd"
              type="primary">
        <Icon type="md-add" />添加</Button>
      <!-- <Button @click="batchDel"
                    type="error">
              <Icon type="md-trash" />批量删除</Button> -->
      </Col>
      <Col span="4">
      <Tooltip content="刷新"
               placement="bottom">
        <Button @click="loadTable"
                shape="circle"
                class="search-btn"
                icon="md-refresh"
                type="default">
        </Button>
      </Tooltip>
      </Col>
    </Row>
    <Row style="margin-top:10px;">
      <Col span="24">
      <Table ref="tables"
             :data="tableData"
             :columns="columns"
             @on-delete="handleDelete">
      </Table>
      <Page :total="total"
            show-sizer
            show-total
            placement="top"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange" />
      </Col>
    </Row>
  </div>
</template>

<script>
import { rolePage, updateRole, deleteRole } from '@/api/role'
export default {
  name: 'RoleList',
  data () {
    return {
      tableData: [],
      postData: {
        type: 0,
        pageNumber: 0,
        pageSize: 10
      },
      columns: [
        { table: '#', type: 'index' },
        { title: '角色名称', key: 'name' },
        {
          title: '中文名称',
          key: 'chineseName'
        },
        {
          title: '是否可用',
          key: 'valid',
          render: (h, params) => {
            const data = params.row
            const status = data.valid
            const _this = this
            return h('div', [
              h('i-switch', {
                props: {
                  'true-value': 1,
                  'false-value': 0,
                  value: status
                },
                on: {
                  'on-change': (value) => {
                    data.valid = value
                    updateRole(data).then(res => {
                      if (res) {
                        _this.$Message.success(res.data.message)

                        if (res.data.code === '200') {
                          _this.index()
                        }
                      }
                    })
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'options',
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'ios-create-outline'
                },
                on: {
                  click: () => {
                    this.toSetPermission(row)
                  }
                }
              }, '设置权限'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'ios-create-outline'
                },
                on: {
                  click: () => {
                    this.edit(row)
                  }
                }
              }, '修改'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '是否确认删除?'
                },
                on: {
                  'on-ok': () => { this.handleDelete(row) }
                }
              }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'ios-trash-outline'
                    }
                  }, '删除')
                ]
              )
            ]
            )
          }
        }
      ],
      total: 0
    }
  },
  methods: {
    handleDelete (params) {
      deleteRole(params).then(res => {
        if (res) {
          this.$Message.info('删除成功')
          this.loadTable()
        }
      })
    },
    pageChange (pageNumber) {
      this.postData.pageNumber = pageNumber - 1
      this.loadTable()
    },
    pageSizeChange (pageSize) {
      this.postData.pageSize = pageSize
      this.loadTable()
    },
    loadTable () {
      rolePage(this.postData).then(res => {
        if (res) {
          this.total = res.data.data.count
          this.tableData = res.data.data.list
        }
      })
    },
    toAdd () {
      this.add()
    },
    toEdit (row) {
      this.edit(row)
    },
    toSetPermission (row) {
      this.setPermission(row)
    }
  },
  inject: ['index', 'add', 'edit', 'setPermission'],
  mounted () {
    this.loadTable()
  }
}
</script>
