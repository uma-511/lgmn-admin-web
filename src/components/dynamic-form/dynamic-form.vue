<template>
  <div>
    <Drawer :title="$t(status)"
            style="z-index: 999"
            v-model="showStatus"
            :width="width"
            :transfer="transfer"
            :inner="inner"
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
        <!-- <Button type="info"
                @click="handleReset('formDynamic')">重置</Button>
        <Button type="info"
                @click="handleTest">test</Button> -->
      </div>
    </Drawer>
  </div>
</template>
<script>
import DynamicItem from './item'
import { PostWithAuth } from '@/api/global'
import { setTimeout } from 'timers'

export default {
  components: {
    DynamicItem
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
      },
      first: true,
      gettingDetail: false
    }
  },
  props: {
    status: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['add', 'edit', 'detail', ''].indexOf(value) !== -1
      }
    },
    value: Boolean,
    transfer: {
      type: Boolean,
      default: true
    },
    inner: {
      type: Boolean,
      default: false
    },
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
      type: String | Number,
      default: ''
    },
    initData: {
      type: Object,
      default: () => { return {} }
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
      if ((this.status === 'edit' || this.status === 'detail') && val && !this.first) {
        this.id = this.currentId
        this.getDetail()
      } else {
        this.first = false
      }
    },
    status (val) {
      // if ((val === 'edit' || val === 'detail') && !this.first) {
      //   this.getDetail()
      // }
    },
    formData (val) {
      const _d = val
      this.formDynamic = _d
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    currentId (val) {
      this.id = val
      this.getDetail()
    },
    initData (val) {
      let _t = this
      this.initData = val
      setTimeout(function () {
        _t.setInitData()
      }, 500)
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
            this.fApi.resetFields()
            this.$emit('on-add-success')
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
            this.$emit('on-update-success')
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
        if (!this.gettingDetail) {
          this.gettingDetail = true
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
            this.gettingDetail = false
          })
        }
      } else {
        console.error('请提供detailUrl')
      }
    },
    setInitData () {
      this.fApi.setValue(this.initData)
    },
    handleReset (name) {
      this.fApi.resetFields()
    },
    handleCancel (name) {
      this.handleReset(name)
      this.showStatus = false
    },
    handleTest () {
      console.log(this.currentId, this.detailUrl)
    }
  },
  mounted () {
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
