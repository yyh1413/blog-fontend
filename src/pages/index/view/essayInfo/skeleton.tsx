
import { View } from '@tarojs/components';
import Skeleton from 'taro-skeleton'
function Index() {
  return (
    <View style={{ marginTop: 60 }}>
      <Skeleton title row={1} />
      <Skeleton row={1} rowHeight={'200px'}></Skeleton>
      <Skeleton row={1} rowHeight={'100px'}></Skeleton>
      <Skeleton title row={10} />
      <Skeleton title row={10} />
    </View>
  )
}

export default Index