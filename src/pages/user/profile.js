import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class UserProfile extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  async componentWillMount() {
    try {
      await Taro.getStorage({
        key: 'token'
      })
    } catch (error) {
      Taro.navigateTo({
        url: '/pages/user/account'
      })
    }
  }

  render() {
    return (
      <View>
        <View className='page-demo'>
          UserProfile
        </View>
      </View>
    )
  }
}

export default UserProfile