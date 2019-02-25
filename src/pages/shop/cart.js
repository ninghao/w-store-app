import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import fetchData from '../../utilities/fetch-data'

class ShopCart extends Component {
  config = {
    navigationBarTitleText: '购物袋'
  }

  state = {
    cart: {
      total: 0,
      items: []
    }
  }

  constructor() {
    this.fetchData = fetchData
  }

  getCartSuccess(response) {
    this.setState({
      cart: response.data
    })

    console.log(response.data)
  }

  getCart() {
    this.fetchData({
      resource: 'shopping-cart',
      success: this.getCartSuccess.bind(this)
    })
  }

  componentWillMount() {
    this.getCart()
  }

  componentDidShow() {
    this.getCart()
  }

  render() {
    return (
      <View>
        <View className='page-demo'>
          ShopCart
        </View>
      </View>
    )
  }
}

export default ShopCart