<template>
  <div>
    <FormGenerator :schema='schema'
                   v-model="model"></FormGenerator>
    <Button @click="submit">提交</Button>
  </div>
</template>

<script>
import FormGenerator from '_c/form-generator'
export default {
  components: {
    FormGenerator
  },
  data () {
    return {
      schema: [{
        fieldType: 'Input',
        placeholder: 'Input test',
        name: 'input',
        label: 'Input',
        icon: 'ios-search',
        event: {
          'on-keyup': function () {
            console.log('change')
          },
          'on-click': this.submit
        },
        validate: [{ required: true, message: 'Item Input can not be empty', trigger: 'blur' }]
      }, {
        fieldType: 'Button',
        text: 'Button',
        event: {
          click: function () {
            console.log('click')
          }
        }
      }, {
        fieldType: 'Radio',
        text: 'Radio',
        name: 'radio',
        status: {
          hide: true
        }
      }],
      model: {

      }
    }
  },
  methods: {
    submit () {
      console.log(this.model)
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>
