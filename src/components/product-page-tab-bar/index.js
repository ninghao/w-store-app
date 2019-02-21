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
        <View className='at-tab-bar at-tab-bar--fixed'>
          <View className='at-tab-bar__item'>
            <AtBadge dot>
              <View className='at-tab-bar__icon'>
                <MaterialIcon icon='shopping_basket' color='#000' />
              </View>
            </AtBadge>
          </View>
          <View>
            <AtButton
              type='secondary'
            >加入购物袋</AtButton>
          </View>
          <View>
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