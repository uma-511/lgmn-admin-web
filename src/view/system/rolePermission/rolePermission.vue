<template>
  <div>
    <Row type="flex"
         justify="center"
         align="middle">
      <Col span="11">
      可选权限：
      <div>
        <RolePermissionSource ref="source">
        </RolePermissionSource>
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
      <RolePermissionTarget ref="target">
      </RolePermissionTarget>
      </Col>
    </Row>
  </div>
</template>

<script>
import RolePermissionSource from './rolePermissionSource'
import RolePermissionTarget from './rolePermissionTarget'
import { addRolePermission, deleteRolePermission } from '@/api/rolePermission'
export default {
  name: 'RolePermission',
  components: {
    RolePermissionSource,
    RolePermissionTarget
  },
  data () {
    return {
      leftActive: false,
      rightActive: false,
      sourceSelectedData: [],
      targetSelectedData: [],
      toLeftDto: {
        roleId: '',
        permissionId: []
      },
      toRightDto: {
        roleId: '',
        permissionIds: []
      },
      roleId: ''
    }
  },
  methods: {
    moveToLeft () {
      const data = this.$refs['target'].getSelectedData()
      this.toLeftDto.permissionId = []
      this.resetAction()
      data.forEach(element => {
        this.toLeftDto.permissionId.push(element.id)
      })
      deleteRolePermission(this.toLeftDto).then(res => {
        if (res) {
          this.loadData()
        }
      })
    },
    moveToRight () {
      const data = this.$refs['source'].getSelectedData()
      this.toRightDto.permissionIds = []
      this.resetAction()
      data.forEach(element => {
        this.toRightDto.permissionIds.push(element.id)
      })
      addRolePermission(this.toRightDto).then(res => {
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
    setRoleId (roleId) {
      this.toLeftDto.roleId = roleId
      this.toRightDto.roleId = roleId
      this.roleId = roleId
      this.loadData()
    },
    loadData () {
      this.$refs['source'].loadData()
      this.$refs['target'].loadData()
    },
    getRoleId () {
      return this.roleId
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
      getRoleId: this.getRoleId
    }
  }
}
</script>
