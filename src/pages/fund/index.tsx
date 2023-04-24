import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { getStockData } from '../../api/fund';
import RefreshScrollView from '../../components/refresh';
import Header from '../../components/header/Header';
import Skeleton from './skeleton';
import { Animate, Icon, NoticeBar, Popup, Tabs, WaterMark } from '@nutui/nutui-react-taro';
import { stock } from "../../interface/essay";
import { getLatestUpdateTime } from '../../utils/utils';
import Hold from './compoents/hold'
import Taro from '@tarojs/taro';
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
	function handlePage(flag) {
		let url;
		switch (flag) {
			case 'phb':
				url = '/pages/fund/view/rank/index'
				break;
			case 'search':
				url = '/pages/fund/view/search/index'
				break;
			case 'jp':
				url = '/pages/fund/view/manger/index'
				break;
		}
		Taro.navigateTo({
			url: url,
		});
	}
	const text = '欢迎使用我的基金产品！为您提供最全面、最及时的基金信息和服务，助您轻松管理和投资您的基金资产，您可以随时查询各类基金的实时净值、涨跌幅、历史走势等数据'

	return (
		<View className='fund_box'>
			<Header title='基金' back={false} />
			{loading ? <Skeleton /> : <RefreshScrollView height={65}>
				<NoticeBar text={text} />
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
										<View className='title dis_ac'>{v.name}
											<Icon name={
												`${v.change.includes("-") ? 'triangle-down' : 'triangle-up'}`
											} size="10"
												color={`${v.change.includes("-") ? 'rgb(55, 182, 87)' : 'rgb(233, 5, 5)'}`}></Icon>
										</View>
										<View className={` ${v.change.includes("-") ? 'g_r' : 's_r'}`}>{v.point}</View>
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
						<Icon name="rect-down" size="18" color='#bbb'
							onClick={() => { setShowBasic(true) }}></Icon>
						<Icon name="search" size="20" color='#bbb' style={{ position: 'absolute', right: 30 }}
							onClick={() => handlePage("search")}></Icon>

					</View>
					<View className='fund_head_bottom dis_ac'>
						<View className=' dis_ac mr_20' onClick={() => handlePage('phb')}>
							<Animate type="jump" loop={true}>
								<Image className='tubiao mr_10'
									src={require('../../assets/image/main/paihangbang-.png')}
								></Image>
							</Animate>
							<Text className='t1'>排行榜</Text>
						</View>
						<View className=' dis_ac' onClick={() => handlePage('jp')}>
							<Animate type="jump" loop={true}>
								<Image className='tubiao mr_10'
									src={require('../../assets/image/main/jinpai.png')}
								></Image>
							</Animate>
							<Text className='t1'>金牌经理</Text>
						</View>
					</View>

				</View>
				<View className='fund_content'>
					<Tabs value={tab1value} onChange={({ paneKey }) => {
						setTab1value(paneKey)
					}} type="smile" leftAlign autoHeight>
						<Tabs.TabPane title="持有"> <Hold /> </Tabs.TabPane>
						{/* <Tabs.TabPane title="Tab 2"> Tab 2 </Tabs.TabPane>
						<Tabs.TabPane title="Tab 3"> Tab 3 </Tabs.TabPane> */}
					</Tabs>
				</View>
			</RefreshScrollView>}
			<WaterMark
				style={{ transform: "rotate(5deg)" }}
				className="mark1"
				fontSize={14}
				fontColor={"rgba(0, 0, 0, .10)"}
				zIndex={1}
				content="yhyang"
			></WaterMark>
		</View>
	)
}


export default Index;