import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
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
              <View key={product.id}>
                <Image
                  src={product.images[0].src}
                  mode='aspectFit'
                />
                <View>
                  <View>{product.name}</View>
                  <View>
                    {product.on_sale && <Text className='mr-2'>{'￥' + product.regular_price}</Text>}
                    <Text>{'￥' + product.price}</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default ShopIndex