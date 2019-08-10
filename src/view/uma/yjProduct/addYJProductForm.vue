<template>
  <Drawer title="添加编号"
          :closable="true"
          :width='600'
          :mask-closable="true"
          v-model="showStatus">
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          :label-width="100">
      <FormItem label="编号"
                prop="num">
        <Input type="text"
               v-model="formInline.num" />
      </FormItem>
      <FormItem prop="name"
                label="名称">
        <Select v-model="formInline.name"
                filterable>
          <Option v-for="item in nameList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="str1"
                label="颜色">
        <Select v-model="formInline.str1"
                filterable>
          <Option v-for="item in colorList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="specs"
                label="规格">
        <Select v-model="formInline.specs"
                filterable>
          <Option v-for="item in specsList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="width"
                label="宽度">
        <Select v-model="formInline.width"
                filterable>
          <Option v-for="item in widthList"
                  :value="item.value"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
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
        num: '',
        name: '',
        specs: '',
        width: '',
        str1: ''
      },
      ruleInline: {
        num: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择名称', trigger: 'change' }
        ],
        specs: [
          { required: true, message: '请选择规格', trigger: 'change' }
        ],
        str1: [
          { required: true, message: '请选择颜色', trigger: 'change' }
        ],
        width: [
          { required: true, message: '请选择宽度', trigger: 'change' }
        ]
      },
      nameList: [{ id: 0, value: '' }],
      specsList: [{ id: 0, value: '' }],
      widthList: [{ id: 0, value: '' }],
      colorList: [{ id: 0, value: '' }]
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
      this.$refs['formInline'].validate((val) => {
        if (val) {
          PostWithAuth('yjProductApi/add', this.formInline).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('添加成功')
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
    getConfigList () {
      PostWithAuth('umaConfigApi/group', {}).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('获取配置成功')
          const configs = res.data.data.configs
          this.nameList = configs['0001']
          this.specsList = configs['0003']
          this.widthList = configs['0002']
          this.colorList = configs['0004']
        } else {
          this.$Message.error('获取配置失败')
        }
      })
    }
  },
  mounted () {
    this.getConfigList()
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
