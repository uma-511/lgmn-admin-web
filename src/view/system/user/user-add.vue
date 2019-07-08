<template>
  <div>
    <Drawer :title="$t(status)"
            v-model="showStatus"
            width="500"
            :mask-closable="false"
            :styles="styles">
      <!-- <Form ref="formDynamic"
            :model="formDynamic"
            :label-width="80"
            style="width: 300px">
        <FormItem v-for="(item, index) in formDynamic"
                  v-if="item[status]"
                  :key="index"
                  :label="item.label"
                  :prop="index + '.value'"
                  :rules="{required: true, message: 'Item ' + item.label +' can not be empty', trigger: 'blur'}">
          <Input type="text"
                 v-model="item.value"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form> -->
      <form-create :rule='formCreateRule'></form-create>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px"
                @click="showStatus = false">{{$t('cancel')}}</Button>
        <Button type="primary"
                style="margin-right: 8px"
                @click="showStatus = false">{{$t('submit')}}</Button>
        <Button type="info"
                @click="reset">重置</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showStatus: false,
      styles: {
        height: 'calc(100% - 105px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      index: 1,
      formDynamic: {

      },
      formCreateRule: []
    }
  },
  props: {
    status: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['add', 'edit', 'detail'].indexOf(value) !== -1
      }
    },
    value: Boolean,
    formData: Object,
    formCreateData: Array
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    formData (val) {
      this.formDynamic = val
    },
    formCreateRule (val) {
      this.formCreateRule = val
    },
    showStatus (val) {
      if (!val) {
        this.$refs['formDynamic'].resetFields()
      }
      this.$emit('on-value-change', val)
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleAdd () {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.formDynamic.items[index].status = 0
    },
    reset () {
      this.$refs['formDynamic'].resetFields()
    }
  }
}
</script>
<style>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
