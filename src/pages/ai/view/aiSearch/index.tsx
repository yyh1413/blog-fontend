import { FC, useEffect, useState } from 'react'
import { Textarea, View, Image, Button, Text, Icon, ScrollView } from '@tarojs/components'
import './index.scss'
import { getAiData } from '../../../../api/ai';
import Header from '../../../../components/header/Header';
import { getCurrentInstance } from '@tarojs/taro';
import RefreshScrollView from '../../../../components/refresh';
interface IIintProps {
	deom1: string
	deom2: string
	deom3: string
	desc: string
	icon: string
	title: string
	type: string
	placeholder: string
}
const Index: FC = () => {
	const { router } = getCurrentInstance();
	const init: IIintProps = (router!.params as unknown as IIintProps)
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	function searchData() {
		let txt = title;
		if (init.type !== 'bk') {
			txt = `类型 【${init.title.split(' ')[0]}】 内容【${title}】`
		}
		getAiData({ text: txt }).then(res => {
			setContent(res.data)
		})
	}
	function handleDemo(txt) {
		setTitle(txt)
	}

	return (
		<View className='ai_search_box'>
			<Header title='生成你想要的文案' />
			<ScrollView>
				<View className='ai_search_box_scrollview'>
					<View className='title_box'>
						<Image src={init!.icon} />
						<Text className='title'> {init!.title}</Text>
					</View>
					<View className='dec'>{init!.desc}</View>
					<View className='dis demo_box'>
						<View className='demo clo1' onClick={() => handleDemo(init!.deom1)}>
							<Icon className=' mr_15' size='15' type='info_circle' />
							示例1</View>
						<View className='demo clo2' onClick={() => handleDemo(init!.deom2)}>
							<Icon className=' mr_15' color='rgba(217, 26, 217)' size='15' type='info_circle' />
							示例2</View>
						<View className='demo clo3' onClick={() => handleDemo(init!.deom3)}>
							<Icon className=' mr_15' color=' rgba(52, 145, 250)' size='15' type='info_circle' />
							示例3</View>
					</View>
					<View className='textarea'>
						<Textarea placeholder={init?.placeholder || '请输入您的问题'} autoFocus
							value={title}
							style={{ height: "100px", paddingLeft: "5px", flex: 1 }}
							onInput={e => setTitle(e.detail.value)}
							onConfirm={() => searchData()}
						/>
					</View>
					<Button type='primary' className='g_but' onClick={searchData}>生成</Button>
					<Textarea disabled className='content' value={content}>  </Textarea>
				</View>
			</ScrollView>

		</View>
	)
}


export default Index;