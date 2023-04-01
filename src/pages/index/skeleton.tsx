
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import Skeleton from 'taro-skeleton'

function Index() {
  const re_state = useSelector(state => state);

  return (
    <View style={{ marginTop: re_state.SysInfo.safeBottom - 10 }}>

      <Skeleton className='padding_0 skeleton_he' avatar row={1} rowProps={[{
        width: '70%',
        height: '30px'
      }]} />
      <Skeleton row={1} rowProps={[{
        width: '100%',
        height: '200px'
      }]}
      ></Skeleton>

      <View className='skeleton_box'>
        <Skeleton row={1} rowHeight={'100px'}></Skeleton>
        <Skeleton row={1} rowHeight={'100px'}></Skeleton>
      </View>
      <Skeleton title row={4} />
      <Skeleton title row={4} />
      <Skeleton title row={4} />


      {/* <Skeleton title avatar row={3} />

      <Skeleton type='column' title titleWidth={'80%'} avatar />
      <Skeleton title row={3} />
      <Skeleton type='column' title titleWidth={'80%'} avatar /> */}

    </View>
  )
}

export default Index