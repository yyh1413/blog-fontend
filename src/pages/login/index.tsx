import { FC, useEffect, useState } from 'react'
import { View, Text, Image, Input, Button as AtButton } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { authLogin } from '../../utils/authority/authority'
import { NODE_DEV_API } from '../../utils/config'
import { CACHE_CODE, CACHE_TOKEN, CACHE_USERINFO } from '../../utils/authority/config'
// import UploadFile from '../love/view/mapDepot/components/upload'

const Index: FC = () => {

	const [imagePath, setImagePath] = useState(''); // 选择的图片路径
	const [name, setName] = useState(''); // 选择的图片路径

	useEffect(() => {
		login()
	}, [])
	function login() {
		//有token时，不需要重新登录
		const token = Taro.getStorageSync(CACHE_CODE);
		if (token) {
			Taro.switchTab({
				url: "/pages/index/index",
			});
		}
	}
	const defUrl = 'https://img2.baidu.com/it/u=2029553607,3582403905&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
	// 选择图片
	const chooseImage = async () => {
		Taro.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths
				setImagePath(tempFilePaths[0])
			}
		})
	};

	async function handleLogin() {
		await authLogin(imagePath, name);
		const openid = Taro.getStorageSync(CACHE_CODE)
		uploadImage(openid)
	}
	// 上传图片
	const uploadImage = async (openid) => {
		console.log(imagePath);

		Taro.uploadFile({
			url: NODE_DEV_API + 'api/user/upload', // 上传接口的地址
			filePath: imagePath, // 要上传的文件路径
			name: 'file', // 文件对应的 key
			header: { // 设置请求头
				'Content-Type': 'multipart/form-data',
			},
			formData: { // 其他上传参数
				name: name,
				openid
			},
			success: async (res: any) => {
				const { data } = JSON.parse(res.data);
				const userinfo = { name: data.name, filepath: data.filepath }
				Taro.setStorageSync(CACHE_USERINFO, JSON.stringify(userinfo));
				login();
			},
			fail: async (res: any) => {
				console.log('fail', res);

			},
		});
	};
	// function onUploadSuccess(re) {
	// 	console.log(re);

	// }
	return (
		<View className='login_box'>
			<View className='title'>授权登录</View>
			{/* <UploadFile onUploadSuccess={onUploadSuccess} /> */}

			<Image className="avatar" src={imagePath || defUrl}
				onClick={chooseImage}></Image>
			{imagePath ? undefined : <View className='login_box_text2'>请重新选择头像</View>}
			<View className='name'>
				<Text>昵称</Text>
				<Input type='text' placeholder='请输入昵称' value={name}
					onInput={e => {
						console.log(e.detail);

						setName(e.detail.value)
					}}
					onConfirm={handleLogin} />
			</View>
			<AtButton className='login_but' type='primary' onClick={handleLogin}
				disabled={!name || !imagePath}	>登录</AtButton>

		</View >
	)
}


export default Index;