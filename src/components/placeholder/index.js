import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

class Placeholder extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    className: '',
    quantity: 1,
    show: false,
    type: ''
  }

  render() {
    const classValue = classNames(
      'ui placeholder',
      this.props.className
    )
    const quantity = parseInt(this.props.quantity)
    const items = [...Array(quantity).keys()]

    const { show, type } = this.props

    return (
      <View>
        {
          show &&
          items.map(i =>
            <View key={i}>
              <View className={classValue}>
                <View className='image rectangular'></View>
                <View className='line'></View>
                <View className='very short line'></View>
              </View>
              {type === 'product' &&
                <View>
                  <View className={`${classValue} mb-5`}>
                    <View className='full line'></View>
                    <View className='long line'></View>
                  </View>
                  <View className={`${classValue} mb-5`}>
                    <View className='very short line'></View>
                    <View className='full line'></View>
                    <View className='full line'></View>
                    <View className='medium line'></View>
                  </View>
                </View>
              }
            </View>
          )
        }
      </View>
    )
  }
}

export default Placeholder