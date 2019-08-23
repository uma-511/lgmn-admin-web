<template>
  <card>
    <Row>
      <Col span="9">
      <div>设备分组</div>
      <UmaDeviceGroup @on-type-id-change="onTypeIdChage"></UmaDeviceGroup>
      </Col>
      <Col span="15">
      <div>设备列表</div>
      <UmaDevice ref="devices"></UmaDevice>
      </Col>
    </Row>
  </card>
</template>

<script>
import UmaDevice from '../umaDevice/umaDevice'
import UmaDeviceGroup from '../umaDeviceGroup/umaDeviceGroup'
export default {
  components: {
    UmaDevice,
    UmaDeviceGroup
  },
  methods: {
    onTypeIdChage (group) {
      this.$refs['devices'].getData(group)
    }
  }
}
</script>
