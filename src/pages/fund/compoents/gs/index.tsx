import { FC, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { getGSInfoData } from '../../../../api/fund';

import './index.scss'
interface Iprops {
	code: string
}
const Index: FC<Iprops> = ({ code }) => {
	const [data, setData] = useState<any>()
	useEffect(() => {
		fetchData()
	}, [])

	function fetchData() {
		getGSInfoData({ cc: code }).then(v => {
			const re = v.data.data;
			setData(re)
		})
	}

	return (
		<View className='files_box'>
			<View className='dis_jsb mb_40 dis_ac'>
				<Text className='ftext1'>基金公司</Text>
			</View>
			<View className='dis_jsb mb_40 dis_ac'>
				<Text className='ftext1'>{data?.FDMC}</Text>
			</View>
			<View className='dis mb_40'>
				<View className='w0'>
					<View className='ftext2'>基金规模</View>
					<View className='ftext3'>{data?.GLGM}</View>
				</View>
				<View className='w1'>
					<View className='ftext2'>成立时间</View>
					<View className='ftext3'>{data?.CLRQ}</View>
				</View>
			</View>
			<View className='dec'>{data?.Level}</View>
		</View>
	)
}


export default Index;