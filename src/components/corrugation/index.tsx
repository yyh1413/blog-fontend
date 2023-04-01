import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
interface Iprops {
	style?: any
}
const Index: FC<Iprops> = (props) => {

	return (
		<View className=" waveAnimation">
			<Image style={props?.style} className=" waveAnimation_image" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/bg_wave.gif"></Image>

		</View>

	)
}

export default React.memo(Index);

