import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { getMangerData } from '../../../../api/fund';
import { convertDaysToYears, formatNumber } from '../../../../utils/famatData';
import { handleFundInfoPage } from '../../common';

const Index: FC = () => {
	const [data, setData] = useState<any[]>([])
	useEffect(() => {
		fetchData()
	}, [])
	async function fetchData() {
		getMangerData().then(v => {
			setData(v)
		})
	}

	return (
		<View className='fund_manger'>
			<View className='fund_manger_top'>
				<View className='fund_manger_top_box box-sha'>
					<View className='top'>
						<View style={{ flex: 1 }}>

							<View className='mb_30'>
								<Text className='text0 mr_20 t1'>{data[0]?.MGRNAME}</Text>
								<Text>{data[0]?.JJGS}</Text>
							</View>
							<View className='dis_ac'>
								{data[0] && <View className='t3 mr_20 '>
									从业
									<Text className='t2'>
										{convertDaysToYears(data[0]?.TOTALDAYS, true)}</Text>
								</View>}
								{data[0]?.YIELDSE && <View className='t3'>任职年化回报
									<Text className='t2'>{Number(data[0]?.YIELDSE).toFixed(2)}%</Text></View>}
							</View>
						</View>
						<View className='image'>
							<Image src={data[0]?.NEWPHOTOURL}	></Image>
						</View>
					</View>
					{data[0]?.NEWPHOTOURL && <View className='text1 bot dis_ac'>“买好的不如买得好”</View>}
				</View>
				<View className='fund_manger_bottom_box box-sha'>
					<View className='title dis_ac'>基金经理</View>
					<View className='manger_list'>
						{
							data.map(v => (
								<View className='item dis_ac'>
									<Image className='image mr_20' src={v?.NEWPHOTOURL}	></Image>
									<View style={{ flex: 1 }}>
										<View className='mb_10 name'>{`${v?.MGRNAME} - ${v?.JJGS}`}</View>
										<View className='mb_10 tag'>
											<View>管理规模{formatNumber(v?.NETNAV, true)}+</View>
											<View>从业{convertDaysToYears(v?.TOTALDAYS, true)}</View>
											<View>任职年化回报{Number(v?.YIELDSE).toFixed(2)}%</View>
										</View>
										{v?.WINS[0] && <View className='dbz dis_ac'>
											<Image className='image mr_10' src={require('../../../../assets/image/main/hp.png')}	></Image>
											<Text>代表作:</Text>
											<Text className='mr_20 els' style={{ flex: 1 }}>{v?.WINS[0]?.SHORTNAME}</Text>
											<View className='image_box dis_aj'>
												<Image className='image ' src={require('../../../../assets/image/main/jinru.png')}
													onClick={() => handleFundInfoPage(v?.WINS[0]?.FCODE)}	></Image>
											</View>
										</View>}
									</View>
								</View>
							))
						}
					</View>
				</View>
			</View>
		</View >
	)
}


export default Index;