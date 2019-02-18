import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Placeholder extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    quantity: 1,
    show: false,
  }

  render() {
    const quantity = parseInt(this.props.quantity)
    const items = [...Array(quantity).keys()]

    const { show } = this.props

    return (
      <View>
        {
          show &&
          items.map(i =>
            <View key={i} className='ui placeholder'>
              <View className='image rectangular'></View>
              <View className='line'></View>
              <View className='very short line'></View>
            </View>
          )
        }
      </View>
    )
  }
}

export default Placeholder