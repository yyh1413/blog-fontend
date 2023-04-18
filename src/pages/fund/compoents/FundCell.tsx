import { View, Text } from '@tarojs/components'

export function FundCell({ data, style = {} }) {
	let num = data;
	if (!data) return <Text />;
	if (!num.includes("-")) {
		num = "+" + num + '%';
	} else {
		num = num + '%'
	}
	return (
		<Text className={`${num.includes("+") ? 's_r' : 'g_r'}`} style={{ ...style }}>{num}</Text>
	)
}