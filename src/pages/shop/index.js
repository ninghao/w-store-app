import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SearchBar from '../../components/search-bar'

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  render() {
    return (
      <View>
        <SearchBar />
        <View className='page-demo'>
          ShopIndex
        </View>
      </View>
    )
  }
}

export default ShopIndex