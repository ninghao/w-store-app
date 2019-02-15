import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import { AtButton, AtList, AtListItem } from 'taro-ui'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    products: []
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  async componentWillMount() {
    const response = await Taro.request({
      url: `${API_WS}/products`
    })

    this.setState({
      products: response.data
    })

    console.log(response)
  }

  render() {
    const { products } = this.state

    return (
      <View className='index'>
        <AtList>
          {
            products.map(product =>
              <AtListItem
                key={product.id}
                arrow='right'
                thumb={product.images[0].src}
                title={product.name}
                note={'￥' + product.price}
              />
            )
          }
        </AtList>
      </View>
    )
  }
}

export default Index
