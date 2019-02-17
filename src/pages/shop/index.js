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
              <View key={product.id} className='card mb-2'>
                <Image
                  className='card-img-top'
                  src={product.images[0].src}
                  mode='aspectFit'
                />
                <View className='card-body text-center'>
                  <View className='card-title mb-2'>{product.name}</View>
                  <View className='card-subtitle'>
                    {product.on_sale &&
                      <Text className='mr-2 text-muted text-through'>{'￥' + product.regular_price}</Text>}
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