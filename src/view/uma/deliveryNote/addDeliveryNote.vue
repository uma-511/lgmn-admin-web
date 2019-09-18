<template>
  <Drawer title="添加出货单"
          :closable="true"
          :width='600'
          :mask-closable="false"
          v-model="showStatus"
          :label-width="100">
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline">
      <FormItem prop="clientName"
                label="客户名称">
        <Select v-model="formInline.customer"
                filterable>
          <Option v-for="item in clientList"
                  :value="item.name"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="汇款日期"
                prop="paymentTime">
        <DatePicker type="date"
                    format="yyyy-MM-dd"
                    v-model="formInline.paymentTime"
                    @on-change="onDataChange2"
                    placeholder="请选择日期"></DatePicker>
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
import { PostWithAuth } from '@/api/global'
export default {
  data () {
    return {
      showStatus: false,
      formInline: {
        customerId: 0,
        customer: '',
        paymentTime: ''
      },
      ruleInline: {
        customer: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ]
      },
      clientList: [{ id: 0, name: '' }]
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    clients (val) {
      this.clientList = val
    },
    names (val) {
      this.nameList = val
    },
    specses (val) {
      this.specsList = val
    },
    widths (val) {
      this.widthList = val
    },
    floors (val) {
      this.floorList = val
    },
    colors (val) {
      this.colorList = val
    },
    labels (val) {
      this.labelList = val
    },
    numbers (val) {
      this.numberList = val
    }
  },
  props: {
    width: Number,
    value: Boolean,
    clients: {
      type: Array,
      default () {
        return [{ id: 0, name: '' }]
      }
    },
    names: {
      type: Array,
      default () {
        return [{ id: 0, value: '' }]
      }
    },
    specses: {
      type: Array,
      default () {
        return [{ id: 0, value: '' }]
      }
    },
    widths: {
      type: Array,
      default () {
        return [{ id: 0, value: '' }]
      }
    },
    floors: {
      type: Array,
      default () {
        return [{ id: 0, value: '' }]
      }
    },
    colors: {
      type: Array,
      default () {
        return [{ id: 0, value: '' }]
      }
    },
    labels: {
      type: Array,
      default () {
        return [{ id: 0, name: '' }]
      }
    },
    numbers: {
      type: Array,
      default () {
        return [{ id: 0, num: '' }]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.setId()
      this.$refs['formInline'].validate((val) => {
        if (val) {
          PostWithAuth('deliveryNoteApi/add', this.formInline).then(res => {
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
      this.showStatus = false
    },
    onNumberChange (value) {
      if (value && value !== '') {
        let selectedNum = this.numberList.filter(this.numberFilter)
        this.formInline.name = selectedNum[0].name
        this.formInline.specs = selectedNum[0].specs
        this.formInline.width = selectedNum[0].width
      }
    },
    numberFilter (item) {
      if (this.formInline.number === item.num) {
        return true
      }
    },
    onSelectChange (value) {
      let selectedNum = this.numberList.filter(this.findNumberFilter)
      if (selectedNum.length > 0) {
        this.formInline.number = selectedNum[0].num
      } else {
        this.formInline.number = ''
      }
    },
    findNumberFilter (item) {
      if (this.formInline.name === item.name && this.formInline.specs === item.specs && this.formInline.width === item.width) {
        return true
      }
    },
    labelformatFilter (item) {
      if (this.formInline.labelName === item.name) {
        return true
      }
    },
    clientFilter (item) {
      if (this.formInline.customer === item.name) {
        return true
      }
    },
    onDataChange (dateStr, date) {
      this.formInline.deliveryDate = dateStr
    },
    onDataChange2 (dateStr, date) {
      this.formInline.paymentTime = dateStr
    },
    setId () {
      let client = this.clientList.filter(this.clientFilter)
      if (client.length > 0) {
        this.formInline.customerId = client[0].id
      }
    }
  },
  mounted () {
    // this.getConfigList()
    // this.getClientList()
    // this.getProductList()
    // this.getLabelFormatList()
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
