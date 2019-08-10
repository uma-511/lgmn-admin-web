<template>
  <Drawer title="修改订单"
          :closable="true"
          :width='600'
          :mask-closable="false"
          v-model="showStatus">
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          :label-width="100">
      <FormItem label="编号"
                prop="number">
        <Input v-show="!showNubmerSelect"
               v-model="formInline.number"
               @on-focus="numberInputFoucs" />
        <Select v-show="showNubmerSelect"
                v-model="numberValue.value"
                :label="numberValue.label"
                ref='number'
                @on-change="onNumberChange"
                @on-clear="onNumberClear"
                clearable
                filterable
                remote
                label-in-value
                :loading="loadingNumber"
                :remote-method="remoteNumber">
          <Option v-for="item in numberList"
                  :value="item.id"
                  :label="item.num"
                  :key="item.id">{{ item.num }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="name"
                label="名称">
        <Select v-model="formInline.name"
                @on-change="onSelectChange"
                filterable>
          <Option v-for="item in nameList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="specs"
                label="规格">
        <Select v-model="formInline.specs"
                @on-change="onSelectChange"
                filterable>
          <Option v-for="item in specsList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="width"
                label="宽度">
        <Select v-model="formInline.width"
                @on-change="onSelectChange"
                filterable>
          <Option v-for="item in widthList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="color"
                label="颜色">
        <Select v-model="formInline.color"
                filterable>
          <Option v-for="item in colorList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="labelName"
                label="标签模板">
        <Select v-model="formInline.labelName"
                filterable>
          <Option v-for="item in labelList"
                  :value="item.name"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="交货日期"
                prop="deliveryDate">
        <DatePicker type="date"
                    format="yyyy-MM-dd"
                    v-model="formInline.deliveryDate"
                    @on-change="onDataChange"
                    placeholder="请选择日期"></DatePicker>
      </FormItem>
      <FormItem prop="clientName"
                label="客户名称">
        <Input v-show="!showClientSelect"
               v-model="formInline.clientName"
               @on-focus="clientInputFoucs" />
        <Select v-model="clientValue.value"
                v-show="showClientSelect"
                :label="clientValue.label"
                ref="clientName"
                clearable
                filterable
                remote
                label-in-value
                @on-change="onClientChange"
                @on-clear="onClientClear"
                :loading="loadingClient"
                :remote-method="remoteClient">
          <Option v-for="item in clientList"
                  :value="item.id"
                  :label="item.name"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="floor"
                label="楼层">
        <Select v-model="formInline.floor"
                filterable>
          <Option v-for="item in floorList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="plannedQuantity"
                label="计划数量">
        <InputNumber :step="1"
                     :min="0"
                     v-model="formInline.plannedQuantity"></InputNumber>
      </FormItem>
      <FormItem prop="perPackQuantity"
                label="每包饼数">
        <InputNumber :step="1"
                     :min="0"
                     v-model="formInline.perPackQuantity"></InputNumber>
      </FormItem>
      <FormItem prop="requirement"
                label="工艺要求">
        <Input type="textarea"
               minRows=2
               maxRows=6
               v-model="formInline.requirement" />
      </FormItem>
      <FormItem prop="remark"
                label="备注">
        <Input type="textarea"
               minRows=2
               maxRows=6
               v-model="formInline.remark" />
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
      showNubmerSelect: false,
      showClientSelect: false,
      formInline: {
        number: '',
        name: '',
        specs: '',
        width: '',
        color: '',
        labelId: 0,
        labelName: '',
        requirement: '',
        plannedQuantity: 0,
        perPackQuantity: 0,
        remark: '',
        deliveryDate: '',
        clientId: 0,
        clientName: '',
        floor: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请选择名称', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: '请选择规格', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请选择宽度', trigger: 'blur' }
        ]
      },
      clientList: [{ id: 0, name: '' }],
      nameList: [{ id: 0, value: '' }],
      specsList: [{ id: 0, value: '' }],
      widthList: [{ id: 0, value: '' }],
      floorList: [{ id: 0, value: '' }],
      colorList: [{ id: 0, value: '' }],
      labelList: [{ id: 0, name: '' }],
      numberList: [{ id: 0, num: '' }],
      loadingNumber: false,
      loadingClient: false,
      numberValue: {
        label: 0,
        value: ''
      },
      clientValue: {
        label: 0,
        value: ''
      }
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    showStatus (val) {
      this.$emit('on-value-change', val)
      if (val) {
        this.showNubmerSelect = false
        this.showClientSelect = false
        this.getDetail()
      }
    },
    currentId (val) {
      this.currentId = val
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
    },
    numberList (val) {
      if (val.length === 1) {
        this.numberValue.label = val[0].num
      } else if (val.length > 1) {
        // this.$refs['number'].setQuery(val[0].num)
        this.touch()
      } else {
        this.formInline.number = ''
      }
    },
    clientList (val) {
      if (val.length === 1) {
        // this.numberValue.value = val[0].name
        this.numberValue.label = val[0].name
      } else if (val.length > 1) {
        // this.$refs['clientName'].setQuery(val[0].name)
      } else {
        this.formInline.client = ''
      }
    }
  },
  props: {
    width: Number,
    value: Boolean,
    currentId: String | Number,
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
          PostWithAuth('yjOrderApi/update', this.formInline).then(res => {
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
    onNumberChange (value) {
      if (value && value.value !== '') {
        this.numberValue = value
        let selectedNum = this.numberList.filter(this.numberFilter)
        this.formInline.number = value.label
        this.formInline.name = selectedNum[0].name
        this.formInline.specs = selectedNum[0].specs
        this.formInline.width = selectedNum[0].width
        this.formInline.color = selectedNum[0].str1
      }
    },
    onClientChange (value) {
      if (value && value.value !== '') {
        this.clientValue = value
        this.formInline.clientName = value.label
        this.formInline.clientId = value.value
      }
    },
    numberFilter (item) {
      if (this.numberValue.value === item.id) {
        return true
      }
    },
    onNumberClear () {
      this.numberValue = {
        label: '',
        value: 0
      }
      this.numberList = [{ id: 0, num: '' }]
    },
    onClientClear () {
      this.clientValue = {
        label: '',
        value: 0
      }
      this.clientList = [{ id: 0, name: '' }]
    },
    onSelectChange (value) {
      if (value && this.formInline.name !== '' && this.formInline.specs !== '' && this.formInline.width !== '' && this.formInline.color !== '') {
        let dto = { name: this.formInline.name, specs: this.formInline.specs, width: this.formInline.width, str1: this.formInline.color }
        this.queryNumber(dto)
      }
    },
    findNumberFilter (item) {
      if (this.formInline.name === item.name && this.formInline.specs === item.specs && this.formInline.width === item.width && this.formInline.color === item.str1) {
        return true
      }
    },
    setId () {
      let labelFormat = this.labelList.filter(this.labelformatFilter)
      if (labelFormat.length > 0) {
        this.formInline.labelId = labelFormat[0].id
      }

      let client = this.clientList.filter(this.clientFilter)
      if (client.length > 0) {
        this.formInline.clientId = client[0].id
      }
    },
    labelformatFilter (item) {
      if (this.formInline.labelName === item.name) {
        return true
      }
    },
    clientFilter (item) {
      if (this.formInline.clientName === item.name) {
        return true
      }
    },
    onDataChange (dateStr, date) {
      this.formInline.deliveryDate = dateStr
    },
    getDetail () {
      PostWithAuth('yjOrderApi/detail/' + this.currentId, {}).then(res => {
        if (res.data.code === '200') {
          const data = res.data.data
          this.formInline = data
          this.formInline.deliveryDate = new Date(data.deliveryDate)
          this.remoteClient(data.clientName)
          this.onSelectChange(1)
        } else {
          this.$Message.error('获取订单详情失败')
        }
      })
    },
    remoteNumber (query) {
      if (query !== '' && this.numberValue.label !== query) {
        let dto = { num: query }
        this.queryNumber(dto)
      }
    },
    queryNumber (dto) {
      this.loadingNumber = true
      PostWithAuth('yjProductApi/productSelectList', dto).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('获取编号成功')
          const data = res.data.data
          this.numberList = data
          this.loadingNumber = false
        } else {
          this.$Message.error('获取编号失败')
          this.loadingNumber = false
        }
      })
    },
    touch () {
      this.$refs['number'].toggleMenu(null, true)
    },
    remoteClient (query) {
      if (query !== '') {
        let dto = { name: query }
        this.queryClient(dto)
      }
    },
    queryClient (dto) {
      this.loadingClient = true
      PostWithAuth('customerApi/customerSelectList', dto).then(res => {
        if (res.data.code === '200') {
          // this.$Message.success('获取配置成功')
          const data = res.data.data
          this.clientList = data
          this.loadingClient = false
        } else {
          this.$Message.error('获取客户失败')
          this.loadingClient = false
        }
      })
    },
    numberInputFoucs () {
      this.showNubmerSelect = true
      const number = this.formInline.number
      this.formInline.number = ''
      this.$refs['number'].setQuery(number)
    },
    clientInputFoucs () {
      this.showClientSelect = true
    }
  },
  mounted () {
    // this.getConfigList()
    // this.getClientList()
    // this.getProductList()
    // this.getLabelFormatList()
    // this.getDetail()
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
