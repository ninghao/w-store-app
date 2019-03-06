import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

class UserAccount extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <View className='pt-5 m-5 form'>
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