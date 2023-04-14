
import { View } from '@tarojs/components';
import Skeleton from 'taro-skeleton'
function Index() {
  return (
    <View >
      <Skeleton title row={1} />
      <Skeleton row={1} rowHeight={'100px'}></Skeleton>
      <Skeleton title row={1} />
      <Skeleton row={1} rowHeight={'100px'}></Skeleton>
      <Skeleton row={10} />
      <Skeleton row={10} />
    </View>
  )
}

export default Index