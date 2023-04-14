import { FC, useEffect, useRef } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import { TaroElement } from '@tarojs/runtime'
import common from '../../../../utils/common'
const text = common.story;
const Index: FC = () => {
    const ref = useRef<TaroElement>();

    useEffect(() => {
        const dom = ref.current
        const data = text.split('')
        let index = 0
        let str = ''
        function writing(index) {
            if (index < data.length) {
                str += data[index]
                const flag = data[index] !== '<'
                if (flag) {
                    dom!.innerHTML = str
                }
                setTimeout(writing.bind(this), !flag ? 0 : 100, ++index)
            }
        }
        writing(index)
    }, [])

    return (
        <View className='story__box'>
            <View className='story__box_title' id='the-id'>我们的故事</View>
            <View className='story__box_text' ref={ref}>
            </View>
        </View>
    )
}


export default Index;