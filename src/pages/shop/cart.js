import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCheckbox } from 'taro-ui'
import fetchData from '../../utilities/fetch-data'
import CartItemList from '../../components/cart-item-list'

class ShopCart extends Component {
  config = {
    navigationBarTitleText: '购物袋'
  }

  state = {
    cart: {
      total: 0,
      items: []
    },
    selectedItems: []
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

  onChangeCartItem(value) {
    this.setState({
      selectedItems: value
    }, () => {
      console.log(this.state.selectedItems)
    })
  }

  render() {
    const { cart, selectedItems } = this.state

    return (
      <View>
        <CartItemList
          items={cart.items}
          selected={selectedItems}
          onChange={this.onChangeCartItem.bind(this)}
        />
      </View>
    )
  }
}

export default ShopCart