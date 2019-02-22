import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet, AtButton } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const {
      show,
      action,
      actionText
    } = this.props

    return (
      <View>
        <AtActionSheet isOpened={show}>
          <View className='p-3'>
            ActionSheet
          </View>
          <View>
            <AtButton type={action}>{actionText}</AtButton>
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default ProductPageActionSheet