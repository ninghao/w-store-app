import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

class SearchBar extends Component {
  render() {
    return (
      <View>
        <AtSearchBar
          value={this.props.value}
          onChange={this.props.onChange}
          onActionClick={this.props.onActionClick}
          onConfirm={this.props.onConfirm}
        />
      </View>
    )
  }
}

export default SearchBar