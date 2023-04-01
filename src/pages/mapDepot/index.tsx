import { FC, useState } from 'react'
import { MovableArea, Map, View, OpenData } from '@tarojs/components'
import './index.scss'
import Header from '../../components/header/Header'
import RefreshScrollView from '../../components/refresh/index'
import WaterfallPhoto from '../../components/WaterfallPhoto'
import throttle from 'lodash/throttle'

const list = [
  'https://img1.baidu.com/it/u=2454531485,3620547258&fm=253&fmt=auto&app=138&f=JPEG?w=696&h=500',
  'https://t7.baidu.com/it/u=957167807,2009858875&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2961459243,2146986594&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=3140866878,3539498902&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2217588165,3998797183&fm=193&f=GIF',
]

let _throttle: any;
const Index: FC = () => {
  const [showList, setShowList] = useState([
    'https://hbimg.huaban.com/4da20950139495d219fdc0f1fa1ea2d5353f77562160f-WrQngD_fw658',
    'https://img2.baidu.com/it/u=2048301617,2693005057&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
    'https://hbimg.b0.upaiyun.com/d9878881df96928fd028ec06c1ae5f649acd1fad25eea-63yo8s_fw658',
    'https://img0.baidu.com/it/u=559941690,3651954043&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=960',
    'https://img.pconline.com.cn/images/upload/upc/tx/itbbs/2203/06/c0/300581310_1646518039946_thumb.jpg',
    'https://img1.baidu.com/it/u=762688300,1838213680&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
    'https://img2.baidu.com/it/u=643243775,4217490062&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    'https://hbimg.huaban.com/4da20950139495d219fdc0f1fa1ea2d5353f77562160f-WrQngD_fw658',
    'https://img2.baidu.com/it/u=2048301617,2693005057&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  ])

  const refresh = (cl) => {
    cl();
  }

  const loadMore = () => {
    console.log(2);

    if (_throttle) {
      _throttle()
    } else {
      _throttle = throttle(() => {
        console.log(1);

        setShowList(list)
      }, 1000);
      _throttle()
    }
  }
  return (
    <View className='mapDepot_box'>
      <Header title='图库' />
      <View className='mapDepot_box_main_box bag'>
        <RefreshScrollView height={60}
          refresh={refresh}
          loadMore={loadMore}
        >
          <View className='item_box'>
            <WaterfallPhoto showList={showList} />
          </View>
        </RefreshScrollView>
      </View>

    </View>
  )
}


export default Index;