import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { IEssay } from 'src/interface/essay'
import { handlePublishTimeDesc } from '../../../utils/utils';
import Time from '../../../components/time/index'
import './swiper.scss'
import { useState } from 'react';
import common from '../../../utils/common';

function Index(props: { data: IEssay[] }) {
	const [current, setCurrent] = useState(0)
	const handlePage = (_id: string) => {
		Taro.navigateTo({
			url: "/pages/index/view/essayInfo/index?_id=" + _id,
		});
	}
	return (
		<View className='main_box'>
			<View className='time_title'>
				<Time />
			</View>
			<Swiper
				current={current}
				className='test-h'
				indicatorColor='#999'
				indicatorActiveColor='#333'
				circular
				indicatorDots={false}
				autoplay
				interval={3000}
				duration={1000}
				onChange={(e) => setCurrent(e.detail.current)}
			>
				{
					props.data.map(v => (
						<SwiperItem onClick={() => handlePage(v._id)}>
							<View className='swiper_box'>
								<Image className='touxiang_img'
									src={v.picture}
								></Image>
								<View className='doc_box'>
									<View className='doc_title'>
										{v.title}
									</View>
									<View className='doc_info'>

										<Image className='touxiang_img mr_10'
											style={{ width: 30, height: 30 }}
											src={common.protraitN}
										></Image>
										<Text className='mr_10'>
											{v.userName}
										</Text>
										<Text>
											发布于{handlePublishTimeDesc(v.createTime)}前
										</Text>
									</View>
								</View>
							</View>
						</SwiperItem>
					))
				}
			</Swiper>
			<View className='show_list'>
				{
					props.data.map((v, i) => (
						<View className='show_list_item'
							onClick={() => setCurrent(i)}>
							<Image
								className={`show_list_item_image ${current === i ? ' show_active' : ''}`}
								src={v.picture}
							></Image>
						</View>
					))
				}
			</View>
		</View >
	)
}

export default Index
