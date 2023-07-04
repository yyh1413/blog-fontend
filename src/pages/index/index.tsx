import { Component, PropsWithChildren } from 'react'
import { View, Image, Icon, Button } from '@tarojs/components'
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
import common from '../../utils/common'
import { CACHE_CODE, CACHE_TOKEN, CACHE_USERINFO } from '../../utils/authority/config'
class Index extends Component<PropsWithChildren> {

  state = {
    loading: true,
    data: [] as IEssay[]
  }

  componentDidMount() {
    //有token时，不需要重新登录
    this.init();

    // const token = Taro.getStorageSync(CACHE_CODE);
    // if (token) {
    //   this.init();
    // } else {
    //   Taro.redirectTo({
    //     url: "/pages/login/index",
    //   });
    // }
  }
  private init = () => {
    getEssayData().then(res => {
      this.setState({ data: res.data })
      this.setState({ loading: false })
    })
  }
  private handleGoSearch = (type = 0) => {
    Taro.navigateTo({
      url: "/pages/index/view/search/index?type=" + type,
    });
  }
  private handleGoEssay = (classfiyName?: string) => {
    const url = "/pages/index/view/classfiy/index" + (classfiyName ? `?classfiyName=` + classfiyName : "")

    Taro.navigateTo({ url });
  }
  private refresh = (endLoading) => {
    endLoading()
  }
  private clear = (endLoading) => {
    Taro.setStorageSync(CACHE_TOKEN, undefined);
    Taro.setStorageSync(CACHE_CODE, undefined);
    Taro.setStorageSync(CACHE_USERINFO, undefined);
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
              src={common.protraitN}
            />

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
          <View style={{ padding: ' 0 10px' }}>
            {/* <Button onClick={this.clear}>点击</Button> */}
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
