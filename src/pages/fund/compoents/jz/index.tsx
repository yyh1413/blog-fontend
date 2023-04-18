import { FC } from 'react'
import { View } from '@tarojs/components'
import { TableColumnProps } from '../../../../interface';
import { Table } from '@nutui/nutui-react-taro';
import { FundCell } from '../FundCell';
const columns: TableColumnProps[] = [
	{
		title: '日期',
		key: 'FSRQ',
	},
	{
		title: '单位净值',
		key: 'DWJZ',
		align: 'right',

	},
	{
		title: '累计净值',
		key: 'LJJZ',
		align: 'right',

	},
	{
		title: '日涨幅',
		key: 'JZZZL',
		align: 'right',
		render: (record) => <FundCell data={record.JZZZL} />
	},
]
interface Iprops {
	data: any[]
}
const Index: FC<Iprops> = ({ data }) => {

	return (
		<View className='fund_his_box'>
			<Table columns={columns} data={data?.reverse()} bordered={false} />
		</View>
	)
}


export default Index;