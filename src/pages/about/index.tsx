import { FC, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import common from '../../utils/common'
import Corrugation from '../../components/corrugation'
import Taro from '@tarojs/taro'
import { getEssayCount } from '../../api/main'
import NumberCounter from './components/addNum'




const Index: FC = () => {

	const [list, setList] = useState<any[]>([])
	useEffect(() => {
		getEssayCountInit()
	}, [])
	function getEssayCountInit() {
		getEssayCount().then(res => {
			setList(res.data)
		})
	}
	const dec_list = [
		{
			text: '免责声明', dec: '博客内容免责声明', icon: require('../../assets/image/main/mianze.svg'),
			onclick: () => Taro.navigateTo({ url: '/pages/about/view/relief/index' })
		},
		{
			text: '联系博主', dec: '博主常用联系方式', icon: require('../../assets/image/main/lianxifangshi.svg'),
			onclick: () => Taro.navigateTo({ url: '/pages/about/view/contact/index' })
		},
		{ text: '意见反馈', dec: '博客内容意见反馈', icon: require('../../assets/image/main/yijianfankui.svg') },
		// { text: '打赏博主', dec: '打赏博主', icon: require('../../assets/image/main/yijianfankui.svg'), onclick: () => handleMoney() },
	]
	return (
		<View className='about'>
			<View className='about_top_box'>
				<View className='about_top_box_tx_bor dis_aj mb_20'>
					<Image className='about_top_box_tx'
						src={common.protraitN}
					></Image>
				</View>
				<View className='name mb_20'>yhyang</View>
				<View className='dec'>苍山负雪，明烛天南。</View>
			</View>
			<Corrugation />
			<View className='sum'>
				{list.map((v, i) => {
					return (
						<View className='sum_item'>
							<View className={`num${i} mb_10`}>
								<NumberCounter start={0} end={v.count} />
							</View>
							<View className='text4'>{v.text}</View>
						</View>
					)
				})}
			</View>
			<View className='bottom_box'>
				<View className='bottom_box_content'>
					{dec_list.map(v => {
						return (
							<View className='bottom_box_item' onClick={v.onclick}>
								<Image className='bottom_box_item_icom mr_20'
									src={v.icon}
								></Image>
								<View className='bottom_box_item_text'>{v.text}</View>
								<View className=' mr_20 text2'>{v.dec}</View>
								<Image className='jinru_img'
									src={require('../../assets/image/main/jinru.png')}
								></Image>
							</View>
						)
					})}
				</View>
			</View>

		</View>
	)
}


export default Index;