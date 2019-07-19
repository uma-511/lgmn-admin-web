<template>
  <Carousel v-model="carouselIndex"
            ref="carousel"
            :autoplay=false
            dots="none"
            :radius-dot='false'
            :trigger="setting.trigger"
            :arrow="setting.arrow">
    <CarouselItem>
      <card>
        <PermissionList ref="index"></PermissionList>
      </card>
    </CarouselItem>
    <CarouselItem>
      <card>
        <AddPermission></AddPermission>
      </card>
    </CarouselItem>
    <CarouselItem>
      <card>
        <EditPermission ref="editForm"></EditPermission>
      </card>
    </CarouselItem>
  </Carousel>
</template>

<script>
import AddPermission from './addPermission'
import EditPermission from './editPermission'
import PermissionList from './permissionList'

export default {
  name: 'permission',
  components: {
    AddPermission, EditPermission, PermissionList
  },
  data () {
    return {
      carouselIndex: 0,
      editData: {},
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'none',
        radiusDot: false,
        trigger: 'click',
        arrow: 'never'
      }
    }
  },
  methods: {
    index () {
      this.carouselIndex = 0
      this.$refs['index'].loadTable()
    },
    add () {
      this.carouselIndex = 1
    },
    edit (row) {
      this.carouselIndex = 2
      this.editData = row
      this.$refs['editForm'].initEdit()
    },
    getData () {
      return this.editData
    }
  },
  provide () {
    return {
      index: this.index,
      add: this.add,
      edit: this.edit,
      getData: this.getData
    }
  }
}
</script>
