<template>
  <div>
    <Drawer :title="$t(status)"
            v-model="showStatus"
            :width="width"
            :mask-closable="false"
            :styles="styles">
      <!-- <Form ref="formDynamic"
            :model="formDynamic"
            :label-width="80"
            style="width: 300px">
        <FormItem v-for="(item, index) in formDynamic"
                  v-if="!item[status] || item[status]===1 || item[status]['render']"
                  v-show="!item[status] || !item[status]['hide']"
                  :key="index"
                  :label="item.label"
                  :prop="index + '.value'"
                  :rules="{required: true, message: 'Item ' + item.label +' can not be empty', trigger: 'blur'}">
          <Input type="text"
                 :ref="index"
                 v-model="item.value"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form> -->
      <!-- <dynamic-item v-model="item.value"
                        :props="item[status]&&item[status].props?item[status].props:{}"
                        :type="item.type">
          </dynamic-item> -->
      <form-create ref="fc"
                   v-model="fApi"
                   :rule="formDynamic"
                   :option="option"></form-create>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px"
                @click="handleCancel('formDynamic')">{{$t('cancel')}}</Button>
        <Button type="primary"
                style="margin-right: 8px"
                @click="handleSubmit('formDynamic')">{{$t('submit')}}</Button>
        <Button type="info"
                @click="handleReset('formDynamic')">重置</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { PostWithAuth } from '@/api/global'
import { getAddUserForm } from '@/api/data'
export default {
  components: {
  },
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
      id: '',
      formDynamic: [],
      fApi: {},
      model: {},
      option: {
        submitBtn: false
      }
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
    formData: Array,
    width: Number,
    createUrl: {
      type: String,
      default: ''
    },
    updateUrl: {
      type: String,
      default: ''
    },
    detailUrl: {
      type: String,
      default: ''
    },
    currentId: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    // formData (val) {
    //   const _d = val
    //   this.formDynamic = _d
    // },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    currentId (val) {
      this.id = val
      console.log(val)
      this.getDetail()
    },
    status (val) {
      switch (this.status) {
        case 'add':
          getAddUserForm().then(res => {
            console.log(res)
            if (res) {
              this.formDynamic = res.data
            }
          })
          break
        case 'edit':
          break
        case 'detail':
          break
      }
    },
    methods: {
      initFormData () {
        if (id !== '') {
          if (this.status === 'update') {

          }
        }
      },
      handleSubmit (name) {
        this.fApi.validate(() => {
          this.fApi.submit((formData) => {
            switch (this.status) {
              case 'add':
                this.handlerCreateSubmit(formData)
                break
              case 'edit':
                this.handlerUpdateSubmit(formData)
                break
              default:
                console.log('请传入正确提交地址')
                break
            }
            console.log(formData)
          })
        }, () => {
          alert('验证失败')
        })
      },
      handlerCreateSubmit (formData) {
        if (this.createUrl !== '') {
          PostWithAuth(this.createUrl, formData).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('添加成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('此号码已存在，请确认')
              }
            }
            this.showStatus = false
          })
        } else {
          this.$emit('on-create-commit', formData)
        }
      },
      handlerUpdateSubmit (formData) {
        if (this.updateUrl !== '') {
          PostWithAuth(this.updateUrl, formData).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('修改成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('修改失败')
              }
            }
            this.showStatus = false
          })
        } else {
          this.$emit('on-update-commit', formData)
        }
      },
      getDetail () {
        if (this.detailUrl !== '') {
          PostWithAuth(this.detailUrl + '/' + this.id, {}).then(res => {
            if (res.data.code === '200') {
              this.fApi.setValue(res.data.data)
              this.$Message.success('获取表单数据成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('获取表单数据失败')
                this.showStatus = false
              }
            }
          })
        } else {
          console.error('请提供detailUrl')
        }
      },
      handleReset (name) {
        this.fApi.resetFields()
      },
      handleCancel (name) {
        this.handleReset(name)
        this.showStatus = false
      },
      handleTest () {
      }
    },
    mounted () {
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
