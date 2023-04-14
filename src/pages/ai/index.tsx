import { FC, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { getAiInitData } from '../../api/ai';
import RefreshScrollView from '../../components/refresh';
import Header from '../../components/header/Header';
import Skeleton from './skeleton';
import Taro from '@tarojs/taro';
import { urlEncode } from '../../utils/utils';
const Index: FC = () => {
	const [init, setInit] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchData()
	}, [])
	function fetchData() {
		getAiInitData().then(res => {
			setInit(res.data)
		}).finally(() => setLoading(false))
	}

	function handlePage(param) {
		Taro.navigateTo({
			url: urlEncode("/pages/ai/view/aiSearch/index", param),
		});
	}
	function itemCompnent() {
		return (
			Object.keys(init)?.map(v => {
				const j = init[`${v}`];
				return (
					<View className='modle_item'>
						<View className='modle_item_title'># {j.name}</View>
						<View className='modle_item_box'>
							{Object.keys(j.ai).map(x => {
								const p = j.ai[`${x}`]
								return (
									<View className='item_box_padding' onClick={() => handlePage(p)}>
										<View className='item_box'>
											<View className='item_image_box'>
												<Image className='item_image' src={p.icon}></Image>
											</View>
											<View className='item_title'>{p.title}</View>
											<View className='item_dec' >{p.desc}</View>
										</View>
									</View>
								)
							})}
						</View>
					</View>
				)
			})
		)
	}
	return (
		<View className='ai_box'>
			<Header title='intellect' back={false} />
			<RefreshScrollView height={65}>
				<View className='ai_scrollview_box'>
					{loading ? <Skeleton /> : itemCompnent()}
				</View>
			</RefreshScrollView>
		</View>
	)
}


export default Index;