<template>
  <div class="search-con search-con-top">
    <Form ref="searchBar"
          :model="formInline"
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
     <Button @click="handleSearch"
            class="search-btn"
            type="primary"
            size='small'
            icon='ios-search'>搜索</Button>
    <Button type='success'
            icon='ios-add'
            size='small'
            @click='onAddClick'>{{ $t('add') }}</Button>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    handleSearch () {
      let searchDto = clone(this.formInline)
      this.$emit('on-search-click', searchDto)
    },
    onAddClick () {
      this.$emit('on-add-click')
    }
  },
  watch: {
  },
  props: {
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
