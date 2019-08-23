<template>
  <Drawer title="修改订单"
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
                label="名称">
        <Input v-model="formInline.name" />
      </FormItem>
      <FormItem prop="specs"
                label="规格">
        <Input v-model="formInline.specs" />
      </FormItem>
      <FormItem prop="width"
                label="宽度">
        <Input v-model="formInline.width" />
      </FormItem>
      <FormItem prop="color"
                label="颜色">
        <Input v-model="formInline.color" />
      </FormItem>
      <FormItem prop="planned_quantity"
                label="计划数量">
        <Input v-model="formInline.planned_quantity" />
      </FormItem>
      <FormItem prop="floor"
                label="楼层">
        <Input v-model="formInline.floor" />
      </FormItem>
      <FormItem prop="finished_quantity"
                label="">
        <Input v-model="formInline.finished_quantity" />
      </FormItem>
      <FormItem prop="delivery_date"
                label="交货日期">
        <Input v-model="formInline.delivery_date" />
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
export default {
  data () {
    return {
      showStatus: false,
      formInline: {
        id: '',
        name: '',
        specs: '',
        width: '',
        color: '',
        planned_quantity: '',
        floor: '',
        finished_quantity: '',
        delivery_date: ''
      },
      ruleInline: {
        id: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择名称', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: '请选择规格', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请选择宽度', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请选择颜色', trigger: 'blur' }
        ],
        planned_quantity: [
          { required: true, message: '请选择计划数量', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '请选择楼层', trigger: 'blur' }
        ],
        finished_quantity: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        delivery_date: [
          { required: true, message: '请选择交货日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formInline'].validate((val) => {
        if (val) {
          let editDto = this.formInline
          PostWithAuth(this.editUrl, editDto).then(res => {
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
    },
    getDetail () {
      PostWithAuth(this.detailUrl + this.currentId, {}).then(res => {
        if (res.data.code === '200') {
          const data = res.data.data
          this.formInline = data
        } else {
          this.$Message.error('获取订单详情失败')
        }
      })
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    currentId (val) {
      this.currentId = val
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
    currentId: String | Number,
    editUrl: String,
    detailUrl: String
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
