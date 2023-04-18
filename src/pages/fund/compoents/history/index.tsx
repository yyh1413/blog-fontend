import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { TableColumnProps } from '../../../../interface';
import { Table, Tag } from '@nutui/nutui-react-taro';
import { FundCell } from '../FundCell';
// 具体周期 或者  Z 近一周  Y 近一月  3Y 近三月  6Y 近六月  1N 近1年  2N 近2年
//  3N 近3年  5N 近5年  JN 今年来  LN 成立来

const time = {
	'Z': '近一周',
	'Y': '近一月',
	'3Y': '近三月',
	'6Y': '近六月',
	'1N': '近1年',
	'2N': '近2年',
	'3N': '近3年',
	'5N': '近5年',
	'JN': '今年来',
	'LN': '成立来',
}
const columns: TableColumnProps[] = [
	{
		title: '时间区间',
		key: 'title',
		render: (record) => <Text>{time[record.title]}</Text>,

	},
	{
		title: '涨幅度',
		key: 'syl',
		align: 'right',

		render: (record) => <FundCell data={record.syl} />

	},
	{
		title: '同类均值',
		key: 'avg',
		align: 'right',

		render: (record) => <FundCell data={record.avg} />

	},
	{
		title: '同类排名',
		key: 'rank',
		align: 'right',
		render: (record) => {
			if (!record.rank) return ''
			let Com;
			if (record.rank / record.sc < 0.3) {
				Com = <Tag color="#FA2400" plain>优秀</Tag>
			} else if (record.rank / record.sc > 0.3 && record.rank / record.sc < 0.8) {
				Com = <Tag color="#4caf50" plain>良好</Tag>
			} else {
				Com = <Tag color="#b4b4b4" plain>靠后</Tag>
			}
			return (
				<View>
					<Text>{record.rank}</Text><Text className='text4 mr_10'>/{record.sc}</Text>
					{Com}
				</View>
			)
		},

	},
]
interface Iprops {
	data: any[]
}
const Index: FC<Iprops> = ({ data }) => {

	return (
		<View className='jz_box'>
			<Table columns={columns} data={data} bordered={false} />
		</View>
	)
}


export default Index;