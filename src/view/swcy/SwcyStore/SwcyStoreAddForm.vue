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
      <FormItem prop="uid"
                label="用户id">
        <Input v-model="formInline.uid" />
      </FormItem>
      <FormItem prop="brandId"
                label="品牌id">
        <Input v-model="formInline.brandId" />
      </FormItem>
      <FormItem prop="name"
                label="共享商名称">
        <Input v-model="formInline.name" />
      </FormItem>
      <FormItem prop="address"
                label="地址">
        <Input v-model="formInline.address" />
      </FormItem>
      <FormItem prop="lat"
                label="纬度">
        <Input v-model="formInline.lat" />
      </FormItem>
      <FormItem prop="lng"
                label="经度">
        <Input v-model="formInline.lng" />
      </FormItem>
      <FormItem prop="industryId"
                label="行业id">
        <Input v-model="formInline.industryId" />
      </FormItem>
      <FormItem prop="provinceId"
                label="省id">
        <Input v-model="formInline.provinceId" />
      </FormItem>
      <FormItem prop="cityId"
                label="市id">
        <Input v-model="formInline.cityId" />
      </FormItem>
      <FormItem prop="areaId"
                label="区id">
        <Input v-model="formInline.areaId" />
      </FormItem>
      <FormItem prop="likeVolume"
                label="点赞量">
        <Input v-model="formInline.likeVolume" />
      </FormItem>
      <FormItem prop="createTime"
                label="创建时间">
        <Input v-model="formInline.createTime" />
      </FormItem>
      <FormItem prop="photo"
                label="商店图片">
        <Input v-model="formInline.photo" />
      </FormItem>
      <FormItem prop="desc"
                label="">
        <Input v-model="formInline.desc" />
      </FormItem>
      <FormItem prop="industryName"
                label="行业名称">
        <Input v-model="formInline.industryName" />
      </FormItem>
      <FormItem prop="provinceName"
                label="省份">
        <Input v-model="formInline.provinceName" />
      </FormItem>
      <FormItem prop="cityName"
                label="城市">
        <Input v-model="formInline.cityName" />
      </FormItem>
      <FormItem prop="areaName"
                label="区县">
        <Input v-model="formInline.areaName" />
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
        uid: '',
        brandId: '',
        name: '',
        address: '',
        lat: '',
        lng: '',
        industryId: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        likeVolume: '',
        createTime: '',
        photo: '',
        desc: '',
        industryName: '',
        provinceName: '',
        cityName: '',
        areaName: ''
      },
      ruleInline: {
        id: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        uid: [
          { required: true, message: '请选择用户id', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择品牌id', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择共享商名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择地址', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请选择纬度', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '请选择经度', trigger: 'blur' }
        ],
        industryId: [
          { required: true, message: '请选择行业id', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择省id', trigger: 'blur' }
        ],
        cityId: [
          { required: true, message: '请选择市id', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '请选择区id', trigger: 'blur' }
        ],
        likeVolume: [
          { required: true, message: '请选择点赞量', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请选择创建时间', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '请选择商店图片', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        industryName: [
          { required: true, message: '请选择行业名称', trigger: 'blur' }
        ],
        provinceName: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ],
        cityName: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请选择区县', trigger: 'blur' }
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
