import { FC, useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import { getFundInfoData } from '../../../../api/fund';
import RefreshScrollView from '../../../../components/refresh';
import Header from '../../../../components/header/Header';
import { FundCell } from '../../compoents/FundCell';
import { Table, Tabs, Tag } from '@nutui/nutui-react-taro';
import { getCurrentInstance } from '@tarojs/taro';
import History from '../../compoents/history';
import JZ from '../../compoents/jz';
import Performance from '../../compoents/performance';


const Index: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>([])
	const [tab1value, setTab1value] = useState('0');
	const [tab2value, setTab2value] = useState('0');

	useEffect(() => {
		const { router } = getCurrentInstance();
		const code = router?.params?.code
		fetchData(code)
	}, [])
	async function fetchData(code) {
		getFundInfoData({ FCODE: code }).then(v => {
			setData(v)
			console.log(v);
		})
	}

	return (
		<View className='fund_holde_info_box'>
			<Header title='基金详情' back={false} />
			<ScrollView scrollY>
				<View className='head'>
					<View className='title'>{data?.SHORTNAME}</View>
					<View className='mb_20'>
						<Text className='text4 mr_20'>{data?.FCODE}</Text>
						<Tag className='mr_20' type="primary">{data?.FTYPE}</Tag>
						<Tag className='mr_20' type="primary">中高风险</Tag>
					</View>
					<View className='content mb_20'>
						<View>
							<FundCell data={data['1N']?.syl} style={{ fontSize: '28px', lineHeight: '28px' }} />
							<View className='text4'>近一年涨幅</View>
						</View>
						<View>
							<FundCell data={data?.JZZZL} style={{ fontSize: '14px' }} />
							<View className='text4'>日涨跌幅</View>
						</View>
						<View>
							<View style={{ fontSize: '14px' }} >{data?.DWJZ}</View>
							<View className='text4'>净值04-14</View>
						</View>
					</View>
					<View >
						<Text className='text4 mr_10'>近三年涨幅 </Text>
						<FundCell data={data['3N']?.syl} style={{ fontSize: '14px' }} />
					</View>
				</View>
				<View className='charts'>
					<Tabs value={tab1value} onChange={({ paneKey }) => {
						setTab1value(paneKey)
					}} type="smile" leftAlign autoHeight>
						<Tabs.TabPane title="业绩走势" className='tab_pane'>
							<Performance />
						</Tabs.TabPane>
						<Tabs.TabPane title="净值估算" className='tab_pane'>
							<Image src='http://j4.dfcfw.com/charts/pic6/165525.png' />
						</Tabs.TabPane>
					</Tabs>
				</View>

				<View className='table1'>
					<Tabs value={tab2value} onChange={({ paneKey }) => {
						setTab2value(paneKey)
					}} type="smile" leftAlign autoHeight>
						<Tabs.TabPane title="历史业绩">
							<History data={data.history} />
						</Tabs.TabPane>
						<Tabs.TabPane title="历史净值">
							<JZ data={data.jz} />
						</Tabs.TabPane>
					</Tabs>
				</View>
			</ScrollView>
		</View>
	)
}


export default Index;