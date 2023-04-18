
import { View } from '@tarojs/components';
import Skeleton from 'taro-skeleton'
function Index() {
  return (
    <View >
      <Skeleton title row={7} />
      <Skeleton title row={7} />
      <Skeleton title row={7} />
      <Skeleton row={10} />
      <Skeleton row={10} />
    </View>
  )
}

export default Index