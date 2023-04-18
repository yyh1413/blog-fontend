import { FC, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { getHoldFundListData } from '../../../../api/fund';
import { TableColumnProps } from '../../../../interface';
import { Table } from '@nutui/nutui-react-taro';
import { handleFundInfoPage } from '../../common';
import { FundCell } from '../FundCell';

function CellClom({ value = '', cent = '' }) {
	if (!value) {
		return <FundCell data={cent} />
	}
	return (
		<>
			<View >
				{value}
			</View>
			<FundCell data={cent} />
		</>
	)
}

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
		title: '净值',
		key: 'DWJZ',
		render: (record) => <CellClom value={record.DWJZ} cent={record.JZZZL} />,
	},
	{
		title: '估值',
		key: 'GZ',
		render: (record) => <CellClom value={record.GZ} cent={record.GSZZL} />,

	},
	{
		title: '近1周',
		key: 'Z',
		render: (record) => <CellClom cent={record.Z.syl} />,

	},
	{
		title: '近1月',
		key: 'Y',
		render: (record) => <CellClom cent={record.Y.syl} />,

	},
	{
		title: '近3月',
		key: '3Y',
		render: (record) => <CellClom cent={record['3Y'].syl} />,

	},
	{
		title: '近6月',
		key: '6Y',
		render: (record) => <CellClom cent={record['6Y'].syl} />,

	},
	{
		title: '今年来',
		key: 'JN',
		render: (record) => <CellClom cent={record.JN.syl} />,

	},
	{
		title: '近1年',
		key: '1N',
		render: (record) => <CellClom cent={record['1N'].syl} />,

	},
	{
		title: '近3年',
		key: '3N',
		render: (record) => <CellClom cent={record['3N'].syl} />,

	},
	{
		title: '成立来',
		key: 'LN',
		render: (record) => <CellClom cent={record.LN.syl} />,

	},

]
const Index: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data1, setData1] = useState<any>([])
	useEffect(() => {
		fetchData()
	}, [])
	async function fetchData() {
		getHoldFundListData().then(v => {
			setData1(v)
		})
	}

	return (
		<View className='fund_holde_box'>
			<Table columns={columns} data={data1} bordered={false} />
		</View>
	)
}


export default Index;