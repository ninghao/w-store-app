import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    return (
      <View>
        <AtActionSheet isOpened>
          <View className='p-3'>
            ActionSheet
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default ProductPageActionSheet