export default {
  name: 'FormExpand',
  functional: true,
  props: {
    type: String,
    props: Object,
    render: Function,
    value: String | Array | Object
  },
  render: (h, ctx) => {
    const params = ctx.props
    if (ctx.props.render) {
      console.log('render')
      return ctx.props.render(h, params)
    } else {
      console.log('type', ctx, ctx.props.type, ctx.props.props)
      return h(ctx.props.type, params)
    }
  }
}
