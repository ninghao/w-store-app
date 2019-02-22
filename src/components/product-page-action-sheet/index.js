import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtActionSheet, AtButton, AtInputNumber } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  state = {
    quantity: '1'
  }

  handleClick() {
    this.props.onClick(this.state)
  }

  handleChange(value) {
    this.setState({
      quantity: value
    })
  }

  render() {
    const {
      show,
      data: product,
      action,
      actionText
    } = this.props

    const { quantity } = this.state

    return (
      <View className='action-sheet'>
        <AtActionSheet isOpened={show}>
          <View className='action-sheet__header py-3 mx-3 text-left'>
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
          <View className='action-sheet__body text-left'>
            <View className='action-sheet__list mb-3'>
              <View className='action-sheet__list-item p-3 mx-3'>
                <View className='action-sheet__list-item-title mb-2'>数量</View>
                <View className='action-sheet__list-item-content'>
                  <AtInputNumber
                    min={0}
                    max={10}
                    step={1}
                    value={quantity}
                    onChange={this.handleChange.bind(this)}
                  />
                </View>
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