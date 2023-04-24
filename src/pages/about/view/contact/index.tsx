import { FC } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Header from '../../../../components/header/Header'
import common from '../../../..//utils/common'

const Index: FC = () => {

    return (
        <View className='contact'>
            <Header title='联系方式' />
            <View className='contact_top'>
                <View className='about_top_box_tx_bor dis_aj mb_20 box-sha1'>
                    <Image className='about_top_box_tx'
                        src={common.protraitN}
                    ></Image>
                </View>
                <View className='name mb_20'>yhyang</View>
                <View className='text4 mb_20'>苍山负雪，明烛天南</View>
                <View className='about_top_box_logo_box'>
                    {common.contact.map(v => (
                        <Image className='about_top_box_logo_itme'
                            src={v.icon}
                        ></Image>
                    ))}
                </View>
            </View>

            <View className='contact_bottom'>
                {common.contact.map((v, i) => (
                    <View className='contact_bottom_item dis_ac'>
                        <Image className=' mr_20'
                            src={v.icon}
                        ></Image>
                        <View className={`text5 logoname${i}`}>{v.name}</View>
                        <View className='ml_20 text5' style={{ flex: 1 }}>{v.num}</View>
                    </View>
                ))}
            </View>
        </View>
    )
}


export default Index;