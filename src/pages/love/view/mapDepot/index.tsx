import { FC, useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import Header from '../../../../components/header/Header'
import RefreshScrollView from '../../../../components/refresh/index'
import WaterfallPhoto from '../../../../components/WaterfallPhoto'
import throttle from 'lodash/throttle'
import UploadFile from './components/upload'
import { getMapDepotData } from '../../../../api/love'
import Skeleton from './skeleton'


let _throttle: any;
const Index: FC = () => {
  const [showList, setShowList] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const sum = useRef(0)
  const [page, setPage] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  useEffect(() => {
    featchData(page.pageSize, page.pageNum)
  }, [])

  function featchData(pageSize, pageNum) {

    getMapDepotData({ pageSize, pageNum }).then(({ data }) => {
      setShowList(data.data)
      sum.current += data.data.length
      setPage({
        pageSize: data.pageSize,
        pageNum: data.pageNum,
        total: data.total,
      })
    }).finally(() => setLoading(false))
  }

  const refresh = (cl) => {
    cl();
  }

  const loadMore = () => {
    if (_throttle) {
      _throttle(page)
    } else {
      _throttle = throttle(function (page) {
        if (sum.current < page.total) {
          featchData(page.pageSize, page.pageNum + 1)
        }
      }, 1000);
      _throttle(page)
    }
  }
  function onUploadSuccess(v) {
    console.log(v);
  }
  return (
    <View className='mapDepot_box'>
      <Header title='图库' />
      {/* <UploadFile onUploadSuccess={onUploadSuccess} /> */}

      {loading ? <Skeleton /> :
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
      }
    </View >
  )
}


export default Index;