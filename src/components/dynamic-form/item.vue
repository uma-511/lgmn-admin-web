<template>
  <form-expand :type="type"
               v-model="value"
               :props='props'
               :render="render">
  </form-expand>
</template>

<script>
import FormExpand from './expand'
export default {
  name: 'DynamicItem',
  components: {
    FormExpand
  },
  props: {
    value: String | Array | Object,
    type: String,
    props: Object,
    render: Function
  },
  mounted () {
    // console.log(children)
  }
}
</script>
