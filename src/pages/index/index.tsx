import { Component, PropsWithChildren } from 'react'
import { View, Image, Icon, ScrollView } from '@tarojs/components'
import './index.scss'
import Header from '../../components/header'
import { connect, } from 'react-redux'
import Swiper from './components/Swiper'
import Classify from './components/Classify'
import Essay from './components/Essay'
import Taro from '@tarojs/taro'
import RefreshScrollView from '../../components/refresh/index'
import { getEssayData } from '../../api/main'
import IndexSkeleton from './skeleton'
import { IEssay } from 'src/interface/essay'
class Index extends Component<PropsWithChildren> {

  state = {
    loading: true,
    data: [] as IEssay[]
  }

  componentDidMount() {
    this.init();
  }
  private init = () => {

    getEssayData().then(res => {
      this.setState({ data: res.data })
    }).finally(() => {
      this.setState({ loading: false })
    })

    // get()
  }
  private handleGoSearch = (type = 0) => {
    Taro.navigateTo({
      url: "/pages/search/index?type=" + type,
    });
  }
  private handleGoEssay = (classfiyName?: string) => {
    const url = "/pages/classfiy/index" + (classfiyName ? `?classfiyName=` + classfiyName : "")
    console.log(url);

    Taro.navigateTo({ url });
  }
  private refresh = (endLoading) => {
    endLoading()
  }

  render() {
    if (this.state.loading) {
      return (<IndexSkeleton />
      )
    }
    const { data } = this.state;
    return (
      <View className='index'>
        <Header>
          <View className='touxiang'>
            <Image className='touxiang_img'
              src={require('../../assets/image/main/touxiang.jpeg')}
            ></Image>
          </View>
          <View className='search_box' style={{ height: 22 }} onClick={() => this.handleGoSearch()}>
            <Icon className="icon-box-img" type="search" size="16"></Icon>

            <View>搜索文章...</View>
          </View>
        </Header>
        <RefreshScrollView
          height={65}
          refresh={this.refresh}
        >
          <View style={{ padding: '0 10px' }}>
            <Swiper data={data} />
            <View className='main_content_box'>
              <Classify handleGoEssay={this.handleGoEssay} />
              <Essay handleGoSearch={this.handleGoSearch} data={data} />
            </View>
          </View>
        </RefreshScrollView>

      </View >
    )
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(Index)
