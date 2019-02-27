import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import { AtInputNumber } from 'taro-ui'
import MaterialIcon from '../material-icon'

class CartItemList extends Component {
  static defaultProps = {
    selected: [],
    items: [],
    className: ''
  }

  static options = {
    addGlobalClass: true
  }

  handleClick(type, index) {
    const { selected, items } = this.props
    const item = items[index]
    const { product_id: value } = item
    const selectedSet = new Set(selected)

    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }

    this.props.onChange(type, [...selectedSet])
  }

  render() {
    const { items, selected, className, editing } = this.props
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

          const checkbox = (
            <View className='list__item-checkbox' onClick={this.handleClick.bind(this, 'checkbox', index)}>
              <View className='at-checkbox__icon-cnt'>
                <Text className='at-icon at-icon-check'></Text>
              </View>
            </View>
          )

          const removeItem = (
            <View className='list__item-checkbox'>
              <MaterialIcon icon='remove_circle' size='24' className='mt-2' />
            </View>
          )

          const inputNumber = (
            <AtInputNumber
              min={1}
              max={100}
              step={1}
              value={quantity}
              className='my-2'
            />
          )

          const quantityItem = (
            <View className='list__item-content-item mb-1'>
              <Text className='text-muted'>
                {'￥' + price + ' × ' + quantity}
              </Text>
            </View>
          )

          return <View
            key={value}
            className={classValue}
          >
            {editing ? removeItem : checkbox}
            <Image className='list__item-image' src={image} mode='aspectFit' onClick={this.handleClick.bind(this, 'checkbox', index)} />
            <View className='list__item-content'>
              <View className='list__item-content-header mb-1'>
                {title}
              </View>
              {editing ? inputNumber : quantityItem}
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