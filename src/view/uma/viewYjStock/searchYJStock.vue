<template>
  <div class="search-con search-con-top">
    <Form ref="searchBar" :model="formInline" inline :label-width="80">
      <FormItem label="编号" prop="number">
        <Select
          v-model="formInline.number"
          ref="number"
          @on-change="onNumberChange"
          @on-clear="onNumberClear"
          clearable
          filterable
          remote
          label-in-value
          :loading="loadingNumber"
          :remote-method="remoteNumber"
        >
          <Option
            v-for="item in numberList"
            :value="item.id"
            :label="item.num"
            :key="item.id"
          >{{ item.num }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="name" label="名称">
        <Select
          v-model="formInline.name"
          ref="name"
          @on-change="onSelectChange"
          clearable
          filterable
        >
          <Option v-for="item in nameList" :value="item.value" :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="specs" label="规格">
        <Select
          v-model="formInline.specs"
          ref="specs"
          @on-change="onSelectChange"
          clearable
          filterable
        >
          <Option v-for="item in specsList" :value="item.value" :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="width" label="宽度">
        <Select
          v-model="formInline.width"
          ref="width"
          @on-change="onSelectChange"
          clearable
          filterable
        >
          <Option v-for="item in widthList" :value="item.value" :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="color" label="颜色">
        <Select
          v-model="formInline.color"
          ref="str1"
          @on-change="onSelectChange"
          clearable
          filterable
        >
          <Option v-for="item in colorList" :value="item.value" :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
    </Form>
    <Button
      @click="handleSearch"
      class="search-btn"
      type="primary"
      size="small"
      icon="ios-search"
    >搜索</Button>
  </div>
</template>

<script>
import { PostWithAuth } from '@/api/global'
import { clone } from '@/libs/tools'
export default {
  data() {
    return {
      formInline: {
        name: '',
        specs: '',
        width: '',
        color: ''
      },
      nameList: [{ id: 0, value: '' }],
      specsList: [{ id: 0, value: '' }],
      widthList: [{ id: 0, value: '' }],
      colorList: [{ id: 0, value: '' }],
      numberList: [{ id: 0, num: '' }],
      loadingNumber: false,
      loadingClient: false,
      numberValue: {
        label: '',
        value: 0
      },
      clientValue: {
        label: '',
        value: 0
      }
    }
  },
  watch: {
    clients(val) {
      this.clientList = val
    },
    names(val) {
      this.nameList = val
    },
    specses(val) {
      this.specsList = val
    },
    widths(val) {
      this.widthList = val
    },
    floors(val) {
      this.floorList = val
    },
    colors(val) {
      this.colorList = val
    },
    labels(val) {
      this.labelList = val
    },
    numbers(val) {
      this.numberList = val
    },
    numberList(val) {
      if (val.length === 1) {
        // this.formInline.number = val[0].num
        // this.$refs['number'].setQuery(val[0].num)
      } else if (val.length > 1) {
        this.touch()
      } else {
        this.onNumberClear()
        this.$refs['number'].setQuery('')
        this.formInline.number = ''
      }
    }
  },
  props: {
    clients: {
      type: Array,
      default() {
        return [{ id: 0, name: '' }]
      }
    },
    names: {
      type: Array,
      default() {
        return [{ id: 0, value: '' }]
      }
    },
    specses: {
      type: Array,
      default() {
        return [{ id: 0, value: '' }]
      }
    },
    widths: {
      type: Array,
      default() {
        return [{ id: 0, value: '' }]
      }
    },
    floors: {
      type: Array,
      default() {
        return [{ id: 0, value: '' }]
      }
    },
    colors: {
      type: Array,
      default() {
        return [{ id: 0, value: '' }]
      }
    },
    labels: {
      type: Array,
      default() {
        return [{ id: 0, name: '' }]
      }
    },
    numbers: {
      type: Array,
      default() {
        return [{ id: 0, num: '' }]
      }
    }
  },
  methods: {
    onNumberChange(value) {
      if (value && value.value !== '') {
        this.numberValue = value
        let selectedNum = this.numberList.filter(this.numberFilter)
        this.formInline.name = selectedNum[0].name
        this.formInline.specs = selectedNum[0].specs
        this.formInline.width = selectedNum[0].width
        this.formInline.color = selectedNum[0].str1
      }
    },
    numberFilter(item) {
      if (this.numberValue.value === item.id) {
        return true
      }
    },
    onSelectChange(value) {
      if (value && this.formInline.name && this.formInline.name !== '' && this.formInline.specs && this.formInline.specs !== '' && this.formInline.width && this.formInline.width !== '' && this.formInline.color && this.formInline.color !== '') {
        let dto = { name: this.formInline.name, specs: this.formInline.specs, width: this.formInline.width, str1: this.formInline.color }
        // this.queryNumber(dto)
      }
    },
    onNumberClear() {
      this.numberValue = {
        label: '',
        value: 0
      }
      this.numberList = [{ id: 0, num: '' }]
    },
    onClientClear() {
      this.clientValue = {
        label: '',
        value: 0
      }
      this.clientList = [{ id: 0, name: '' }]
    },
    onClientChange(value) {
      if (value && value.value !== '') {
        this.clientValue = value
      }
    },
    onDataChange(dateStr, date) {
      this.formInline.deliveryDate = dateStr
    },
    handleSearch() {
      // this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      let searchDto = clone(this.formInline)
      searchDto.clientName = this.clientValue.label
      searchDto.number = this.numberValue.label
      this.$emit('on-search-click', searchDto)
    },
    onAddClick() {
      this.$emit('on-add-click')
    },
    remoteNumber(query) {
      if (query !== '') {
        let dto = { num: query }
        this.queryNumber(dto)
      }
    },
    queryNumber(dto) {
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
    touch() {
      this.$refs['number'].toggleMenu(null, true)
    },
    remoteClient(query) {
      if (query !== '') {
        let dto = { name: query }
        this.queryClient(dto)
      }
    },
    queryClient(dto) {
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
    }
  },
  mounted() {
  }
}
</script>
