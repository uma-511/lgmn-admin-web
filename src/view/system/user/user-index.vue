<template>
  <Carousel v-model="carouselIndex"
            ref="carousel"
            :autoplay="false"
            dots="none"
            :radius-dot="false"
            :trigger="setting.trigger"
            :arrow="setting.arrow">
    <CarouselItem>
      <Card>
        <tables border
                editable
                ref="table"
                search-place="top"
                :columns='columns'
                @on-edit="edit"
                @on-delete="remove"
                @on-detail="detail"
                @on-add-click="add"
                :addable="true"
                :searchable="true"
                :searchForm="searchForm"
                dataUrl='user/page'
                size='small'
                :height='tableHeight'></tables>
        <DynamicForm v-bind:value='addModel'
                     :width='600'
                     :status='formStatus'
                     :formData='formData'
                     :createUrl='createUrl'
                     :updateUrl='updateUrl'
                     :detailUrl='detailUrl'
                     :currentId='currentId'
                     @on-save-success="onAdded"
                     @on-update-success="onAdded"
                     @on-value-change="onshowStatusChange"></DynamicForm>
      </Card>
    </CarouselItem>
    <CarouselItem>
      <Card>
        <Button @click="roleToIndex">返回</Button>
        <UserRole ref="setRole"></UserRole>
      </Card>
    </CarouselItem>
  </Carousel>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import { PostWithAuth } from '@/api/global'
import DynamicForm from '_c/dynamic-form'
import addUserForm from './form/add-user-form'
import editUserForm from './form/edit-user-form'
import detailUserForm from './form/detail-user-form'
import searchFormData from './form/search-user-form'
import UserRole from '../../system/userRole/userRole'
export default {
  components: {
    Tables,
    DynamicForm,
    UserRole
  },
  data () {
    var vue = this
    return {
      carouselIndex: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'none',
        radiusDot: false,
        trigger: 'click',
        arrow: 'never'
      },
      addModel: false,
      formData: [],
      createUrl: 'user/add',
      updateUrl: 'user/update',
      deleteUrl: 'user/delete',
      detailUrl: 'user/detail',
      currentId: '',
      formStatus: '',
      tableData: [],
      searchForm: [],
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        // {
        //   title: '用户ID',
        //   key: 'id'
        // },
        // {
        //   title: '头像',
        //   key: 'avatar',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Avatar', {
        //         props: {
        //           shape: 'square',
        //           src: params.row.avatar
        //         }
        //       })
        //     ])
        //   }
        // },
        {
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('account'))
          },
          key: 'account'
        },
        {
          title: '昵称',
          key: 'nikeName'
        },
        {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit'],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.toSetRole(params.row)
                  }
                }
              }, '设置角色')
            }
          ]
        }
      ]
    }
  },
  methods: {
    async add () {
      const _f = clone(addUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
    },
    async edit (item) {
      const _f = clone(editUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'edit'
      this.currentId = item.row.id
    },
    async detail (item) {
      const _f = clone(detailUserForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
      this.currentId = item.row.id
    },
    async remove (item) {
      PostWithAuth(this.deleteUrl + '/' + item.row.id, {}).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('删除成功')
          this.onAdded()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    onshowStatusChange (val) {
      this.addModel = val
    },
    toSetRole (row) {
      this.carouselIndex = 1
      this.$refs['setRole'].setUserId(row.id)
    },
    roleToIndex () {
      this.$refs['setRole'].toIndex()
    },
    index () {
      this.carouselIndex = 0
    },
    onAdded () {
      this.$refs['table'].getData()
    }
  },
  mounted () {
    this.searchForm = searchFormData
  },
  provide () {
    return {
      index: this.index
    }
  }
}
</script>
