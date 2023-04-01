import React, { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
interface Iprops {
	text: string,
	onclick: () => void;
}

const Index: FC<Iprops> = (props: Iprops) => {

	return (
		<View className='title_box'>
			<View className='shu'>
				<Text>{props.text}</Text>
			</View>

			<View className='jinru_box bor-r box-sha' onClick={props.onclick}>
				<Image className='jinru_img'
					src={require('../../assets/image/main/jinru.png')}
				></Image>
			</View>
		</View>
	)
}

export default React.memo(Index);