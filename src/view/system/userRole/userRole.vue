<template>
  <div>
    <Row type="flex"
         justify="center"
         align="middle">
      <Col span="11">
      可选权限：
      <div>
        <UserRoleSource ref="source">
        </UserRoleSource>
      </div>
      </Col>
      <Col span="2">
      <div class="ivu-transfer-operation">
        <Button type="primary"
                :disabled="!rightActive"
                @click.native="moveToLeft">
          <Icon type="ios-arrow-back"></Icon>
        </Button>
        <Button type="primary"
                :disabled="!leftActive"
                @click.native="moveToRight">
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
      </div>
      </Col>
      <Col span="11">
      已选权限：
      <UserRoleTarget ref="target">
      </UserRoleTarget>
      </Col>
    </Row>
  </div>
</template>

<script>
import UserRoleSource from './userRoleSource'
import UserRoleTarget from './userRoleTarget'
import { addUserRole, deleteUserRole } from '@/api/userRole'
export default {
  name: 'UserRole',
  components: {
    UserRoleSource,
    UserRoleTarget
  },
  data () {
    return {
      leftActive: false,
      rightActive: false,
      sourceSelectedData: [],
      targetSelectedData: [],
      toLeftDto: {
        userId: '',
        roleId: []
      },
      toRightDto: {
        userId: '',
        roleIds: []
      },
      userId: ''
    }
  },
  methods: {
    moveToLeft () {
      const data = this.$refs['target'].getSelectedData()
      this.resetAction()
      this.toLeftDto.roleId = []
      data.forEach(element => {
        this.toLeftDto.roleId.push(element.id)
      })
      deleteUserRole(this.toLeftDto).then(res => {
        if (res) {
          this.loadData()
        }
      })
    },
    moveToRight () {
      const data = this.$refs['source'].getSelectedData()
      this.resetAction()
      this.toRightDto.roleIds = []
      data.forEach(element => {
        this.toRightDto.roleIds.push(element.id)
      })
      addUserRole(this.toRightDto).then(res => {
        if (res) {
          this.loadData()
        }
      })
    },
    updateToLeftStatus (enable) {
      this.leftActive = enable
    },
    updateToRightStatus (enable) {
      this.rightActive = enable
    },
    setUserId (userId) {
      this.toLeftDto.userId = userId
      this.toRightDto.userId = userId
      this.userId = userId
      this.loadData()
    },
    loadData () {
      this.$refs['source'].loadData()
      this.$refs['target'].loadData()
    },
    getUserId () {
      return this.userId
    },
    toIndex () {
      this.resetAction()
      this.index()
    },
    resetAction () {
      this.leftActive = false
      this.rightActive = false
    }
  },
  inject: ['index'],
  provide () {
    return {
      updateToLeftStatus: this.updateToLeftStatus,
      updateToRightStatus: this.updateToRightStatus,
      getUserId: this.getUserId
    }
  }
}
</script>
