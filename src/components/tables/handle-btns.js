const btns = {
  delete1: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?',
        transfer: true
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-trash',
            size: 18,
            color: 'red'
          }
        })
      ])
    ])
  },
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: vm.$t('delete_confirm_title'),
        transfer: true
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          size: 'small',
          type: 'error'
        }
      }, vm.$t('delete'))
    ])
  },
  edit: (h, params, vm) => {
    return h('Button', {
      props: {
        size: 'small',
        type: 'primary'
      },
      on: {
        'click': () => {
          vm.$emit('on-edit', params)
        }
      }
    }, vm.$t('edit'))
  },
  detail: (h, params, vm) => {
    return h('Button', {
      props: {
        size: 'small',
        type: 'info'
      },
      on: {
        'click': () => {
          vm.$emit('on-detail', params)
        }
      }
    }, vm.$t('detail'))
  }
}

export default btns
