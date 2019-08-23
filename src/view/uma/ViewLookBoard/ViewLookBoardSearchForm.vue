<template>
  <div class="search-con search-con-top">
    <Form ref="searchBar"
          :model="formInline"
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
// import { PostWithAuth } from '@/api/global'
import { clone } from '@/libs/tools'
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
