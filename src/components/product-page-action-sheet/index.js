import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const {
      show
    } = this.props

    return (
      <View>
        <AtActionSheet isOpened={show}>
          <View className='p-3'>
            ActionSheet
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default ProductPageActionSheet