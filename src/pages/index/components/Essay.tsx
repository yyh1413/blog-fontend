import { View } from '@tarojs/components'
import { FC } from 'react'
import Title from '../../../components/title'
import EssayItem from '../../../components/essayItem/EssayItem'
import { IEssay } from 'src/interface/essay'


interface Iprops {
	handleGoSearch: (type?: number) => void
	data: IEssay[]
}
const Index: FC<Iprops> = (props) => {

	return (
		<View className='main_essay_box'>
			<Title text='最新文章' onclick={() => props.handleGoSearch(1)} />
			<EssayItem data={props.data} />
		</View >
	)
}

export default Index
