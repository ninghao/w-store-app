import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

class UserSettings extends Component {
  config = {
    navigationBarTitleText: '用户设置'
  }

  handleClick(item) {
    switch (item) {
      case 'logout':
        Taro.removeStorageSync('token')
        Taro.eventCenter.trigger('user::logged_out')
        Taro.navigateBack()
        break
    }
  }

  render() {
    return (
      <View>
        <AtList>
          <AtListItem title='退出登录' onClick={this.handleClick.bind(this, 'logout')} />
        </AtList>
      </View>
    )
  }
}

export default UserSettings