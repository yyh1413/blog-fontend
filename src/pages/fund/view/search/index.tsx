import { FC, useEffect, useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import './index.scss'
import { getFundRankData, getFundSearchData } from '../../../../api/fund';
import RefreshScrollView from '../../../../components/refresh';
import Header from '../../../../components/header/Header';
import { handleFundInfoPage, recommendType } from '../../common';
import { Animate, Icon, Empty, } from '@nutui/nutui-react-taro';
import { FundCell } from "../../compoents/FundCell";
import Taro from '@tarojs/taro';
import debounce from 'lodash/debounce';

const Index: FC = () => {
	const [data, setData] = useState<any[]>([])
	const [search, setSearch] = useState<any[]>([])
	const [title, setTitle] = useState('');
	const [his, setHis] = useState<string[]>([]);
	useEffect(() => {
		const list: string = Taro.getStorageSync('history')
		if (list) {
			setHis(list.split(','))
		}
		fetchData()
	}, [])
	useEffect(() => {
		if (!!title) {
			searchInitData()
		}
	}, [title])
	async function fetchData() {
		getFundRankData({
			FundType: 0,
			SortColumn: 'SALESRANK_D',
			pageIndex: 1,
			pageSize: 7,
		}).then(v => {
			setData(v.data.Datas)
		})
	}
	async function searchInitData() {
		getFundSearchData({
			m: 1,
			key: title,
			pageIndex: 2,
			pageSize: 20,
		}).then(v => {
			setSearch(v.data.Datas)
		})
	}
	function handleFund(v) {
		let list: any[] = his;
		if (list.length > 7) {
			list.push(title);
			list = Array.from(new Set(list));
			list.shift()
		} else {
			list = Array.from(new Set([...his, title]))
		}
		Taro.setStorageSync('history', list.join(','))
		handleFundInfoPage(v)
	}
	function clearHistory() {
		Taro.setStorageSync('history', '')
	}
	const handleInput = debounce((e) => {
		setTitle(e.detail.value)
	}, 500);
	return (
		<View className='fund_search'>
			<Header title='基金查询' />
			<View className='header'>
				<View className='header_search '>
					<Image className="icon-box-img mr_10"
						src={require('../../../../assets/image/main/search.svg')}
					></Image>
					<Input type='text' placeholder='请输入关键词' value={title}
						style={{ height: "50px", paddingLeft: "5px", flex: 1 }}
						onInput={handleInput}
						onConfirm={() => { searchInitData() }}
					/>
					{title && <Icon name="failure" size={15} color='#bbb' style={{ zIndex: 100 }} onClick={() => {
						setTitle('');
					}}></Icon>}
				</View>
				<Text className='search_but' onClick={() => searchInitData()}>搜索</Text>
			</View>
			<RefreshScrollView height={100}>
				{title ?
					<View className='fund_search_content box-sha' key={1}>

						{
							search?.length > 0 ? search.map(v => (
								<Animate type="slide-left" style={{ width: "100%" }}>
									<View className='serach_item'>
										<View className='dis_asb mb_20'>
											<Text className=' t1' onClick={() => { handleFund(v.CODE) }}>{v.NAME}</Text>
											<Text className='text1'>{v.FundBaseInfo?.DWJZ}</Text>
										</View>
										<View className='dis_asb bot'>
											<View>
												<Text className='text_r mr_20'>{v.CODE}</Text>
												{v.FundBaseInfo?.JJGS && <Text className='text_g mr_20'>{v.FundBaseInfo?.JJGS}</Text>}
												{v.FundBaseInfo?.FTYPE && <Text className='text_b'>{v.FundBaseInfo?.FTYPE}</Text>}
											</View>
											<Text className='text1'>净值{(v.FundBaseInfo?.FSRQ as string)?.slice(5)}</Text>
										</View>
									</View>
								</Animate>
							))
								:
								<Empty description="无数据" />
						}
					</View>
					:
					<View className='fund_search_box' key={2}>
						<View className='recommend mb_30'>
							{
								recommendType.map(v => (
									<View className='recommend_item dis_aj' onClick={() => setTitle(v.name)}>
										<Text className='mr_10'>{v.name}</Text>
										{v.type !== "0" && <Image className="recommend_img"
											src={require(`../../../../assets/image/main/${v.type === "1" ? 'redu' : "tuijian"}.png`)}
										></Image>}
									</View>
								))
							}
						</View>
						<View className='history  mb_30'>
							<View className='dis_asb mb_30'>
								<Text className='text0'>搜索历史</Text>
								<Icon name="del" size={16} color={'#bbb'} onClick={clearHistory}></Icon>
							</View>
							<View className='recommend'>
								{
									his?.reverse()?.map(v => (
										<View className='recommend_item dis_aj' onClick={() => setTitle(v)}>
											<Text className='mr_10'>{v}</Text>
										</View>
									))
								}
							</View>
						</View>
						<View className='hot  mb_30'>
							<View className='t1 mb_10'>热搜基金</View>
							<View className='text4 mb_20'>近12小时搜索人数最多</View>
							<View className='hot_list'>
								{
									data.map((v, i) => (
										<Animate type="slide-left" style={{ width: "100%" }}>
											<View className='hot_itme mb_20'>
												<View className='dis_ac mb_10'>
													<View className={`num w1 `}
														style={{ color: i === 0 ? 'red' : i === 1 ? 'rgb(247, 56, 9)' : i === 2 ? 'rgb(247, 184, 9)' : ' rgb(148, 148, 148)' }}
													>{i + 1}</View>
													<View className=' w2' style={{ fontWeight: 300 }}
														onClick={() => handleFundInfoPage(v.FCODE)}>{v.SHORTNAME}</View>
													<View className='w3'>
														<FundCell data={v.SYL_LN} />
													</View>
												</View>
												<View className='dis_ac'>
													<View className='w1'>
														<Icon name="triangle-up" color='red' size={16}></Icon>
													</View>
													<View className='text1 w2'>{v.FCODE}</View>
													<View className='text1 w3'>成立以来</View>
												</View>
											</View>
										</Animate>
									))
								}
							</View>
						</View>
					</View>}
			</RefreshScrollView >
		</View >
	)
}


export default Index;