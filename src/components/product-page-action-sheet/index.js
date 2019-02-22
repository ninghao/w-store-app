import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet, AtButton } from 'taro-ui'

class ProductPageActionSheet extends Component {
  static options = {
    addGlobalClass: true
  }

  handleClick() {
    this.props.onClick(this.state)
  }

  render() {
    const {
      show,
      action,
      actionText
    } = this.props

    return (
      <View className='action-sheet'>
        <AtActionSheet isOpened={show}>
          <View className='p-3'>
            ActionSheet
          </View>
          <View className='action-sheet__action'>
            <AtButton type={action} onClick={this.handleClick}>{actionText}</AtButton>
          </View>
        </AtActionSheet>
      </View>
    )
  }
}

export default ProductPageActionSheet