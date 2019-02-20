import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './assets/styles/app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/product/show',
      'pages/shop/index',
      'pages/shop/cart',
      'pages/user/profile',
      'pages/index/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#000',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/shop/index',
          iconPath: 'assets/icons/store.png',
          selectedIconPath: 'assets/icons/store-active.png',
          text: '商店'
        },
        {
          pagePath: 'pages/shop/cart',
          iconPath: 'assets/icons/shopping-basket.png',
          selectedIconPath: 'assets/icons/shopping-basket-active.png',
          text: '购物袋'
        },
        {
          pagePath: 'pages/user/profile',
          iconPath: 'assets/icons/profile.png',
          selectedIconPath: 'assets/icons/profile-active.png',
          text: '我的'
        },
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
