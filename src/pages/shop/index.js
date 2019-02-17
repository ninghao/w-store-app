import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SearchBar from '../../components/search-bar'

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  state = {
    products: []
  }

  async componentWillMount() {
    const response = await Taro.request({
      url: `${API_WS}/products`
    })

    this.setState({
      products: response.data
    })
  }

  render() {
    const { products } = this.state

    return (
      <View>
        <SearchBar />
        <View className='p-3'>
          {
            products.map(product =>
              <View key={product.id}>{product.name}</View>
            )
          }
        </View>
      </View>
    )
  }
}

export default ShopIndex