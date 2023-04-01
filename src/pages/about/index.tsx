import { FC } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import common from '../../utils/common'
import Corrugation from '../../components/corrugation'
import Taro from '@tarojs/taro'

const list = [
	{ num: 10, text: '文章总数' },
	{ num: 10, text: '文章总数' },
	{ num: 10, text: '文章总数' },
	{ num: 10, text: '文章总数' },
	{ num: 10, text: '文章总数' },
	{ num: 10, text: '文章总数' },
]

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
]

const Index: FC = () => {

	return (
		<View className='about'>
			<View className='about_top_box'>
				<View className='about_top_box_tx_bor dis_aj mb_20'>
					<Image className='about_top_box_tx'
						src={common.protraitN}
					></Image>
				</View>
				<View className='name mb_20'>yhyang</View>
				<View className='dec'>苍山负雪，明竹天南。</View>
			</View>
			<Corrugation />
			<View className='sum'>
				{list.map((v, i) => {
					return (
						<View className='sum_item'>
							<View className={`num${i} mb_10`}>{v.num}</View>
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