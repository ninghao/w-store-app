import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SearchBar from '../../components/search-bar'
import ProductList from '../../components/product-list'

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  state = {
    products: [],
    placeholder: true,
  }

  async componentWillMount() {
    const response = await Taro.request({
      url: `${API_WS}/products`
    })

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          products: response.data,
          placeholder: false,
        })
      }, 2000)
    } else {
      this.setState({
        products: response.data,
        placeholder: false,
      })
    }
  }

  render() {
    const { products, placeholder } = this.state

    return (
      <View>
        <SearchBar />
        {
          placeholder &&
          <View className='ui placeholder'>
            <View className='image rectangular'></View>
            <View className='line'></View>
            <View className='very short line'></View>
          </View>
        }
        <ProductList data={products} />
      </View>
    )
  }
}

export default ShopIndex