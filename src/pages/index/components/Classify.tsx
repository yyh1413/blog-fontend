import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { FC, useEffect, useState } from 'react'
import Title from '../../../components/title'
import { getClassfiyData } from '../../../api/main'
import { IClassfiy } from 'src/interface/essay'

interface Iprops {
  handleGoEssay: (classfiyName?: string) => void
}
const Index: FC<Iprops> = (props) => {
  const [data, setData] = useState<IClassfiy[]>();
  useEffect(() => {
    fetchData()
  }, [])
  function fetchData() {
    getClassfiyData().then(res => {
      const { code, data } = res;
      if (code === 200) {
        setData(data)
      }
    })
  }
  return (
    <View className='main_classify_box'>
      <Title text='精选分类' onclick={() => props.handleGoEssay()} />
      <View className='swiper_pre'>
        <View className='swiper'>
          {
            data?.map((item) => {
              return (
                <View className='swiper_item box-sha' onClick={() => props.handleGoEssay(item.classfiyName)}>
                  <View className='swiper_item_box dis_aj'>
                    <Image className='swiper_item_image' src={item.path} />
                  </View>
                  <View className='text dis_aj'>{item.classfiyName}</View>
                </View>
              )
            })
          }
        </View>
      </View>
    </View >
  )
}

export default Index
