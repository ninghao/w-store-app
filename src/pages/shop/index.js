import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import SearchBar from '../../components/search-bar'

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  switchTab() {
    Taro.switchTab({
      url: '/pages/shop/cart',
    })
  }

  setTabBarBadge(type) {
    switch (type) {
      case 'badge':
        Taro.setTabBarBadge({
          index: 1,
          text: '1',
        })
        break;
      case 'dot':
        Taro.showTabBarRedDot({
          index: 1,
        })
        break;
    }
  }

  removeTabBarBadge(type) {
    switch (type) {
      case 'badge':
        Taro.removeTabBarBadge({
          index: 1,
        })
        break;
      case 'dot':
        Taro.hideTabBarRedDot({
          index: 1,
        })
        break;
    }
  }

  render() {
    return (
      <View>
        <SearchBar />
        <View className='page-demo'>
          <Text className='mx-1' onClick={this.switchTab.bind(this)}>SwitchTab</Text>
          <Text className='mx-1' onClick={this.setTabBarBadge.bind(this, 'dot')}>Add</Text>
          <Text className='mx-1' onClick={this.removeTabBarBadge.bind(this, 'dot')}>Remove</Text>
        </View>
      </View>
    )
  }
}

export default ShopIndex