import { FC, useEffect, useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import './index.scss'
import Header from '../../components/header/Header'
import EssayItem from '../../components/essayItem/EssayItem'
import RefreshScrollView from '../../components/refresh/index'
import Skeleton from '../classfiy/skeleton'
import util from '../../utils/common'
import { IEssay } from '../../interface/essay'
import { getEssayData } from '../../api/main'
import { getCurrentInstance } from '@tarojs/taro'
const Index: FC = () => {
  const { router } = getCurrentInstance();
  const type = router?.params?.type ? Number(router?.params?.type) : 0
  const [data, setData] = useState<IEssay[]>([]);
  const [active, setActive] = useState<number>(type);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchData()
  }, [active])

  function fetchData() {
    const param = {
      title: title,
      type: active
    }
    getEssayData(param).then(res => {
      const { code, data } = res;
      if (code === 200) setData(data)
    })
      .finally(() => setLoading(false))
  }
  const refresh = (cl) => {
    cl();
  }
  return (
    <View className='search_box'>
      <Header title='文章列表' />
      <View className='header'>
        <View className='header_search '>
          <Image className="icon-box-img"
            src={require('../../assets/image/main/search.svg')}
          ></Image>
          <Input type='text' placeholder='请输入关键词'
            style={{ height: "50px", paddingLeft: "5px", flex: 1 }}
            onInput={e => setTitle(e.detail.value)}
            onConfirm={() => fetchData()}
          />
        </View>
        <Text className='search_but' onClick={() => fetchData()}>搜索</Text>
      </View>
      <View className='menu_box'>
        {
          util.menulist.map((t) => {
            return (
              <View className={`menu_item ${t.id == active ? 'menu_item_active' : ''}`}
                onClick={() => setActive(t.id)}
              >{t.text}</View>
            )
          })
        }
      </View>
      <RefreshScrollView height={126} refresh={refresh} >

        <View className='essay_item_box'>
          {loading ?
            <Skeleton /> : <EssayItem data={data} />
          }

        </View>
      </RefreshScrollView>
    </View>
  )
}


export default Index;