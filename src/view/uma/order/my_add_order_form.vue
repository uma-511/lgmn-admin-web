<template>
  <Drawer title="添加订单"
          :width="500"
          @on-close="onCloseDrawer"
          :mask-closable="false"
          v-model="showStatus">
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          :label-width="100">
      <FormItem label="ID"
                hidden>
        <Input type="text"
               v-model="formInline.id" />
      </FormItem>
      <FormItem prop="orderNo"
                label="订单号">
        <Input type="text"
               v-model="formInline.orderNo" />
      </FormItem>
      <FormItem label="请选择产品"
                prop="prodId">
        <Select v-model="formInline.prodId"
                filterable
                @on-change="prodSelectChange">
          <Option v-for="item in prodList"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="请选择型号"
                prop="modelId">
        <Select v-model="formInline.modelId"
                filterable>
          <Option v-for="item in modelList"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="请选择客户"
                prop="clientId">
        <Select v-model="formInline.clientId"
                filterable>
          <Option v-for="item in clientList"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="请选择标签"
                prop="lableId">
        <Select v-model="formInline.lableId"
                filterable>
          <Option v-for="item in lableList"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="工艺要求"
                prop="requirement">
        <Input type="text"
               v-model="formInline.requirement" />
      </FormItem>
      <FormItem label="备注"
                prop="remark">
        <Input type="text"
               v-model="formInline.remark" />
      </FormItem>
      <FormItem label="计划数量"
                prop="quantity">
        <Input type="number"
               v-model="formInline.quantity" />
      </FormItem>
      <FormItem label="交货时间"
                prop="deliveryDate">
        <DatePicker type="date"
                    :options="notOptionalData"
                    placeholder="选择时间"
                    v-model="formInline.deliveryDate"></DatePicker>
      </FormItem>
      <FormItem label="楼层"
                prop="int01">
        <Input type="number"
               v-model="formInline.int01" />
      </FormItem>
      <FormItem label="每包数量"
                prop="int02">
        <Input type="number"
               v-model="formInline.int02" />
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
import { getCustomerList } from '@/api/customerApi'
import { getLabelFormatAllList } from '@/api/labelFormatApi'
import { getModelAllList } from '@/api/modelApi'
import { getProductAllList } from '@/api/productApi'
import { add, edit } from '@/api/orderApi'
export default {
  data () {
    return {
      showStatus: false,
      notOptionalData: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      ruleInline: {
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' }
        ],
        prodId: [
          { required: true, message: '请选择产品', trigger: 'blur', type: 'number' }
        ],
        modelId: [
          { required: true, message: '请选择型号', trigger: 'blur', type: 'number' }
        ],
        clientId: [
          { required: true, message: '请选择客户', trigger: 'blur', type: 'number' }
        ],
        lableId: [
          { required: true, message: '请选择标签', trigger: 'blur', type: 'number' }
        ],
        requirement: [
          { required: false, message: '请输入工艺要求', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' }
        ],
        quantity: [
          {
            required: true,
            message: '请输入有效数量',
            type: 'number',
            trigger: 'blur',
            transform (value) {
              if (value === '' || value < 1) {
                return false
              }
              return Number(value)
            }
          }
        ],
        int01: [
          {
            required: true,
            message: '请输入楼层',
            type: 'number',
            trigger: 'blur',
            transform (value) {
              if (value === '') {
                return false
              }
              return Number(value)
            }
          }
        ],
        int02: [
          {
            required: true,
            message: '请输入有效数量',
            type: 'number',
            trigger: 'blur',
            transform (value) {
              if (value === '' || value < 1) {
                return false
              }
              return Number(value)
            }
          }
        ],
        deliveryDate: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请选择交货时间',
            transform (value) {
              if (value === '') {
                return false
              } else {
                return Date(value)
              }
            }
          }
        ]
      },
      prodList: [],
      modelList: [],
      clientList: [],
      lableList: []
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    formInline (val) {
      if (val.prodId !== '') {
        this.getModelAllList()
      }
    }
  },
  props: {
    width: Number,
    value: Boolean,
    formInline: Object
  },
  methods: {
    handleSubmit () {
      this.$refs['formInline'].validate((val) => {
        if (val) {
          if (this.formInline.id === '') {
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
            edit(this.formInline).then(res => {
              if (res.data.code === '200') {
                this.$Message.success('修改成功')
                this.showStatus = false
                this.$emit('on-added')
              } else {
                this.$Message.error('修改失败')
              }
            })
          }
        } else {
          this.$Message.error('请填写必填项')
        }
      })
    },
    handleCancel () {
      this.showStatus = false
    },
    onCloseDrawer () {
      this.showStatus = false
    },
    getProductAllList () {
      getProductAllList().then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取产品列表成功')
          this.prodList = res.data.data
        } else {
          this.$Message.error('获取产品列表失败')
        }
      })
    },
    getModelAllList (val) {
      getModelAllList({ pid: val }).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取型号列表成功')
          this.modelList = res.data.data
        } else {
          this.$Message.error('获取型号列表失败')
        }
      })
    },
    getCustomerList () {
      getCustomerList().then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取客户列表成功')
          this.clientList = res.data.data
        } else {
          this.$Message.error('获取客户列表失败')
        }
      })
    },
    getLabelFormatAllList () {
      getLabelFormatAllList().then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取标签列表成功')
          this.lableList = res.data.data
        } else {
          this.$Message.error('获取标签列表失败')
        }
      })
    },
    prodSelectChange (val) {
      this.getModelAllList(val)
    }
  },
  mounted () {
    this.getProductAllList()
    this.getCustomerList()
    this.getLabelFormatAllList()
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
