import { FC } from 'react'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'
import Header from '../../../../components/header/Header'
import RefreshScrollView from '../../../../components/refresh'
const reliefText = `
1、本博客属于个人非赢利性质的网站，所有转载的文章都以遵循原作者的版权声明注明了文章来源。

2、如果原文没有版权声明，按照目前互联网开放的原则，本博客将在不通知作者的情况下转载文章。

3、如果原文明确注明“禁止转载”，本博客将不会转载。

4、如果本博客转载的文章不符合作者的版权声明
或者作者不想让本博客转载您的文章，请邮件告知17645221413@163.com，博主将会在第一时间删除相关信息！

5、本博客转载文章仅为留作备份和知识点分享的目的。

6、本博客将尽力确保所提供信息的准确性及可靠性，但不保证信息的正确性和完整性，且不对因信息的不正确或遗漏导致的任何损失或损害承担相关责任。

7、本博客所发布、转载的文章，其版权均归原作者所有。如其他自媒体、网站或个人从本博客下载
使用，请在转载有关文章时务必尊重该文章的著作
权，保留本博客注明的“原文来源”或者自行去原文
处复制版权声明，并自负版权等法律责任。

8、本博客的所有原创文章皆可以任意转载，但转载时务必请注明出处。

9、尊重原创，知识共享！
`
const Index: FC = () => {

    return (
        <View className='relief'>
            <Header title='免责声明' />
            <RefreshScrollView height={65} >
                <View className='relief_box'>
                    <View className='relief_box_title'>《本博客免责声明》</View>
                    <View className='relief_box_content'>{reliefText}</View>
                </View>
            </RefreshScrollView>
        </View>
    )
}


export default Index;