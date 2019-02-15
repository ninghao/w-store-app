import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

class SearchBar extends Component {
  render() {
    return (
      <View>
        <AtSearchBar />
      </View>
    )
  }
}

export default SearchBar