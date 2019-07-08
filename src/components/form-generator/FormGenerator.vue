<template>
  <div>
    <Form ref="formDynamic"
          :model="formData"
          :label-width="80"
          style="width: 300px">
      <FormItem v-for='(field, index) in schema'
                v-if="!field['status'] || field['status']===1 || field['status']['render']"
                v-show="!field['status'] || !field['status']['hide']"
                :key="index"
                :label="field.label"
                :prop='field.value'
                :rules="field.validate">
        <component :is='field.fieldType'
                   :value='field.value'
                   @input='updateForm(field.name, $event)'
                   v-on='field.event'
                   v-bind='field'>
          {{field.text}}
        </component>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'FormGenerator',
  // components: { NumberInput, SelectList, TextInput },
  props: ['schema', 'value'],
  data () {
    return {
      formData: this.value || {}
    }
  },
  methods: {
    updateForm (fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit('input', this.formData)
    },
    submit () {
      console.log('change')
    }
  }
}
</script>
