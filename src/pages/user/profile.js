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
    Taro.eventCenter.on('user::logged_out', () => {
      this.setState({
        username: ''
      })
    })
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

  handleClick(item) {
    switch (item) {
      case 'settings':
        Taro.navigateTo({
          url: '/pages/user/settings'
        })
        break
    }
  }

  render() {
    const { username } = this.state

    return (
      <View>
        <View className='page-demo'>
          <View onClick={this.handleClick.bind(this, 'settings')}>
            {username ? username : 'UserProfile'}
          </View>
        </View>
      </View>
    )
  }
}

export default UserProfile