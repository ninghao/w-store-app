import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Placeholder extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const { show } = this.props

    return (
      <View>
        {
          show &&
          <View className='ui placeholder'>
            <View className='image rectangular'></View>
            <View className='line'></View>
            <View className='very short line'></View>
          </View>
        }
      </View>
    )
  }
}

export default Placeholder