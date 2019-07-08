import {
  clone
} from '@/libs/tools'
export default {
  name: 'RadioExpand',
  functional: true,
  props: {
    type: String,
    props: Object,
    render: Function,
    children: Object
  },
  render: (h, ctx) => {
    const params = ctx.props
    if (ctx.props.render) {
      console.log('render')
      return ctx.props.render(h, params)
    } else {
      const c = ctx.props.children
      var solts = []
      if (c && c.items) {
        c.items.forEach((ele, index) => {
          const s = h(c.type, clone(ele))
          solts.push(s)
        })
      }
      console.log(solts)
      return h(ctx.props.type, params, solts)
    }
  }
}
