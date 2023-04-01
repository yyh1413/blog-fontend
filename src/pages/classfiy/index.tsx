import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import Header from '../../components/header/Header'
import EssayItem from '../../components/essayItem/EssayItem'
import RefreshScrollView from '../../components/refresh/index'
import { IClassfiy, IEssay } from '../../interface/essay'
import { getClassfiyData, getEssayData } from '../../api/main'
import { getCurrentInstance } from '@tarojs/taro'
import Skeleton from './skeleton'
const Index: FC = () => {
  const [menu, setMenu] = useState<IClassfiy[]>();
  const [data, setData] = useState<IEssay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const { router } = getCurrentInstance();
    const classfiyName = router?.params?.classfiyName
    fetchData(classfiyName)
  }, [])

  function fetchData(classfiyName?: string) {
    getClassfiyData().then(res => {
      const { code, data } = res;
      if (code === 200) {
        if (classfiyName) {
          data.forEach(v => {
            if (v.classfiyName === classfiyName) {
              v.active = true;
            }
          })
        } else {
          data[0].active = true
        }
        getEssayList(classfiyName || data[0]?.classfiyName)
        setMenu(data)
      }
    })
  }
  function getEssayList(classfiyName: string) {
    getEssayData({ classfiyName }).then(res => {
      const { code, data } = res;
      if (code === 200) {
        setData(data)
      }
    })
      .finally(() => setLoading(false))
  }

  function handleMenu(classfiyName: string) {
    menu?.forEach(v => v.active = v.classfiyName === classfiyName)
    setMenu(menu)
    setData([])
    getEssayList(classfiyName)
  }
  const refresh = (cl) => {
    cl();
  }
  return (
    <View className='classfiy_box'>
      <Header title='文章分类' />
      <View className='classfiy_main_box'>
        <View className='menu_box'>
          {
            menu?.map((t, i) => (
              <View className={`menu_item ${t.active ? 'menu_item_active' : ''}`} onClick={() => handleMenu(t.classfiyName)}>
                {t.classfiyName}
              </View>))
          }
        </View>
        <RefreshScrollView height={65}
          refresh={refresh} >
          {
            loading ? <Skeleton /> :
              <View className='item_box'>
                <EssayItem data={data} />

              </View>
          }
        </RefreshScrollView>
      </View>



    </View>
  )
}


export default Index;