import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { FC } from 'react'
import { IEssay } from 'src/interface/essay';
import './EssayItem.scss'
interface Iprops {
	data: IEssay[]

}
const Index: FC<Iprops> = (props) => {

	const handlePage = (_id: string) => {
		Taro.navigateTo({
			url: "/pages/index/view/essayInfo/index?_id=" + _id,
		});
	}
	return (
		<View className='essay_item_swiper'>
			{
				props?.data?.map((item) => {
					return (
						<View className='swiper_item box-sha bor-r list_animation' onClick={() => handlePage(item._id)}>
							<Image className='swiper_item_image  bor-r'
								src={item.picture} />
							<View className='text_box'>
								<View className='text1 els'>
									{item.title}
								</View>
								<View className='text2 els3'>
									{item.content}
								</View>
								<View className='text2 dis_asb'>
									<View>{dayjs(item.createTime).format('YYYY-MM-DD')}</View>
									<View>浏览{item.readingVolume}次</View>
								</View>
							</View>
						</View>
					)
				})
			}
		</View>
	)
}

export default Index
