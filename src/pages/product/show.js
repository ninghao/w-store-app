import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import { AtBadge } from 'taro-ui'
import fetchData from '../../utilities/fetch-data'
import Placeholder from '../../components/placeholder'
import ErrorPage from '../../components/error-page'

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
    errorPageMessage: ''
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

  render() {
    const { product, placeholder, serviceError, errorPageMessage } = this.state

    const page = (
      <View>
        <Placeholder className='m-3' show={placeholder} type='product' />
        {!placeholder &&
          <View className='card mb-2' onClick={this.props.onClick}>
            <Image
              className='card-img-top'
              src={product.images[0].src}
              mode='aspectFit'
            />
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