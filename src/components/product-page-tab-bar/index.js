import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtBadge, AtButton } from 'taro-ui'
import MaterialIcon from '../material-icon';

class ProductPageTabBar extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    return (
      <View className={this.props.className}>
        <View className='at-tab-bar at-tab-bar--fixed tab-bar'>
          <View className='at-tab-bar__item tab-bar__item--icon'>
            <AtBadge dot>
              <View className='at-tab-bar__icon'>
                <MaterialIcon icon='shopping_basket' color='#000' />
              </View>
            </AtBadge>
          </View>
          <View className='tab-bar__item'>
            <AtButton
              type='secondary'
            >加入购物袋</AtButton>
          </View>
          <View className='tab-bar__item'>
            <AtButton
              type='primary'
            >立即购买</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default ProductPageTabBar