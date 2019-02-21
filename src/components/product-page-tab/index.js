import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import RichTextWxParse from '../rich-text-wx-parse'

class ProductPageTab extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    data: {
      attributes: []
    },
    activeTab: 0,
    tabList: [],
    onClick: () => { }
  }

  render() {
    const { data: product, activeTab, tabList } = this.props

    return (
      <View className='mx-3 my-5'>
        <AtTabs
          current={activeTab}
          tabList={tabList}
          onClick={this.props.onClick}
        >
          <AtTabsPane className='mt-4' current={activeTab} index={0}>
            <RichTextWxParse content={product.description} />
          </AtTabsPane>
          <AtTabsPane className='mt-4' current={activeTab} index={1}>
            <AtList hasBorder={false}>
              {product.attributes.map(attr =>
                <AtListItem
                  key={attr.id}
                  hasBorder={false}
                  title={attr.name}
                  note={attr.options.toString()}
                />
              )}
            </AtList>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default ProductPageTab