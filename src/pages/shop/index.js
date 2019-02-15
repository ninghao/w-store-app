import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  render() {
    return (
      <View className='page-demo'>
        ShopIndex
      </View>
    )
  }
}

export default ShopIndex