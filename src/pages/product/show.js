import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class ProductShow extends Component {
  config = {
    navigationBarTitleText: 'ProductShow'
  }

  render() {
    return (
      <View>
        <View className='page-demo'>Product</View>
      </View>
    )
  }
}

export default ProductShow