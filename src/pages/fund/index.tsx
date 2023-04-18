import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { getStockData } from '../../api/fund';
import RefreshScrollView from '../../components/refresh';
import Header from '../../components/header/Header';
import Skeleton from './skeleton';
import { Icon, Popup, Tabs } from '@nutui/nutui-react-taro';
import { stock } from "../../interface/essay";
import { getLatestUpdateTime } from '../../utils/utils';
import Hold from './compoents/hold'
const Index: FC = () => {
	const [init, setInit] = useState<stock[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showBasic, setShowBasic] = useState(false);
	const [update, setUpdate] = useState('');
	const [tab1value, setTab1value] = useState('0');

	useEffect(() => {

		fetchData()
	}, [])
	async function fetchData() {
		const rs = await getLatestUpdateTime();
		setUpdate(rs)
		getStockData().then(res => {
			setInit(res.data)
		}).finally(() => setLoading(false))
	}

	return (
		<View className='fund_box'>
			<Header title='基金' back={false} />
			<RefreshScrollView height={65}>
				{/* {loading ? <Skeleton /> : itemCompnent()} */}
				<Popup
					visible={showBasic} className='popup' position="top"
					onClose={() => { setShowBasic(false) }}>
					<View className='popup_top'>
						行情更新于{update}</View>
					<View className='popup_buttom'>
						{
							init?.map(v => {
								return (
									<View className={`item ${v.change.includes("+") ? 'b_r' : 'b_g'}`}>
										<View className='title'>{v.name}</View>
										<View className='zhishu'>{v.point}</View>
										<View className='bot'>
											<View className={`${v.change.includes("+") ? 's_r' : 'g_r'}`}>{v.change}</View>
											<View className={`${v.change.includes("+") ? 's_r' : 'g_r'}`}>{v.changePercent}</View>
										</View>
									</View>
								)
							})
						}
					</View>
				</Popup>
				<View className='fund_head'>
					<View className='fund_head_top dis_ac'>
						<Text className='mr_20' >
							{init[0]?.name}
						</Text>
						<Text className={`mr_20 ${init[0]?.change.includes("+") ? 's_r' : 'g_r'}`}>{init[0]?.point}</Text>
						<Text className={`tag dis_aj mr_20 ${init[0]?.change.includes("+") ? 'sg_r' : 'gg_r'}`}>	{init[0]?.changePercent}</Text>
						<Icon name="rect-down" size="18"
							onClick={() => { setShowBasic(true) }}></Icon>
					</View>
					<View className='fund_head_bottom dis_ac'></View>
				</View>
				<View className='fund_content'>
					<Tabs value={tab1value} onChange={({ paneKey }) => {
						setTab1value(paneKey)
					}} type="smile" leftAlign autoHeight>
						<Tabs.TabPane title="持有"> <Hold /> </Tabs.TabPane>
						<Tabs.TabPane title="Tab 2"> Tab 2 </Tabs.TabPane>
						<Tabs.TabPane title="Tab 3"> Tab 3 </Tabs.TabPane>
					</Tabs>
				</View>
			</RefreshScrollView>
		</View>
	)
}


export default Index;