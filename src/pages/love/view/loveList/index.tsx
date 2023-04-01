import { FC, useEffect, useRef } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import common from '../../../../utils/common'
import utils from '../../../../utils/utils'
const Index: FC = () => {
	const d = utils.diffDate();

	return (
		<View className='love_list_page__box'>

			<View className='love_list_title_border dis_aj bor_r1 anima1'>
				<View className='love_list_title '>
					<View className='image_border dis_aj'>
						<Image
							src={common.protraitN}
						/>
					</View>
					<View className='info'>
						<View className='text1'>相恋</View>
						<View className='day'>{d}</View>
						<View className='text1'>天</View>
					</View>
					<View className='image_border dis_aj'>
						<Image
							src={common.protraitW}
						/>
					</View>
				</View>
			</View>

			{[1, 2, 3, 4, 5].map((e, i) => {
				return (
					<View className={`love_list_itme  bor_r1 float_s_x_${1}`}>
						<View className='love_list_itme_box'>
							<View className='state text4 dis_aj'>已完成</View>
							<View className='dec_box'>
								<View className='mb_10'>偷偷记录对方熟睡的模样</View>
								<View className='text4'>偷偷记录对方熟睡的模</View>
							</View>
							<View className='zhedie dis_aj'>
								<Image
									src={require('../../../../assets/image/main/jiahao.svg')}
								/>
							</View>
						</View>
						<View className='info bor_r1 text4'>
							<View>开始时间：2022-11-22</View>
							<View>事件描述：偷偷记录对方熟睡的模样偷偷记录对方熟睡的模样</View>
							<View>完成时间：每天</View>
						</View>
					</View>
				)
			})}


		</View>
	)
}


export default Index;