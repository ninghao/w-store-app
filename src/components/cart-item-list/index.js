import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

class CartItemList extends Component {
  static defaultProps = {
    selected: [],
    items: [],
    className: ''
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { items, selected, className } = this.props
    const rootClassValue = classNames('list', className)

    return (
      <View className={rootClassValue}>
        {items.map((item, index) => {
          const {
            product_id: value,
            name: title,
            image,
            price,
            quantity,
            total
          } = item

          const classValue = classNames('list__item')

          return <View key={value} className={classValue}>
            {title}
          </View>
        })}
      </View>
    )
  }
}

export default CartItemList