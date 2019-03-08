import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtMessage, AtActionSheet } from 'taro-ui'

class UserAccount extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: '',
    action: 'login',
    submitButtonText: '登录',
    openGetUserInfoActionSheet: false,
    wxUserInfo: {}
  }

  handleClickActionSheet(item) {
    switch (item) {
      case 'primary':
        console.log('action sheet primary action')
        break
    }

    this.setState({
      openGetUserInfoActionSheet: false
    })
  }

  handleGetUserInfo(result) {
    switch (result.detail.errMsg) {
      case 'getUserInfo:ok':
        this.wxUserBind()
        break
      case 'getUserInfo:fail auth deny':
        Taro.atMessage({
          type: 'warning',
          message: '无法获取您的微信用户信息。'
        })
        break
    }
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

        Taro.eventCenter.trigger('user::logged_in', response.data)

        Taro.navigateBack()

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

  async userRegister() {
    const { username, password } = this.state

    const response = await Taro.request({
      method: 'POST',
      url: `${API_WS}/users`,
      data: {
        username,
        password
      }
    })

    switch (response.statusCode) {
      case 201:
        this.userLogin()
        break
      case 409:
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
      case 'register':
        this.userRegister(this)
        break
      case 'wxBind':
        this.wxUserBindSubmit()
        break
    }
  }

  async wxUserBindSubmit() {
    const { username, password, wxUserInfo } = this.state
    const code = await this.wxLoginCode()
    if (!code) return

    const response = await Taro.request({
      method: 'POST',
      url: `${API_WS}/wx-bind`,
      data: {
        username,
        password,
        wxUserInfo,
        code
      }
    })

    switch (response.statusCode) {
      case 200:
        await Taro.setStorage({
          key: 'token',
          data: response.data
        })

        Taro.eventCenter.trigger('user::logged_in', response.data)
        Taro.navigateBack()
        break
      default:
        Taro.atMessage({
          type: 'error',
          message: response.data
        })
    }

    console.log(response)
  }

  handleClickText(text) {
    switch (text) {
      case 'register':
        Taro.setNavigationBarTitle({
          title: '注册用户'
        })

        this.setState({
          action: 'register',
          submitButtonText: '注册用户'
        })

        break
      case 'login':
        Taro.setNavigationBarTitle({
          title: '登录'
        })

        this.setState({
          action: 'login',
          submitButtonText: '登录'
        })

        break
      case 'wxLogin':
        this.wxUserLogin()

        break
    }
  }

  async wxLoginCode() {
    try {
      const response = await Taro.login()
      const { code } = response
      return code
    } catch (error) {
      Taro.atMessage({
        type: 'error',
        message: '微信登录失败，请重试！'
      })
    }
  }

  async wxUserInfo() {
    try {
      const userInfo = await Taro.getUserInfo()
      return userInfo
    } catch (error) {
      this.setState({
        openGetUserInfoActionSheet: true
      })

      throw new Error(error.errMsg)
    }
  }

  async wxUserBind() {
    try {
      const userInfo = await this.wxUserInfo()

      this.setState({
        wxUserInfo: userInfo,
        action: 'wxBind',
        submitButtonText: '绑定微信用户'
      })

      Taro.setNavigationBarTitle({
        title: '为现有用户绑定微信帐户'
      })

      Taro.atMessage({
        type: 'info',
        message: '输入应用的用户与密码并确认绑定。'
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async wxUserLogin() {
    console.log('微信登录')
    const code = await this.wxLoginCode()
    console.log('登录凭证：', code)

    if (!code) return

    try {
      const response = await Taro.request({
        method: 'POST',
        url: `${API_WS}/wx-login`,
        data: {
          code
        }
      })

      switch (response.statusCode) {
        case 404:
          this.wxUserBind()
          break
      }
    } catch (error) {
      Taro.atMessage({
        type: 'error',
        message: '微信登录失败，请重试！'
      })
    }
  }

  render() {
    const { action, submitButtonText, openGetUserInfoActionSheet } = this.state

    const registerText = (
      <Text
        className='px-2'
        onClick={this.handleClickText.bind(this, 'register')}
      >注册用户</Text>
    )

    const loginText = (
      <Text
        className='px-2'
        onClick={this.handleClickText.bind(this, 'login')}
      >登录</Text>
    )

    const wxLoginText = (
      <Text
        className='px-2'
        onClick={this.handleClickText.bind(this, 'wxLogin')}
      >微信登录</Text>
    )

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
          onClick={this.handleClick.bind(this, action)}
          className='mt-5'
        >{submitButtonText}</AtButton>
        <View className='mt-3 text-center text-muted'>
          {registerText} /
          {loginText} /
          {wxLoginText}
        </View>
        <AtActionSheet
          className='action-sheet'
          title='需要您授权我们使用微信帐户数据。'
          isOpened={openGetUserInfoActionSheet}
        >
          <View className='action-sheet__action'>
            <AtButton
              type='primary'
              open-type='getUserInfo'
              onClick={this.handleClickActionSheet.bind(this, 'primary')}
              onGetUserInfo={this.handleGetUserInfo.bind(this)}
            >
              授权获取用户信息
            </AtButton>
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default UserAccount