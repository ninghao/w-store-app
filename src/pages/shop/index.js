import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtPagination } from 'taro-ui'
import SearchBar from '../../components/search-bar'
import ProductList from '../../components/product-list'
import Placeholder from '../../components/placeholder';
import fetchData from '../../utilities/fetch-data'

class ShopIndex extends Component {
  constructor() {
    this.fetchData = fetchData
  }

  config = {
    navigationBarTitleText: 'W-Store'
  }

  state = {
    products: [],
    placeholder: true,
    total: 0,
    pageSize: 2,
    current: 1,
    serviceError: false
  }

  fetchDataSuccess(response) {
    const { data, header } = response

    this.setState({
      products: data,
      placeholder: false,
      total: header['X-Total-Count']
    })
  }

  fetchDataFail() {
    this.setState({
      serviceError: true
    })
  }

  async componentWillMount() {
    this.fetchData({
      resource: 'products',
      page: this.state.current,
      pageSize: this.state.pageSize,
      success: this.fetchDataSuccess.bind(this),
      fail: this.fetchDataFail.bind(this)
    })
  }

  onPageChange({ current }) {
    this.setState({
      current,
      placeholder: true
    }, () => {
      this.fetchData({
        resource: 'products',
        page: this.state.current,
        pageSize: this.state.pageSize,
        success: this.fetchDataSuccess.bind(this),
        fail: this.fetchDataFail.bind(this)
      })
    })
  }

  render() {
    const { products, placeholder, total, pageSize, current, serviceError } = this.state
    const page = (
      <View>
        <SearchBar />
        <Placeholder className='m-3' quantity={pageSize} show={placeholder} />
        {!placeholder && <ProductList data={products} />}
        <AtPagination
          icon
          total={parseInt(total)}
          pageSize={pageSize}
          current={current}
          className='my-4'
          onPageChange={this.onPageChange.bind(this)}
        />
      </View>
    )

    const errorPage = (
      <View className='page-demo'>
        服务出现问题，请稍后再试。
      </View>
    )
    return (
      <View>
        {serviceError ? errorPage : page}
      </View>
    )
  }
}

export default ShopIndex