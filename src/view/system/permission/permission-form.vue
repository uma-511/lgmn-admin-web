<template>
  <form-create ref="fc"
               v-model="fApi"
               :rule="formDynamic"
               :option="option"></form-create>
</template>
<script>
import addFormRule from './form/add-permission-form'
export default {
  data () {
    return {
      formDynamic: addFormRule,
      fApi: {},
      model: {},
      option: {
        submitBtn: false,
        props: {
          'label-width': 200,
          inline: true
        }
      }
    }
  }
}
</script>
