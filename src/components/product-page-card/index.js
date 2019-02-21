import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import { AtBadge, Swiper, SwiperItem } from 'taro-ui'

class ProductPageCard extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const { data: product, indicatorDots } = this.props

    return (
      <View className='card mb-2' onClick={this.props.onClick}>
        <Swiper
          className='card-swiper'
          indicatorDots={indicatorDots}
          indicatorColor='#e5e5e5'
          indicatorActiveColor='#ccc'
          circular
        >
          {product.images.map(img =>
            <SwiperItem key={img.id}>
              <Image
                className='card-img-top'
                src={img.src}
                mode='aspectFit'
              />
            </SwiperItem>
          )}
        </Swiper>
        <View className='card-body m-3'>
          <View className='card-title mb-2'>
            <View className='card-title-text'>
              {product.on_sale &&
                <AtBadge className='card-title-badge' value='sale' />}
              {product.name}
            </View>
          </View>
          <View className='card-subtitle mb-3'>
            {product.on_sale &&
              <Text className='mr-2 text-muted text-through'>{'￥' + product.regular_price}</Text>}
            <Text>{'￥' + product.price}</Text>
          </View>
          <View className='card-text'>
            <RichText nodes={product.short_description} />
          </View>
        </View>
      </View>
    )
  }
}

export default ProductPageCard