import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
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

  handleClick(index) {
    const { selected, items } = this.props
    const item = items[index]
    const { product_id: value } = item
    const selectedSet = new Set(selected)

    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }

    this.props.onChange([...selectedSet])
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

          const classValue = classNames('list__item', {
            'at-checkbox__option--selected': selected.includes(value)
          })

          return <View
            key={value}
            className={classValue}
            onClick={this.handleClick.bind(this, index)}
          >
            <View className='list__item-checkbox'>
              <View className='at-checkbox__icon-cnt'>
                <Text className='at-icon at-icon-check'></Text>
              </View>
            </View>
            <Image className='list__item-image' src={image} mode='aspectFit' />
            <View className='list__item-content'>
              <View className='list__item-content-header mb-1'>
                {title}
              </View>
              <View className='list__item-content-item mb-1'>
                <Text className='text-muted'>
                  {'￥' + price + ' × ' + quantity}
                </Text>
              </View>
              <View className='list__item-content-footer'>
                <Text>{'￥' + total}</Text>
              </View>
            </View>
          </View>
        })}
      </View>
    )
  }
}

export default CartItemList