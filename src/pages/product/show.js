import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import fetchData from '../../utilities/fetch-data'

class ProductShow extends Component {
  config = {
    navigationBarTitleText: 'ProductShow'
  }

  state = {
    product: {}
  }

  constructor() {
    this.fetchData = fetchData
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

  componentWillMount() {
    const { id, name } = this.$router.params

    Taro.setNavigationBarTitle({
      title: name
    })

    this.fetchData({
      resource: 'products',
      id,
      success: this.fetchDataSuccess.bind(this)
    })
  }

  render() {
    const { product } = this.state

    return (
      <View>
        <View className='page-demo'>
          {product.name}
        </View>
      </View>
    )
  }
}

export default ProductShow