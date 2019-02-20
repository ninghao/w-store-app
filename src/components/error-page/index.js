import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class ErrorPage extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    return (
      <View className='page-demo'>
        {this.props.content}
      </View>
    )
  }
}

export default ErrorPage