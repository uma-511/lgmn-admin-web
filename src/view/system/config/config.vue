<template>
  <card>
    <Row>
      <Col span="12">
      <div>配置类别</div>
      <UmaConfig @on-type-id-change="onTypeIdChage"></UmaConfig>
      </Col>
      <Col span="12">
      <div>配置值</div>
      <UmaConfigValue ref="configValue"></UmaConfigValue>
      </Col>
    </Row>
  </card>
</template>

<script>
import UmaConfig from '../umaConfig/umaConfig'
import UmaConfigValue from '../umaConfigValue/umaConfigValue'
export default {
  components: {
    UmaConfig,
    UmaConfigValue
  },
  methods: {
    onTypeIdChage (typeId) {
      this.$refs['configValue'].getData(typeId)
    }
  }

}
</script>
