import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

class UserProfile extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    username: '',
    avatar: ''
  }

  constructor() {
    Taro.eventCenter.on('user::logged_in', this.fetchUserData.bind(this))
    Taro.eventCenter.on('user::logged_out', () => {
      this.setState({
        username: '',
        avatar: ''
      })
    })
  }

  fetchUserData(user) {
    this.setState({
      username: user.username,
      avatar: user.avatar
    })
  }

  async componentWillMount() {
    try {
      const tokenStorage = await Taro.getStorage({
        key: 'token'
      })

      const { username, avatar } = tokenStorage.data

      if (username) {
        this.setState({
          username,
          avatar
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
      case 'login':
        Taro.navigateTo({
          url: '/pages/user/account'
        })
    }
  }

  render() {
    const { username, avatar } = this.state

    const usernameItem = (
      <View onClick={this.handleClick.bind(this, 'settings')}>
        <Text className='text-bold'>{username}</Text>
      </View>
    )

    const avatarItem = (
      <View onClick={this.handleClick.bind(this, 'settings')}>
        <Image
          src={avatar}
          className='avatar'
        />
      </View>
    )

    const loginTextItem = (
      <View onClick={this.handleClick.bind(this, 'login')}>
        <Text>登录 / 注册</Text>
      </View>
    )

    return (
      <View>
        <View className='page-demo'>
          <View>
            {avatar && avatarItem}
            {username && usernameItem}
            {!username && loginTextItem}
          </View>
        </View>
      </View>
    )
  }
}

export default UserProfile