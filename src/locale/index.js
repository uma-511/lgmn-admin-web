import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
  localRead
} from '@/libs/util'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import zhCnLocale from 'iview/src/locale/lang/zh-CN'
import enUsLocale from 'iview/src/locale/lang/en-US'
import zhTwLocale from 'iview/src/locale/lang/zh-TW'

import UserZhCn from './lang/system/user/zh-CN'
import UserZhTw from './lang/system/user/zh-TW'
import UserEnUs from './lang/system/user/en-US'

import RoleZhCn from './lang/system/role/zh-CN'
import RoleZhTw from './lang/system/role/zh-TW'
import RoleEnUs from './lang/system/role/en-US'

import PermissionZhCn from './lang/system/permission/zh-CN'
import PermissionZhTw from './lang/system/permission/zh-TW'
import PermissionEnUs from './lang/system/permission/en-US'
Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn, UserZhCn, RoleZhCn, PermissionZhCn),
  'zh-TW': Object.assign(zhTwLocale, customZhTw, UserZhTw, RoleZhTw, PermissionZhTw),
  'en-US': Object.assign(enUsLocale, customEnUs, UserEnUs, RoleEnUs, PermissionEnUs)
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
