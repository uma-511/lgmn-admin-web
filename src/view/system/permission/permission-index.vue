<template>
  <Card>
    <!-- <Row>
      <Form inline
            :label-width='80'>
        <FormItem label='用户ID'>
          <Input v-model='criteria.id'
                 style='width:90%'
                 :maxlength='50'
                 clearable></Input>
        </FormItem>
        <FormItem :label='$t("account")'>
          <Input v-model='criteria.account'
                 style='width:90%'
                 :maxlength='50'
                 clearable></Input>
        </FormItem>
        <FormItem label='昵称'>
          <Input v-model='criteria.nikeName'
                 style='width:90%'
                 :maxlength='50'
                 clearable></Input>
        </FormItem>
        <FormItem label='用户类型'>
          <InputNumber v-model='criteria.userType'
                       style='width:90%'
                       :max='999999999'></InputNumber>
        </FormItem>
        <FormItem :label-width='20'>
          <Button type='primary'
                  icon='ios-search'
                  size='small'
                  @click='search'>{{ $t('search') }}</Button>
          <Button type='success'
                  icon='ios-add'
                  size='small'
                  @click='add'>{{ $t('add') }}</Button>
        </FormItem>
      </Form>
    </Row>
    <Row>
      <tables border
              editable
              search-place="top"
              :columns='columns'
              v-model='tableData'
              @on-edit="edit"
              @on-delete="remove"
              @on-detail="detail"
              size='small'
              :height='tableHeight'></tables>
    </Row>
    <Row>
      <Page show-total
            show-sizer
            show-elevator
            size='small'
            :total='totalCount'
            :page-size='criteria.size'
            @on-change='onPageChange'
            @on-page-size-change='onPageSizeChange'></Page>
    </Row>
    <DynamicForm v-bind:value='addModel'
                 :width='600'
                 :status='formStatus'
                 :formData='formData'
                 @on-value-change="onshowStatusChange"></DynamicForm> -->
    <Row>
      <Col span="10">
      <PermissionTree></PermissionTree>
      </Col>
      <Col span="14">
      <PermissionForm></PermissionForm>
      </col>
    </Row>
  </Card>
</template>

<script>
import { clone } from '@/libs/tools'
import Tables from '_c/tables'
import DynamicForm from '_c/dynamic-form'
import { getUserPage } from '@/api/data'
import addPermissionForm from './form/add-permission-form'
import editPermissionForm from './form/edit-permission-form'
import detailPermissionForm from './form/detail-permission-form'
import PermissionTree from './permission-tree'
import PermissionForm from './permission-form'
export default {
  components: {
    Tables,
    DynamicForm,
    PermissionTree,
    PermissionForm
  },
  data () {
    var vue = this
    return {
      addModel: false,
      formData: [],
      createUrl: 'create.lgmn.com',
      updateUrl: 'update.lgmn.com',
      deleteUrl: 'delete.lgmn.com',
      formStatus: 'add',
      tableData: [],
      totalCount: 0,
      criteria: { page: 1, size: 10 },
      tableHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        { title: '权限名称', key: 'name' },
        {
          title: '中文名称',
          key: 'chineseName'
        },
        {
          key: 'handle',
          renderHeader (h, { column, index }) {
            return h('span', vue.$t('option'))
          },
          width: 200,
          options: ['delete', 'edit', 'detail']
        }
      ]
    }
  },
  methods: {
    async search () {
      // let res = await http.get({ path: '/api/demo', queryParams: this.criteria })
      // if (res.ok) {
      //   this.totalCount = utils.getTotalCount(res.headers)
      //   this.items = await res.json()
      // }
    },
    onPageChange (page) {
      this.criteria.page = page
      this.search()
    },
    onPageSizeChange (size) {
      this.criteria.size = size
      this.search()
    },
    async edit (item) {
      const _f = clone(editPermissionForm)
      this.addModel = true
      this.formData = _f
      // this.rule = formCreateData
      this.formStatus = 'edit'
      // let controller = await shell.openDialog({ url: `/demo/edit?id=${item.id}` })
      // await controller.closeResult
      // this.search()
    },
    async detail (item) {
      const _f = clone(detailPermissionForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'detail'
      // let controller = await shell.openDialog({ url: `/demo/edit?id=${item.id}` })
      // await controller.closeResult
      // this.search()
    },
    async add () {
      const _f = clone(addPermissionForm)
      this.addModel = true
      this.formData = _f
      this.formStatus = 'add'
      // let controller = await shell.openDialog({ url: `/demo/new` })
      // await controller.closeResult
      // this.search()
    },
    async remove (item) {
      let confirmed = await shell.confirm({ title: '确认删除', message: `确定要删除${item.name}吗？` })
      if (!confirmed) return
      let res = await http.delete(`/api/demo/${item.id}`)
      if (res.ok) {
        shell.newNotification({ title: '删除成功', type: 'success' })
        this.search()
      } else {
        shell.newNotification({ title: '删除成功', type: 'error' })
      }
    },
    onshowStatusChange (val) {
      this.addModel = val
    }
  },
  mounted () {
    getUserPage().then(res => {
      this.tableData = res.data
    })
  }
}
</script>
