import { FC, useEffect, useRef, useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { pxTransform } from '@tarojs/taro'
import Taro from '@tarojs/taro'

interface IWaterfallType {
	height: number
	id: number
	imgStyle: { height: string }
	url: string
}
interface Iporps {
	showList: any[]
}

const ImageCompon = ({ item, list }) => {
	const handleClick = () => {
		Taro.previewImage({
			current: item.url, // 当前显示图片的http链接
			urls: list // 需要预览的图片http链接列表
		})
	}
	return (
		<View key={item.id} className='waterfal_item'>
			<Image
				onClick={handleClick}
				className='bor-r'
				style={item.imgStyle}
				src={item.url}
			/>
		</View>
	)
}

const Index: FC<Iporps> = (props) => {
	const { showList } = props;

	const [rightShowList, setRightShowList] = useState<IWaterfallType[]>([]);
	const [leftShowList, setLeftShowList] = useState<IWaterfallType[]>([]);
	const [leftHeight, setLeftHeight] = useState<number>(0);
	const [rightHeight, setRightHeight] = useState<number>(0);
	const [showLoadList, setShowLoadList] = useState<any[]>([]);
	const showImageUrlList = useRef<string[]>([])

	const onImageLoad = (index) => {
		return (e) => {
			// 获取图片宽高
			const oImgW = e.detail.width;         //图片原始宽度
			const oImgH = e.detail.height;        //图片原始高度
			const imgWidth = 340;  //图片设置的宽度
			const scale = imgWidth / oImgW;        //比例计算
			const imgHeight = Math.round(oImgH * scale);      //自适应高度 小数点四舍五入

			setShowLoadList((e) => [...e, {
				id: Number(index),
				height: imgHeight,
			}]);
		};
	};
	useEffect(() => {
		if (showLoadList.length === showList.length) {

			handleImageLoad(showLoadList);
		}
	}, [showLoadList])
	const handleImageLoad = (newShowLoadList) => {
		// 调整顺序
		const imageLoadList = newShowLoadList.sort((a, b) => a.id - b.id);

		for (let i = 0; i < showList.length; i++) {
			// 把原数组中的属性赋予imageLoadList数组
			imageLoadList[i] = {
				...imageLoadList[i],
				url: showList[i],
				imgStyle: {
					height: pxTransform(imageLoadList[i].height) // 高度后面加上rpx
				}
			};
		}
		// console.log(imageLoadList);

		// 对现在的列表进行操作
		let leftHeightCur = leftHeight;  // 左边列表的高度
		let rightHeightCur = rightHeight;
		const left: IWaterfallType[] = leftShowList;  // 左边列表的数组
		const right: IWaterfallType[] = rightShowList;
		// 遍历数组
		for (let i = 0; i < imageLoadList.length; i++) {
			showImageUrlList.current.push(imageLoadList[i].url) //全部图片的url，点击图片放大功能用
			if (leftHeightCur <= rightHeightCur) {
				left.push(imageLoadList[i]);
				leftHeightCur = leftHeightCur + imageLoadList[i].height + 322;
			} else {
				right.push(imageLoadList[i]);
				rightHeightCur = rightHeightCur + imageLoadList[i].height + 322;
			}
		}
		setRightShowList(right);
		setLeftShowList(left);
		setRightHeight(rightHeightCur);
		setLeftHeight(leftHeightCur);
		setShowLoadList([]);
	};

	return (
		<View className="buyer-show">
			<View className="buyer-show__container-v">
				{
					showList.map((item, index) => (
						<Image
							className="buyer-show__item-img"
							src={item}
							onLoad={onImageLoad(index)}
						/>
					))
				}
			</View>

			<View className="buyer-show__container">
				<View className="buyer-show__container-left">
					{
						leftShowList.map(item => (
							<ImageCompon item={item} list={showImageUrlList.current} />
						))
					}
				</View>

				<View className="buyer-show__container-right">
					{
						rightShowList.map(item => (
							<ImageCompon item={item} list={showImageUrlList.current} />
						))
					}
				</View>
			</View>
		</View>
	)
}

export default Index;