import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class UserProfile extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    username: ''
  }

  constructor() {
    Taro.eventCenter.on('user::logged_in', this.fetchUserData.bind(this))
  }

  fetchUserData(user) {
    this.setState({
      username: user.username
    })
  }

  async componentWillMount() {
    try {
      const tokenStorage = await Taro.getStorage({
        key: 'token'
      })

      const { username } = tokenStorage.data

      if (username) {
        this.setState({
          username
        })
      }
    } catch (error) {
      Taro.navigateTo({
        url: '/pages/user/account'
      })
    }
  }

  render() {
    const { username } = this.state

    return (
      <View>
        <View className='page-demo'>
          {username ? username : 'UserProfile'}
        </View>
      </View>
    )
  }
}

export default UserProfile