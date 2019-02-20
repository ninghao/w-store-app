import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import { AtBadge, Swiper, SwiperItem, AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import fetchData from '../../utilities/fetch-data'
import Placeholder from '../../components/placeholder'
import ErrorPage from '../../components/error-page'
import RichTextWxParse from '../../components/rich-text-wx-parse'

class ProductShow extends Component {
  config = {
    navigationBarTitleText: 'ProductShow',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }

  state = {
    product: {},
    placeholder: true,
    serviceError: false,
    errorPageMessage: '',
    indicatorDots: false,
    activeTab: 0
  }

  constructor() {
    this.fetchData = fetchData

    const { id = 1, name } = this.$router.params
    this.id = id
    this.name = name
  }

  onPullDownRefresh() {
    this.setState({
      serviceError: false
    }, () => {
      this.fetchData({
        resource: 'products',
        id: this.id,
        success: this.fetchDataSuccess.bind(this),
        fail: this.fetchDataFail.bind(this),
        complete: this.fetchDataComplete.bind(this)
      })
    })
  }

  fetchDataSuccess(response) {
    const { data } = response

    this.setState({
      product: data
    })

    if (data.images.length > 1) {
      this.setState({
        indicatorDots: true
      })
    }

    Taro.setNavigationBarTitle({
      title: data.name
    })
  }

  fetchDataComplete() {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          placeholder: false
        })
      }, 1000)
    } else {
      this.setState({
        placeholder: false
      })
    }

    Taro.stopPullDownRefresh()
  }

  fetchDataFail(error) {
    this.setState({
      serviceError: true,
      errorPageMessage: error.message
    })
  }

  componentWillMount() {
    if (this.name) {
      Taro.setNavigationBarTitle({
        title: this.name
      })
    }

    this.fetchData({
      resource: 'products',
      id: this.id,
      success: this.fetchDataSuccess.bind(this),
      fail: this.fetchDataFail.bind(this),
      complete: this.fetchDataComplete.bind(this)
    })
  }

  onClickTab(activeTab) {
    this.setState({
      activeTab
    })
  }

  render() {
    const { product, placeholder, serviceError, errorPageMessage, indicatorDots, activeTab } = this.state
    const tabList = [
      { title: '描述' },
      { title: '参数' },
    ]

    const page = (
      <View>
        <Placeholder className='m-3' show={placeholder} type='product' />
        {!placeholder &&
          <View>
            <View className='card mb-2' onClick={this.props.onClick}>
              <Swiper
                className='card-swiper'
                indicatorDots={indicatorDots}
                indicatorColor='#e5e5e5'
                indicatorActiveColor='#ccc'
                circular
              >
                {product.images.map(img =>
                  <SwiperItem key={img.id}>
                    <Image
                      className='card-img-top'
                      src={img.src}
                      mode='aspectFit'
                    />
                  </SwiperItem>
                )}
              </Swiper>
              <View className='card-body m-3'>
                <View className='card-title mb-2'>
                  <View className='card-title-text'>
                    {product.on_sale &&
                      <AtBadge className='card-title-badge' value='sale' />}
                    {product.name}
                  </View>
                </View>
                <View className='card-subtitle mb-3'>
                  {product.on_sale &&
                    <Text className='mr-2 text-muted text-through'>{'￥' + product.regular_price}</Text>}
                  <Text>{'￥' + product.price}</Text>
                </View>
                <View className='card-text'>
                  <RichText nodes={product.short_description} />
                </View>
              </View>
            </View>
            <View className='mx-3 my-5'>
              <AtTabs
                current={activeTab}
                tabList={tabList}
                onClick={this.onClickTab.bind(this)}
              >
                <AtTabsPane className='mt-4' current={activeTab} index={0}>
                  <RichTextWxParse content={product.description} />
                </AtTabsPane>
                <AtTabsPane className='mt-4' current={activeTab} index={1}>
                  <AtList hasBorder={false}>
                    {product.attributes.map(attr =>
                      <AtListItem
                        key={attr.id}
                        hasBorder={false}
                        title={attr.name}
                        note={attr.options.toString()}
                      />
                    )}
                  </AtList>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>
        }
      </View>
    )

    const errorPage = <ErrorPage content={errorPageMessage} />
    return (
      <View>
        {serviceError ? errorPage : page}
      </View>
    )
  }
}

export default ProductShow