<template>
        <Drawer title="添加客户联系人" :transfer="false" :inner="true" :width="500" :mask-closable="false" v-model="showStatus">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
              <FormItem label="请选择客户" prop="customerId">
                <Select v-model="formInline.customerId" filterable>
                  <Option v-for="item in customerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem prop="name" label="联系人姓名">
                  <Input type="text" v-model="formInline.name" />
              </FormItem>
              <FormItem prop="phone" label="联系电话">
                  <Input type="text" v-model="formInline.phone" />
              </FormItem>
              <FormItem prop="position" label="职位">
                  <Input type="text" v-model="formInline.position" />
              </FormItem>
              <FormItem prop="remark" label="备注">
                  <Input type="text" v-model="formInline.remark" />
              </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px"
                    @click="handleCancel()">{{$t('cancel')}}</Button>
            <Button type="primary"
                    style="margin-right: 8px"
                    @click="handleSubmit('formInline')">{{$t('submit')}}</Button>
          </div>
        </Drawer>
</template>
<script>
import { getCustomerList, add } from '@/api/myAddForm'
export default {
  data () {
    return {
      showStatus: false,
      formInline: {
        customerId: '',
        name: '',
        phone: '',
        position: '',
        remark: ''
      },
      ruleInline: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'blur', type: 'number' }
        ],
        name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      customerList: []
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
    width: Number,
    value: Boolean
  },
  methods: {
    handleSubmit () {
      console.log(this.formInline.customerId)
      this.$refs['formInline'].validate((val) => {
        if (val) {
          add(this.formInline).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('添加成功')
              this.showStatus = false
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
      this.showStatus = false
    },
    getCustomerList () {
      getCustomerList().then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取客户列表成功')
          this.customerList = res.data.data
        } else {
          this.$Message.error('获取客户列表失败')
        }
      })
    }
  },
  mounted () {
    this.getCustomerList()
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
