<template>
  <div>
    <Button @click="back">
      返回
    </Button>
    <Form ref="addRoleForm"
          :model="dto"
          :label-width="80"
          :rules="ruleInline">
      <FormItem prop="name"
                label="权限名称">
        <Input v-model="dto.name"
               placeholder="请输入权限名称"></Input>
      </FormItem>
      <FormItem prop="chineseName"
                label="中文名称">
        <Input v-model="dto.chineseName"
               placeholder="请输入中文名称"></Input>
      </FormItem>
      <FormItem prop="valid"
                label="是否可用">
        <i-switch v-model="dto.valid"
                  :trueValue="1"
                  :falseValue="0"></i-switch>
      </FormItem>
      <FormItem prop="remark"
                label="备注">
        <Input v-model="dto.remark"
               type="textarea"
               placeholder="请输入备注"></Input>
      </FormItem>
      <FormItem style="margin-top:80px">
        <Button type="primary"
                :loading="saving"
                @click="handleSubmit('addRoleForm')">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { addRole } from '@/api/role'
export default {
  name: 'AddRole',
  data () {
    return {
      saving: false,
      dto: {
        name: '',
        chineseName: '',
        valid: 1,
        remark: ''
      },
      ruleInline: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        chineseName: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        remark: [{ required: false, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      const _this = this
      _this.saving = true
      _this.$refs[name].validate((valid) => {
        if (valid) {
          addRole(_this.dto).then(res => {
            if (res) {
              _this.$Message.success(res.data.message)

              if (res.data.code === '200') {
                this.$refs['addRoleForm'].resetFields()
                _this.index()
                _this.saving = false
              }
            }
          })
        } else {
          _this.saving = false
        }
      })
    },
    back () {
      this.$refs['addRoleForm'].resetFields()
      this.index()
    }
  },
  inject: ['index', 'add', 'edit'],
  mounted () {
  }
}
</script>
