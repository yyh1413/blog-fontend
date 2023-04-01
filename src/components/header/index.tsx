import { FC } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import { useSelector } from "react-redux";

interface Iprops {
    title?: string,
    children
}
const Index: FC<Iprops> = (props) => {
    const { title } = props;
    const re_state = useSelector(state => state);

    return (
        <View className='header' style={{ marginTop: re_state.SysInfo.safeBottom }}>
            {props.children}
        </View>
    )
}

export default Index;