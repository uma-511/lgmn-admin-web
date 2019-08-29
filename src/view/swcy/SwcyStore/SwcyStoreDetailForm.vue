<template>
  <Drawer title="详情"
          :closable="true"
          :width='width'
          :mask-closable="true"
          v-model="showStatus">
    <Form ref="formInline"
          :model="formInline"
          :label-width="100">
      <FormItem prop="id"
                label="">
        <Input readOnly v-model="formInline.id" />
      </FormItem>
      <FormItem prop="uid"
                label="用户id">
        <Input readOnly v-model="formInline.uid" />
      </FormItem>
      <FormItem prop="brandId"
                label="品牌id">
        <Input readOnly v-model="formInline.brandId" />
      </FormItem>
      <FormItem prop="name"
                label="共享商名称">
        <Input readOnly v-model="formInline.name" />
      </FormItem>
      <FormItem prop="address"
                label="地址">
        <Input readOnly v-model="formInline.address" />
      </FormItem>
      <FormItem prop="lat"
                label="纬度">
        <Input readOnly v-model="formInline.lat" />
      </FormItem>
      <FormItem prop="lng"
                label="经度">
        <Input readOnly v-model="formInline.lng" />
      </FormItem>
      <FormItem prop="industryId"
                label="行业id">
        <Input readOnly v-model="formInline.industryId" />
      </FormItem>
      <FormItem prop="provinceId"
                label="省id">
        <Input readOnly v-model="formInline.provinceId" />
      </FormItem>
      <FormItem prop="cityId"
                label="市id">
        <Input readOnly v-model="formInline.cityId" />
      </FormItem>
      <FormItem prop="areaId"
                label="区id">
        <Input readOnly v-model="formInline.areaId" />
      </FormItem>
      <FormItem prop="likeVolume"
                label="点赞量">
        <Input readOnly v-model="formInline.likeVolume" />
      </FormItem>
      <FormItem prop="createTime"
                label="创建时间">
        <Input readOnly v-model="formInline.createTime" />
      </FormItem>
      <FormItem prop="photo"
                label="商店图片">
        <Input readOnly v-model="formInline.photo" />
      </FormItem>
      <FormItem prop="desc"
                label="">
        <Input readOnly v-model="formInline.desc" />
      </FormItem>
      <FormItem prop="industryName"
                label="行业名称">
        <Input readOnly v-model="formInline.industryName" />
      </FormItem>
      <FormItem prop="provinceName"
                label="省份">
        <Input readOnly v-model="formInline.provinceName" />
      </FormItem>
      <FormItem prop="cityName"
                label="城市">
        <Input readOnly v-model="formInline.cityName" />
      </FormItem>
      <FormItem prop="areaName"
                label="区县">
        <Input readOnly v-model="formInline.areaName" />
      </FormItem>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px"
              @click="handleCancel()">{{$t('cancel')}}</Button>
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
      }
    }
  },
  methods: {
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
