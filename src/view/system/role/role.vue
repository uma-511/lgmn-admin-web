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
        <RoleList ref="index"></RoleList>
      </card>
    </CarouselItem>
    <CarouselItem>
      <card>
        <AddRole></AddRole>
      </card>
    </CarouselItem>
    <CarouselItem>
      <card>
        <EditRole ref="editForm"></EditRole>
      </card>
    </CarouselItem>
    <CarouselItem>
      <card>
        <Button @click="permissionToIndex">
          返回
        </Button>
        <RolePermission ref="setPermission"></RolePermission>
      </card>
    </CarouselItem>
  </Carousel>
</template>

<script>
import AddRole from './addRole'
import EditRole from './editRole'
import RoleList from './roleList'
import RolePermission from '../rolePermission/rolePermission'

export default {
  name: 'role',
  components: {
    AddRole, EditRole, RoleList, RolePermission
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
    setPermission (row) {
      this.carouselIndex = 3
      this.$refs['setPermission'].setRoleId(row.id)
    },
    getData () {
      return this.editData
    },
    permissionToIndex () {
      this.$refs['setPermission'].toIndex()
    }
  },
  provide () {
    return {
      index: this.index,
      add: this.add,
      edit: this.edit,
      getData: this.getData,
      setPermission: this.setPermission
    }
  }
}
</script>
