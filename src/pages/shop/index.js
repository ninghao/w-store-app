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
    serviceError: false,
    search: ''
  }

  search(value = '') {
    this.fetchData({
      resource: 'products',
      search: value,
      page: this.state.current,
      pageSize: this.state.pageSize,
      success: this.fetchDataSuccess.bind(this),
      fail: this.fetchDataFail.bind(this)
    })
  }

  onChangeSearchBar(value) {
    console.log(value)
    this.setState({
      search: value
    }, () => {
      this.search(this.state.search)
    })
  }

  onActionClickSearchBar() {
    this.search(this.state.search)
    console.log('action click search')
  }

  onConfirmSearchBar() {
    this.search(this.state.search)
    console.log('confirm search')
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
        <SearchBar
          value={this.state.search}
          onChange={this.onChangeSearchBar.bind(this)}
          onActionClick={this.onActionClickSearchBar.bind(this)}
          onConfirm={this.onConfirmSearchBar.bind(this)}
        />
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