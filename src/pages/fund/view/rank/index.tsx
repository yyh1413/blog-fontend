import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { getFundRankData } from '../../../../api/fund';
import RefreshScrollView from '../../../../components/refresh';
import Header from '../../../../components/header/Header';
import { FundCell } from '../../compoents/FundCell';
import { Menu, MenuItem, Table } from '@nutui/nutui-react-taro';
import { fundType as fundTypelist, fundType1, handleFundInfoPage, titeType } from '../../common';
import { TableColumnProps } from '../../../../interface';

const Index: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>([])
	const [fundType, setFundType] = useState('0')
	const [cltype, setCltype] = useState('0')
	const [sortColumn, setSortColumn] = useState('SYL_1N')
	const [page, setPage] = useState({ pageIndex: 1, pageSize: 20 })
	const columns: TableColumnProps[] = [
		{
			title: '基金名称',
			key: 'SHORTNAME',
			render: (record) => {
				return (
					<View className='shortname' onClick={() => handleFundInfoPage(record.FCODE)}>
						<View className='name'>
							{record.SHORTNAME}
						</View>
						<View className='text4'>
							{record.FCODE}
						</View>
					</View>
				)
			},
		},
		{
			title: '最新净值',
			key: 'DWJZ',
			render: (record) => (
				<>
					<View >{record.DWJZ}</View>
					<View className='text4'>{(record.FSRQ as string).slice(5)}</View>
				</>
			)
		},

		{
			title: titeType.find(v => v.value === sortColumn)?.text || '',
			key: 'GZ',
			render: (record) => <FundCell data={record[sortColumn]} />

		},
	]
	useEffect(() => {
		setData([])
		fetchData(1)
	}, [fundType, cltype, sortColumn])
	async function fetchData(pageIndex: number, loadMore = false) {
		getFundRankData({
			FundType: fundType,
			CLTYPE: cltype === '0' ? undefined : cltype,
			SortColumn: sortColumn,
			pageIndex: pageIndex || page.pageIndex,
			pageSize: page.pageSize,
		}).then(v => {
			const newdata = loadMore ? [...data, ...v.data.Datas] : v.data.Datas;
			setData(newdata)
			setPage({ pageSize: page.pageSize, pageIndex })
		})
	}

	const loadMore = () => {
		fetchData(page.pageIndex + 1, true)
	}

	return (
		<View className='fund_rank_box'>
			<Header title='基金排行榜' />
			<View style={{ position: 'relative' }}>
				<Menu>
					<MenuItem options={fundTypelist} value={fundType} onChange={(e) => setFundType(e.value)} />
					<MenuItem options={fundType1} value={cltype} onChange={(e) => setCltype(e.value)} />
				</Menu>
				<RefreshScrollView height={170} loadMore={loadMore}>
					<View className='fund_rank_box'>
						<Table columns={columns} data={data} bordered={false} />
					</View>
				</RefreshScrollView>
				<View className='time'>
					{
						titeType.map(v => (
							<View className={`dis_aj time_item ${sortColumn === v.value ? 'action' : ''}`}
								onClick={() => setSortColumn(v.value)}>{v.text}</View>
						))
					}
				</View>
			</View>

		</View >
	)
}


export default Index;