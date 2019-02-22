import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import fetchData from '../../utilities/fetch-data'
import Placeholder from '../../components/placeholder'
import ErrorPage from '../../components/error-page'
import ProductPageCard from '../../components/product-page-card'
import ProductPageTab from '../../components/product-page-tab'
import ProductPageTabBar from '../../components/product-page-tab-bar'
import ProductPageActionSheet from '../../components/product-page-action-sheet'

class ProductShow extends Component {
  config = {
    navigationBarTitleText: 'ProductShow',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }

  state = {
    product: {},
    placeholder: true,
    serviceError: false,
    errorPageMessage: '',
    indicatorDots: false,
    activeTab: 0,
    actionSheet: false,
  }

  constructor() {
    this.fetchData = fetchData

    const { id = 1, name } = this.$router.params
    this.id = id
    this.name = name
  }

  onPullDownRefresh() {
    this.setState({
      serviceError: false
    }, () => {
      this.fetchData({
        resource: 'products',
        id: this.id,
        success: this.fetchDataSuccess.bind(this),
        fail: this.fetchDataFail.bind(this),
        complete: this.fetchDataComplete.bind(this)
      })
    })
  }

  fetchDataSuccess(response) {
    const { data } = response

    this.setState({
      product: data
    })

    if (data.images.length > 1) {
      this.setState({
        indicatorDots: true
      })
    }

    Taro.setNavigationBarTitle({
      title: data.name
    })
  }

  fetchDataComplete() {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          placeholder: false
        })
      }, 1000)
    } else {
      this.setState({
        placeholder: false
      })
    }

    Taro.stopPullDownRefresh()
  }

  fetchDataFail(error) {
    this.setState({
      serviceError: true,
      errorPageMessage: error.message
    })
  }

  componentWillMount() {
    if (this.name) {
      Taro.setNavigationBarTitle({
        title: this.name
      })
    }

    this.fetchData({
      resource: 'products',
      id: this.id,
      success: this.fetchDataSuccess.bind(this),
      fail: this.fetchDataFail.bind(this),
      complete: this.fetchDataComplete.bind(this)
    })
  }

  onClickTab(activeTab) {
    this.setState({
      activeTab
    })
  }

  onClickTabBar(item) {
    console.log(`点击: ${item}`)

    switch (item) {
      case 'primary':
        this.setState({
          actionSheet: true
        })
        break
      case 'secondary':
        this.setState({
          actionSheet: true
        })
        break
    }
  }

  render() {
    const {
      product,
      placeholder,
      serviceError,
      errorPageMessage,
      indicatorDots,
      activeTab,
      actionSheet
    } = this.state
    const tabList = [
      { title: '描述' },
      { title: '参数' },
    ]

    const page = (
      <View>
        <Placeholder className='m-3' show={placeholder} type='product' />
        {!placeholder &&
          <View>
            <ProductPageCard data={product} indicatorDots={indicatorDots} />
            <ProductPageTab
              data={product}
              tabList={tabList}
              activeTab={activeTab}
              onClick={this.onClickTab}
            />
            <ProductPageTabBar
              primary='立即购买'
              secondary='加入购物袋'
              icon='shopping_basket'
              disabled={false}
              disabledText='暂时无货'
              onClick={this.onClickTabBar}
              dot
            />
            <ProductPageActionSheet
              show={actionSheet}
            />
          </View>
        }
      </View>
    )

    const errorPage = <ErrorPage content={errorPageMessage} />
    return (
      <View>
        {serviceError ? errorPage : page}
      </View>
    )
  }
}

export default ProductShow