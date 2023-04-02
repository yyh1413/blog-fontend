import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'
import Header from '../../components/header/Header'
import RefreshScrollView from '../../components/refresh/index'
import { getWeek } from '../../utils/utils'
import { styleText } from './common'
// import { textDemo } from './test'
import { getEssayData } from '../../api/main'
import { IEssay } from 'src/interface/essay'
import Skeleton from './skeleton'
import { getCurrentInstance } from '@tarojs/taro'
import common from '../../utils/common'
// const text = styleText + textDemo
interface IProps {
  // _id: string
}
const Index: FC<IProps> = () => {
  const [data, setData] = useState<IEssay>();
  useEffect(() => {
    fetchData()
  }, [])
  function fetchData() {
    const { router } = getCurrentInstance();

    getEssayData({ _id: router?.params?._id }).then(res => {
      const { code, data } = res;
      if (code === 200) {
        console.log(dayjs(data?.userName));

        setData(data)
      }
    })
  }
  const refresh = () => {
    fetchData();

  }
  if (!data) {
    return <Skeleton />
  }
  return (
    <View className='essay_info_box'>
      <Header title='文章详情' />
      <View className='give_box dis_aj box-sha1'>
        <Image className='give_box_img'
          src={require('../../assets/image/main/31dianzan.svg')}
        ></Image>
      </View>
      <View className='give_box1 dis_aj box-sha1'>
        <Image className='give_box_img'
          src={require('../../assets/image/main/31pinglun.svg')}
        ></Image>
      </View>
      <RefreshScrollView height={65} refresh={refresh} >
        <View className='essay_info_bottom '>
          <View className='title_box bor-r mb_20'>
            <View className='text0 mb_20 els'>{data?.title}</View>
            <View className='text3 mb_20'>{`博主：${data?.userName} 时间：${dayjs(data?.createTime).format('YYYY-MM-DD')} ${getWeek(data?.createTime)}`}</View>
            <Image className='essay_info_bottom_image  bor-r mb_20'
              src={data?.picture ?? ""} />
            <View className='essay_info_bottom_foter text3'>
              <View>
                <Text>{data?.readingVolume}</Text>
                <Text>阅读</Text>
              </View>
              <View>
                <Text>{data?.likeNumber}</Text>
                <Text>喜欢</Text>
              </View>
              <View>
                <Text>{data?.commentsNumber}</Text>
                <Text>评论</Text>
              </View>
              <View>
                <Text>{data?.wordNumber}</Text>
                <Text>字数</Text>
              </View>
            </View>
          </View>

          <View className='classfiy_box bor-r mb_20'>
            <View className=' mb_20 els dis_ac'>
              <View className='text1'>分类：</View>
              <>
                {
                  data?.classfiy.map((v) => (<View className='label'>{v}</View>))
                }
              </>
            </View>
            <View className='dis_ac'>
              <View className='text1'>标签：</View>
              <>
                {
                  data?.label.map((v) => (<View className='label1'>{v}</View>))
                }
              </>
            </View>

          </View>
          <View className='context bor-r mb_20'>
            {/* @ts-ignore */}
            <parcer content={data?.content ? styleText + data.content : ''} />
            {/* <parcer content={text} /> */}
          </View>

          <View className='copyright bor-r mb_20'>
            <View className='shu'>
              <Text>版权声明</Text>
            </View>

            <View className='copyright_info bor-r'>
              <Text >版权归属：文章由yang发布，侵权联删</Text>
              <Text >版权说明：使用《非商业性使用一相同方式共享4.0国际
                (CCBY-NC-SA4.0)》 协议授权，文章来源于网上收集或者
                原创，若未在文章内说明的均为原创文章
              </Text>
              <Text style={{ color: 'red' }}>侵权处理：若侵害到您的权力，请您及时联系我，在收到通知后第一时间处理。</Text>
            </View>

          </View>



          <View className='remark bor-r mb_20'>
            <View className='shu'>
              <Text>评论列表（4条）</Text>
            </View>
            <View className=''>
              {
                [1, 2, 3, 4].map(() => {
                  return (
                    <View className='remark_item'>
                      <View className='remark_item_box'>
                        <Image className='touxiang_img bor-r'
                          src={common.protraitN}

                        ></Image>
                        <View className='info'>
                          <View className='dis_ac title'>
                            <View className='mr_10'>张大帅</View>
                            <View className='tabs dis_aj bor-r box-sha'>游客</View>
                          </View>
                          <View className='text3 mb_15'>2022-11-11 13天前</View>
                          <View className='remark_context'>
                            哈哈哈哈哈哈
                          </View>
                        </View>
                      </View>

                      <View className='option'>
                        <View className='option_box dis_aj  bor-r mr_15'>回复</View>
                        <View className='option_box1 dis_aj  bor-r'>复制</View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>


        </View>
      </RefreshScrollView >
    </View >
  )
}


export default Index;