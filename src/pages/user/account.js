import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'

class UserAccount extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: ''
  }

  async userLogin() {
    const { username, password } = this.state

    const response = await Taro.request({
      method: 'POST',
      url: `${API_WS}/user-login`,
      data: {
        username,
        password
      }
    })

    switch (response.statusCode) {
      case 200:
        await Taro.setStorage({
          key: 'token',
          data: response.data
        })

        break
      case 404:
        Taro.atMessage({
          type: 'error',
          message: response.data
        })

        break
      case 401:
        Taro.atMessage({
          type: 'error',
          message: response.data
        })

        break
    }
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  handleClick(field) {
    switch (field) {
      case 'login':
        this.userLogin(this)
        break
    }
  }

  render() {
    return (
      <View className='pt-5 m-5 form'>
        <AtMessage />
        <AtInput
          name='username'
          type='text'
          placeholder='用户'
          value={this.state.username}
          onChange={this.handleChange.bind(this, 'username')}
          className='mb-3'
        />
        <AtInput
          name='password'
          type='password'
          placeholder='密码'
          value={this.state.password}
          onChange={this.handleChange.bind(this, 'password')}
          className='mb-3'
        />
        <AtButton
          type='primary'
          onClick={this.handleClick.bind(this, 'login')}
          className='mt-5'
        >登录</AtButton>
      </View>
    )
  }
}

export default UserAccount