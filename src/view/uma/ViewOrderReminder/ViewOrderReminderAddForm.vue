<template>
  <Drawer title="添加订单"
          :closable="true"
          :width='width'
          :mask-closable="true"
          v-model="showStatus">
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          :label-width="100">
      <FormItem prop="id"
                label="">
        <Input v-model="formInline.id" />
      </FormItem>
      <FormItem prop="name"
                label="客户名称">
        <Input v-model="formInline.name" />
      </FormItem>
      <FormItem prop="phone"
                label="联系电话">
        <Input v-model="formInline.phone" />
      </FormItem>
      <FormItem prop="createTime"
                label="创建时间">
        <Input v-model="formInline.createTime" />
      </FormItem>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px"
              @click="handleCancel()">{{$t('cancel')}}</Button>
      <Button type="primary"
              style="margin-right: 8px"
              @click="handleSubmit()">{{$t('submit')}}</Button>
    </div>
  </Drawer>
</template>

<script>
import { PostWithAuth } from '@/api/global'
import { clone } from '@/libs/tools'
export default {
  data () {
    return {
      showStatus: false,
      formInline: {
        id: '',
        name: '',
        phone: '',
        createTime: ''
      },
      ruleInline: {
        id: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择客户名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请选择联系电话', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请选择创建时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.setId()
      this.$refs['formInline'].validate((val) => {
        if (val) {
          let saveDto = clone(this.formInline)
          PostWithAuth(this.saveUrl, saveDto).then(res => {
            if (res.data.code === '200') {
              // this.$Message.success('添加成功')
              this.showStatus = false
              this.$refs['formInline'].resetFields()
              this.$emit('on-added')
            } else {
              this.$Message.error('添加失败')
            }
          })
        } else {
          this.$Message.error('请填写必填项')
        }
      })
    },
    handleCancel () {
      this.$refs['formInline'].resetFields()
      this.showStatus = false
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
    }
  },
  props: {
    width: {
      type: Number,
      default () {
        return 600
      }
    },
    value: Boolean,
    saveUrl: String
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
