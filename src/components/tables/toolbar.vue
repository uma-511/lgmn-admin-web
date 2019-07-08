<template>
  <div>
    <form-create ref="searchBar"
                 v-model="fApi"
                 :rule="formDynamic"
                 :option="option"></form-create>
  </div>
</template>
<script>
export default {
  name: 'TablesToolBar',
  data () {
    return {
      formDynamic: [],
      fApi: {},
      model: {},
      option: {
        submitBtn: false,
        form: {
          inline: true,
          labelPosition: 'right',
          labelWidth: 90
        }
      }
    }
  },
  props: {
    formData: Array
  },
  watch: {
    formData (val) {
      const _d = val
      this.formDynamic = _d
    }
  }
}
</script>
