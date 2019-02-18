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
    serviceError: false
  }

  async componentWillMount() {
    this.fetchData()
  }

  async fetchData() {
    try {
      const response = await Taro.request({
        url: `${API_WS}/products?_limit=${this.state.pageSize}&_page=${this.state.current}`
      })

      const { data, header, statusCode } = response

      switch (statusCode) {
        case 200:
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
          break;
        default:
          throw new Error('出问题了！')
          break;
      }
    } catch (error) {
      this.setState({
        serviceError: true
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