<template>
  <div>
    <Drawer :title="$t(status)"
            v-model="showStatus"
            :width="width"
            :mask-closable="false"
            :styles="styles">
      <form-create ref="fc"
                   v-model="fApi"
                   :rule="formDynamic"
                   :option="option"></form-create>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px"
                @click="handleCancel('formDynamic')">{{$t('cancel')}}</Button>
        <Button type="primary"
                style="margin-right: 8px"
                @click="handleSubmit('formDynamic')">{{$t('submit')}}</Button>
        <Button type="info"
                @click="handleReset('formDynamic')">重置</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { PostWithAuth } from '@/api/global'
export default {
  components: {
  },
  data () {
    return {
      showStatus: false,
      status: 'add',
      styles: {
        height: 'calc(100% - 105px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      index: 1,
      id: '',
      formDynamic: [{
        type: 'input',
        title: '昵称',
        field: 'nikeName',
        props: {
          clearable: true,
          placeholder: '请输入昵称'
        },
        validate: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }]
      }, {
        type: 'input',
        title: '登录手机号',
        field: 'phone',
        props: {
          clearable: true,
          placeholder: '请输入手机号'
        },
        validate: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }]
      }, {
        type: 'input',
        title: '选择按钮',
        field: 'selection',
        validate: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        props: {
          // search: true,
          // 'enter-button': true
          icon: 'ios-search'
        },
        event: {
          'click': function () {
            console.log('click')
          }
        }
      }, {
        type: 'Upload',
        field: 'avatar',
        title: '头像',
        value: [],
        // input值
        props: {
          'type': 'select',
          // 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
          'uploadType': 'image',
          // 上传文件类型，可选值为 image（图片上传），file（文件上传）
          'action': '',
          // 上传的地址，必填
          'headers': {},
          // 设置上传的请求头部
          'multiple': false,
          // 是否支持多选文件
          'data': {},
          // 上传时附带的额外参数
          'name': '',
          // 上传的文件字段名
          'withCredentials': false,
          // 支持发送 cookie 凭证信息
          'accept': '',
          // 接受上传的文件类型
          'format': [],
          // 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
          'maxSize': undefined,
          // 文件大小限制，单位 kb
          'maxLength': 1,
          // 上传文件最大数
          'beforeUpload': () => { },
          // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
          'onProgress': () => { },
          // 文件上传时的钩子，返回字段为 event, file, fileList
          'onSuccess': function () {
            return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'
          },
          // 文件上传成功时的钩子，返回字段为 response, file, fileList, 使用$f.uploadPush(field,filePath) 将上传后的路径添加到value中
          'onError': (error, file, fileList) => {
            console.log(error, file, fileList)
          },
          // 文件上传失败时的钩子，返回字段为 error, file, fileList
          'onPreview': () => { },
          // 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
          'onRemove': () => { },
          // 文件列表移除文件时的钩子，返回字段为 file, fileList
          'onFormatError': () => { },
          // 文件格式验证失败时的钩子，返回字段为 file, fileList
          'onExceededSize': () => { },
          // 文件超出指定大小限制时的钩子，返回字段为 file, fileList
          // 操作按钮的图标 ,设置为false将不显示
          handleIcon: 'ios-eye-outline',
          // 点击操作按钮事件
          // onHandle:(src)=>{},
          // 是否可删除,设置为false是不显示删除按钮
          allowRemove: true
        },
        validate: [{
          required: true,
          type: 'array',
          min: 1,
          message: '请上传1张图片',
          trigger: 'change'
        }]
      }, {
        'type': 'input',
        'field': 'address1',
        'title': '详细地址',
        'value': '',
        props: {
          clearable: true
        },
        validate: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }]
      }, {
        type: 'switch',
        title: '状态',
        field: 'status',
        status: 'add',
        value: 1,
        props: {
          size: 'large',
          trueValue: 1,
          falseValue: 0,
          'slot': {
            open: '正常',
            close: '冻结'
          }
        }
      }],
      fApi: {},
      model: {},
      option: {
        submitBtn: false
      }
    }
  },
  props: {
    value: Boolean,
    formData: Array,
    width: Number,
    createUrl: {
      type: String,
      default: ''
    },
    updateUrl: {
      type: String,
      default: ''
    },
    detailUrl: {
      type: String,
      default: ''
    },
    currentId: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (val) {
      this.showStatus = val
    },
    // formData (val) {
    //   const _d = val
    //   this.formDynamic = _d
    // },
    showStatus (val) {
      this.$emit('on-value-change', val)
    },
    currentId (val) {
      this.id = val
      console.log(val)
      this.getDetail()
    },
    methods: {
      initFormData () {
        if (id !== '') {
          if (this.status === 'update') {

          }
        }
      },
      handleSubmit (name) {
        this.fApi.validate(() => {
          this.fApi.submit((formData) => {
            switch (this.status) {
              case 'add':
                this.handlerCreateSubmit(formData)
                break
              case 'edit':
                this.handlerUpdateSubmit(formData)
                break
              default:
                console.log('请传入正确提交地址')
                break
            }
            console.log(formData)
          })
        }, () => {
          alert('验证失败')
        })
      },
      handlerCreateSubmit (formData) {
        if (this.createUrl !== '') {
          PostWithAuth(this.createUrl, formData).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('添加成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('此号码已存在，请确认')
              }
            }
            this.showStatus = false
          })
        } else {
          this.$emit('on-create-commit', formData)
        }
      },
      handlerUpdateSubmit (formData) {
        if (this.updateUrl !== '') {
          PostWithAuth(this.updateUrl, formData).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('修改成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('修改失败')
              }
            }
            this.showStatus = false
          })
        } else {
          this.$emit('on-update-commit', formData)
        }
      },
      getDetail () {
        if (this.detailUrl !== '') {
          PostWithAuth(this.detailUrl + '/' + this.id, {}).then(res => {
            if (res.data.code === '200') {
              this.fApi.setValue(res.data.data)
              this.$Message.success('获取表单数据成功')
            } else {
              if (res.data.code === '205') {
                this.$Message.error('获取表单数据失败')
                this.showStatus = false
              }
            }
          })
        } else {
          console.error('请提供detailUrl')
        }
      },
      handleReset (name) {
        this.fApi.resetFields()
      },
      handleCancel (name) {
        this.handleReset(name)
        this.showStatus = false
      },
      handleTest () {
      }
    },
    mounted () {
    }
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
