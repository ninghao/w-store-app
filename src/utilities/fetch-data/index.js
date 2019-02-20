import Taro from '@tarojs/taro'
import buildUrl from 'build-url'
import _ from 'lodash'

async function fetchData({
  resource = '',
  id = '',
  search = '',
  page = '',
  pageSize = '',
  success = () => { },
  fail = () => { },
  complete = () => { }
}) {
  let queryParams = {}

  if (search) queryParams.q = search
  if (page) queryParams._page = page
  if (pageSize) queryParams._limit = pageSize

  if (_.isEmpty(queryParams)) {
    queryParams = null
  }

  const path = id ? `${resource}/${id}` : resource

  const url = buildUrl(API_WS, {
    path,
    queryParams
  })

  try {
    const response = await Taro.request({
      url,
      fail(error) {
        error.message = '服务出现问题，请稍后再试。'
        fail(error)
      }
    })

    const { statusCode } = response

    switch (statusCode) {
      case 200:
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => {
            success(response)
          }, 1000)
        } else {
          success(response)
        }
        break;
      default:
        throw new Error('服务出现问题，请稍后再试。')
        break;
    }
  } catch (error) {
    fail(error)
  }

  complete()
}

export default fetchData