import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtBadge } from 'taro-ui'

class ProductListItem extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const { data: product } = this.props

    return (
      <View className='card mb-2'>
        <Image
          className='card-img-top'
          src={product.images[0].src}
          mode='aspectFit'
        />
        <View className='card-body text-center'>
          <View className='card-title mb-2'>
            <View className='card-title-text'>
              {product.on_sale &&
                <AtBadge className='card-title-badge' value='sale' />}
              {product.name}
            </View>
          </View>
          <View className='card-subtitle'>
            {product.on_sale &&
              <Text className='mr-2 text-muted text-through'>{'￥' + product.regular_price}</Text>}
            <Text>{'￥' + product.price}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default ProductListItem