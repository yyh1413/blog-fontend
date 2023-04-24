import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { getFundFilesData, getMangerInfoData } from '../../../../api/fund';

import { FundCell } from '../FundCell';
import './index.scss'
import { convertDaysToYears, formatNumber } from '../../../../utils/famatData';
interface Iprops {
	code: string,
	ENDNAV: string,
	ESTABDATE: string,
}
const Index: FC<Iprops> = ({ code, ENDNAV, ESTABDATE }) => {
	const [data, setData] = useState<any>()
	useEffect(() => {
		fetchData()
	}, [])

	function fetchData() {
		getFundFilesData({ FCODE: code }).then(v => {
			const re = v.data?.Expansion[0];
			getMangerInfoData({ FCODE: re.MGRID }).then(j => {
				setData({ ...j.data?.Datas, ...re })
			})
		})

	}

	return (
		<View className='files_box'>
			<View className='dis_jsb mb_40 dis_ac'>
				<Text className='ftext1'>基金档案</Text>
				<View className='ftext2 dis_ac'>基金，公告，持仓，行业，分红
					<Image className='jinru_img'
						src={require('../../../../assets/image/main/jinru.png')}
					/></View>
			</View>
			<View className='dis mb_40'>
				<View className='w0'>
					<View className='ftext2'>基金规模</View>
					<View className='ftext3'>{ENDNAV && formatNumber(Number(ENDNAV))}</View>
				</View>
				<View className='w1'>
					<View className='ftext2'>成立时间</View>
					<View className='ftext3'>{ESTABDATE}</View>
				</View>
			</View>
			<View className='ftext2 mb_30'>
				基金经理
			</View>
			<View className='dis_jsb'>
				<View>
					<View className='ftext1'>{data?.MGRNAME}</View>
					<View className='ftext2'>从业{data?.TOTALDAYS && convertDaysToYears(data?.TOTALDAYS)}，
						从业年均回报{data?.YIELDSE && Number(data?.YIELDSE).toFixed(2)}%</View>
				</View>
				<Image className='tx' src={data?.NEWPHOTOURL}
				/>
			</View>
			<View className='dis mb_40'>
				<View className='w0'>
					<View className='ftext2'>本基金任期</View>
					<View className='ftext3'>{data?.FEMPDATE} ~ 至今</View>
				</View>
				<View className='w1'>
					<View className='ftext2'>任期回报</View>
					<FundCell data={data?.PENAVGROWTH && Number(data?.PENAVGROWTH).toFixed(2)}
						style={{ fontSize: 12 }} />
				</View>
			</View>
			<View className='dec'>{data?.INVESTMENTIDEAR}</View>
		</View>
	)
}


export default Index;