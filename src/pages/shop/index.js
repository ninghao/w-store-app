import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtPagination } from 'taro-ui'
import SearchBar from '../../components/search-bar'
import ProductList from '../../components/product-list'
import Placeholder from '../../components/placeholder';

class ShopIndex extends Component {
  config = {
    navigationBarTitleText: 'W-Store'
  }

  state = {
    products: [],
    placeholder: true,
    total: 0,
    pageSize: 2,
    current: 1,
  }

  async componentWillMount() {
    this.fetchData()
  }

  async fetchData() {
    const response = await Taro.request({
      url: `${API_WS}/products?_limit=${this.state.pageSize}&_page=${this.state.current}`
    })

    const { data, header } = response

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          products: data,
          placeholder: false,
          total: header['X-Total-Count']
        })
      }, 2000)
    } else {
      this.setState({
        products: data,
        placeholder: false,
        total: header['X-Total-Count']
      })
    }
  }

  onPageChange({ current }) {
    this.setState({
      current,
      placeholder: true
    }, () => {
      this.fetchData()
    })
  }

  render() {
    const { products, placeholder, total, pageSize, current } = this.state

    return (
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
  }
}

export default ShopIndex