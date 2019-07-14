<template>
    <Drawer
      title="添加标签模板"
      :closable="false"
      :width='600'
      :mask-closable="false"
      v-model="showStatus">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem label="模板名称" prop="name">
              <Input type="text" v-model="formInline.name" />
            </FormItem>
            <FormItem prop="path" label="上传模板">
                <Upload
                    ref="upload"
                    action="http://localhost:8086/labelFormatApi/uploadLabelModel"
                    name="file"
                    :show-upload-list="true"
                    :before-upload="beforeUpload"
                    :on-format-error="handleFormatError"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-remove="handleRemove"
                    :format ="['xlsx','xls']">
                      <Button type="info" icon="ios-cloud-upload-outline">批量导入</Button>
                </Upload>
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px"
                  @click="handleCancel()">{{$t('cancel')}}</Button>
          <Button type="primary"
                  style="margin-right: 8px"
                  @click="handleSubmit('formInline')">{{$t('submit')}}</Button>
        </div>
    </Drawer>
</template>
<script>
import { add } from '@/api/labelFormatApi'
export default {
  data () {
    const validateUpload = (rule, value, callback) => {
      if (this.uploadList && this.uploadList.length === 0) {
        callback(new Error('请上传Excel模板'))
      } else {
        callback()
      }
    }
    return {
      showStatus: false,
      uploadList: [],
      formInline: {
        name: '',
        path: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        path: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ]
      }
    }
  },
  props: {
    value: Boolean
  },
  watch: {
    showStatus (val) {
      this.$emit('on-showStatus-change', val)
    },
    value (val) {
      this.showStatus = val
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['formInline'].validate((val) => {
        if (val) {
          add(this.formInline).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('添加成功')
              this.showStatus = false
              this.$emit('on-added')
            } else {
              this.$Message.error('添加失败')
            }
          })
        } else {
          this.$Message.error('请填写必填项')
        }
      })
    },
    handleCancel () {
      this.showStatus = false
      this.formInline.path = ''
      this.formInline.name = ''
      this.$refs.upload.clearFiles()
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    handleSuccess (res, file) {
      if (res.code === '200') {
        this.formInline.path = res.data.path
        this.dialoLead = false
        this.$Message.success('数据导入成功！')
      }
    },
    handleError (error, file, fileList) {
      this.$Message.error(error + '数据导入失败！')
    },
    handleRemove (file, fileList) {
      this.formInline.path = ''
    },
    beforeUpload (file) {
      if (this.formInline.path !== '') {
        this.$Message.warning('暂只允许上传一个文件')
        return false
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
