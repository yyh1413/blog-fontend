import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'


const Index: FC = () => {
    const curr = new Date();
    const moon = (curr.getMonth() + 1).toString().padStart(2, '0');
    const year = curr.getFullYear();
    const enYear = curr.toString().split(' ')[1].toLocaleUpperCase()

    return (
        <View className='time'>
            <View className='ri'>{moon}</View>
            <View className='shu1'></View>
            <View className='year'>
                <View>{enYear}</View>
                <View>{year}</View>
            </View>
        </View>
    )
}

export default React.memo(Index);