import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import classNames from 'classnames'
import WsComponent from '../base'

class MaterialIcon extends WsComponent {
  static defaultProps = {
    customStyle: '',
    className: '',
    icon: '',
    size: 24,
    color: ''
  }

  render() {
    const { customStyle, className, icon, size, color } = this.props

    const rootStyle = {
      fontSize: `${Taro.pxTransform(parseInt(size) * 2)}`,
      color
    }

    return (
      <Text
        className={classNames(
          className,
          'material-icons'
        )}
        style={this.mergeStyle(rootStyle, customStyle)}
      >
        {icon}
      </Text>
    )
  }
}

export default MaterialIcon