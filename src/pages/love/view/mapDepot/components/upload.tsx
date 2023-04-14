import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { FC, useState } from 'react'
import { NODE_DEV_API } from '../../../../../utils/config'

interface Props {
  onUploadSuccess: (urls: string[]) => void
}

const UploadFile: FC<Props> = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState<any[]>([])

  const handleFileChange = (res) => {
    var tempFilePaths = res.tempFilePaths
    if (tempFilePaths) {
      setFiles(tempFilePaths)
    }
  }

  const handleUpload = async () => {
    const urls: string[] = []

    for (const file of files) {
      const res = await Taro.uploadFile({
        url: NODE_DEV_API + 'api/common/upload',
        filePath: file,
        name: 'file',
        header: { // 设置请求头
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res.statusCode === 200) {
        urls.push(res.data)
      }
    }

    onUploadSuccess(urls)
    setFiles([]) // 清空已选文件列表
  }
  function chooseImage() {
    Taro.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: handleFileChange
    })
  }
  return (
    <View>
      <Button onClick={chooseImage}>选择文件</Button>
      <Button disabled={files.length === 0} onClick={handleUpload}>上传文件</Button>
    </View>
  )
}

export default UploadFile