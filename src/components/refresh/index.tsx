import { useState } from 'react';
import { ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
interface Iprops {
    height?: number,
    refresh?: (endLoading) => void
    loadMore?: () => void
    classNameAdditional?: string
    children?: any
}
export default function RefreshScrollView(props: Iprops) {
    const { refresh = null, loadMore = null, classNameAdditional = '', height = 0 } = props;
    const windowInfo = Taro.getWindowInfo()
    const scrollViewHeight = height - 20 + windowInfo.statusBarHeight!

    const [loading, setLoading] = useState(false);
    const onRefresh = () => {
        setLoading(true);
        refresh && refresh(endLoading);
    };
    const endLoading = () => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    const loadRecommend = () => {
        loadMore && loadMore();
    };

    return (
        <ScrollView
            style={{ height: `calc(100vh - ${scrollViewHeight}px)` }}
            className={'home__wrap ' + classNameAdditional}
            onScrollToLower={() => loadRecommend()}
            scrollWithAnimation
            refresherEnabled
            refresherTriggered={loading}
            onRefresherRefresh={onRefresh}
            refresherThreshold={45}
            scrollY
        >
            {props.children}
        </ScrollView>
    );
}