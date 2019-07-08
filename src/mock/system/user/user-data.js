import Mock from 'mockjs'
import {
  doCustomTimes
} from '@/libs/util'
const Random = Mock.Random

export const getUserPage = req => {
  let userPage = []
  let pageData = {
    count: 50,
    list: [],
    pageNumber: 0,
    pageSize: 10,
    totalPage: 4
  }
  doCustomTimes(10, () => {
    userPage.push(Mock.mock({
      nikeName: Random.cname(),
      avatar: Random.dataImage(),
      account: Random.name(),
      id: Random.increment(10)
    }))
  })
  pageData.list = userPage
  return pageData
}
