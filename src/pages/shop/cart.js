import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import fetchData from '../../utilities/fetch-data'
import CartItemList from '../../components/cart-item-list'
import CartPageTabBar from '../../components/cart-page-tab-bar'

class ShopCart extends Component {
  config = {
    navigationBarTitleText: '购物袋'
  }

  state = {
    cart: {
      total: 0,
      items: []
    },
    selectedItems: [],
    editing: false
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

  onChangeCartItem(type, value) {
    this.setState({
      selectedItems: value
    }, () => {
      console.log(this.state.selectedItems)
    })
  }

  onClickTabBar(type) {
    switch (type) {
      case 'textButton':
        this.setState({
          editing: true
        })

        Taro.setNavigationBarTitle({
          title: '编辑购物袋'
        })

        break
      case 'textButtonAlt':
        this.setState({
          editing: false
        })

        Taro.setNavigationBarTitle({
          title: '购物袋'
        })

        break
    }
  }

  sumItems(items, compareItems, compare, prop) {
    const result = items.map(item => {
      if (compareItems.includes(item[compare])) {
        return item[prop]
      }
      return 0
    })

    return result.reduce((v1, v2) => v1 + v2, 0)
  }

  render() {
    const { cart, selectedItems, editing } = this.state

    const quantity = this.sumItems(cart.items, selectedItems, 'product_id', 'quantity')
    const total = this.sumItems(cart.items, selectedItems, 'product_id', 'total')

    const tabBarText = `(${quantity}) 件`
    const tabBarTextPrimary = `￥${total}`

    return (
      <View className='pb-5'>
        <CartItemList
          items={cart.items}
          selected={selectedItems}
          onChange={this.onChangeCartItem.bind(this)}
          className='mb-5'
          editing={editing}
        />
        <CartPageTabBar
          primary='提交订单'
          disabled={selectedItems.length === 0}
          disabledText='请先选择'
          textButton='编辑'
          textButtonAlt='完成'
          text={tabBarText}
          textPrimary={tabBarTextPrimary}
          onClick={this.onClickTabBar}
        />
      </View>
    )
  }
}

export default ShopCart