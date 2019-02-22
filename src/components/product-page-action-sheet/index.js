import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtActionSheet, AtButton } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  handleClick() {
    this.props.onClick(this.state)
  }

  render() {
    const {
      show,
      data: product,
      action,
      actionText
    } = this.props

    return (
      <View className='action-sheet'>
        <AtActionSheet isOpened={show}>
          <View className='action-sheet__header p-3 mx-3 text-left'>
            <Image
              className='action-sheet__header-image mr-2'
              src={product.images[0].src}
              mode='aspectFill'
            />
            <View className='action-sheet__header-text'>
              <View className='mb-2'>{product.name}</View>
              <View>
                {product.on_sale &&
                  <Text className='mr-2 text-muted text-through'>{'￥' + product.regular_price}</Text>
                }
                <Text>{'￥' + product.price}</Text>
              </View>
            </View>
          </View>
          <View className='action-sheet__action'>
            <AtButton type={action} onClick={this.handleClick}>{actionText}</AtButton>
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default ProductPageActionSheet