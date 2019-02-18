import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SearchBar from '../../components/search-bar'
import ProductList from '../../components/product-list'

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
        <View className='ui placeholder'>
          <View className='image rectangular'></View>
          <View className='line'></View>
          <View className='very short line'></View>
        </View>
        <ProductList data={products} />
      </View>
    )
  }
}

export default ShopIndex