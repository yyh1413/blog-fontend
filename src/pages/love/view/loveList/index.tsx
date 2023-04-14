import { FC, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import common from '../../../../utils/common'
import { diffDate } from '../../../../utils/utils'
const Index: FC = () => {
	const [state, setState] = useState<any>()
	const d = diffDate();

	return (
		<ScrollView scrollY className='love_list_page__box'>

			<View className='love_list_title_border dis_aj bor_r1 anima1 '>
				<View className='love_list_title '>
					<View className='image_border dis_aj'>
						<Image
							src={common.protraitN}
						/>
					</View>
					<View className='info'>
						<View className='text1'>相恋</View>
						<View className='day tro-color'>{d}</View>
						<View className='text1'>天</View>
					</View>
					<View className='image_border dis_aj'>
						<Image
							src={common.protraitW}
						/>
					</View>
				</View>
			</View>
			<View className='box_bottom'>
				{common.inventoryList.map((e, i) => {
					return (
						<View className={`love_list_itme box-sha   bor_r1 float_s_x_${1}`}>
							<View className='love_list_itme_box'>
								<View className={`state text4 dis_aj  ${e.state == 1 ? 'color1' : 'color2'}`}>{e.state == 1 ? '已完成' : '未完成'}</View>
								<View className='dec_box'>
									<View className='mb_10 tx els'>{e.title}</View>
									<View className='text4 els dec'>{e.dec}</View>
								</View>
								<View className='zhedie dis_aj'
									onClick={() => { setState(state === i ? !state : i) }}
								>
									<Image
										src={state === i ?
											require('../../../../assets/image/main/jianhao.svg') :
											require('../../../../assets/image/main/jiahao.svg')}
									/>
								</View>
							</View>
							<View className={`info bor_r1 text4 ${state === i ? 'show' : 'hide'}`}>
								<View >标题：{e.title}</View>
								<View>开始时间：{e.time}</View>
								<View>事件描述：{e.dec}</View>
								<View>完成时间：{e.endtime}</View>
							</View>
						</View>
					)
				})}
			</View>
		</ScrollView>
	)
}


export default Index;