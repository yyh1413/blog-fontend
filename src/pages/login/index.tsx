import { FC } from 'react'
import { View, Text, Image, Icon, Input, ScrollView } from '@tarojs/components'
import './index.scss'
const Index: FC = () => {

    return (
        <View className='login_back_img'>
            <Image
                src={require('../../assets/image/main/bg1.jpeg')}
            ></Image>
        </View>
    )
}


export default Index;