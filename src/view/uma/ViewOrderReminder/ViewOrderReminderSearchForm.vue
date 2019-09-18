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
                label="客户名称">
        <Input v-model="formInline.name" />
      </FormItem>
      <FormItem prop="phone"
                label="联系电话">
        <Input v-model="formInline.phone" />
      </FormItem>
      <FormItem prop="createTime"
                label="创建时间">
        <Input v-model="formInline.createTime" />
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
        name: '',
        phone: '',
        createTime: ''
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
