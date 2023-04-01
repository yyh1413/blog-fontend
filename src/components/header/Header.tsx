import { FC } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { useSelector } from "react-redux";
import Taro from '@tarojs/taro';

interface Iprops {
    title?: string,
}
const Index: FC<Iprops> = (props) => {
    const { title } = props;
    const re_state = useSelector(state => state);
    const handleGoBack = () => {
        Taro.navigateBack();
    }
    return (
        <View className='header2 dis_aj' style={{ marginTop: re_state.SysInfo.safeBottom }}>
            <Image className='back_img' onClick={handleGoBack}
                src={require('../../assets/image/main/back.svg')}
            ></Image>
            {title}
        </View>
    )
}

export default Index;