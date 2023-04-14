import { FC, useEffect, useMemo, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import Corrugation from '../../components/corrugation'
import { diffDate, getCurrentTime } from '../../utils/utils'
import common from '../../utils/common'


let interval
const Index: FC = () => {

  const [time, setTime] = useState({
    d: diffDate(),
    hh: '',
    mm: '',
    ss: '',
  })

  const birthday = useMemo(() => diffDate('2024-01-16'), [])
  useEffect(() => {
    interval = setInterval(() => {
      const { hh, mm, ss } = getCurrentTime()
      setTime({
        d: diffDate(), hh, mm, ss
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <View className='love_box'>

      <View className='touxiang_box'>
        <View className='touxiang_box_content'>
          <View className='touxiang dis_aj bor-r'>
            <Image
              src={common.protraitN}
            />
          </View>
          <View className='dis_jc mb_20 mt_10'>小羊</View>
          <View className='dis_jc touxiang_box_content_text'>
            02月08日
            <Text className='some_font'>（2022）</Text>
          </View>
          <View className='dis_jc love_day'>
            相恋的日子
          </View>
        </View>
        <Image
          className='xin anima  bor-r'
          src={require('../../assets/image/main/aixin.png')}
        />
        <View className='touxiang_box_content'>
          <View className='touxiang dis_aj  bor-r'>
            <Image
              src={common.protraitW}
            />
          </View>
          <View className='dis_jc  mb_20 mt_10'>橙砸</View>
          <View className='dis_jc touxiang_box_content_text'>
            {birthday}
            <Text className='some_font'>（天）</Text>
          </View>
          <View className='dis_jc love_day'>
            距离她生日
          </View>
        </View>
      </View>
      <Corrugation />
      <View className='love_box_info'>
        <View className='love_box_info_title'>这是我们一起走过的</View>
        <View className='love_box_info_time'>
          第
          <Text>{time.d}</Text>
          天
          <Text>{time.hh}</Text>
          小时
          <Text>{time.mm}</Text>
          分
          <Text>{time.ss}</Text>
          秒
        </View>



        <View className='love_list'>
          {
            common.loveList.map((t, i) => {
              return (
                <View className={`love_list_box ${'float_s_x_' + i}`} onClick={t.onclick}>
                  <View className='love_list_box_image'>
                    <Image
                      src={t.icon}
                    />
                  </View>
                  <View className='love_list_box_info'>
                    <View className='love_list_box_info_title'>{t.titile}</View>
                    <View className='love_list_box_info_dec text1'>{t.dec}</View>
                  </View>
                </View>

              )
            })
          }
        </View>
      </View>

      {/* <Header title='图库' /> */}
      {/* <View className='mapDepot_box_main_box bag'> */}
      {/* <RefreshScrollView height={60}
          refresh={refresh}
          loadMore={loadMore}
        >
          
        </RefreshScrollView> */}
      {/* </View> */}

    </View >
  )
}


export default Index;

