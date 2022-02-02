import React from 'react'
import 'antd/dist/antd.css'
import { Upload, Modal } from 'antd'
import UploadService from '../services/uploadService'
import { PlusOutlined } from '@ant-design/icons'
import { uuid } from 'uuidv4'
import { toast } from 'react-toastify'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }

  uploadToServer = (image) => {
    return this.props.setImages(image)
    toast.info('Uploading is in progress')
    const form = new FormData()
    form.append('image', image)
    UploadService.uploadToServer(form).then(({ data: { url } }) => {
      this.setState({
        fileList: [
          ...this.state.fileList,
          {
            uid: uuid(),
            name: Math.random(0, 100000).toString(),
            status: 'done',
            url,
          },
        ],
      })
      toast.success('Server upload success')
      if (this.props.setImages) this.props.setImages(this.state.fileList.map(({ url }) => url))
    })
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Upload
          style={{ display: 'flex' }}
          action={this.uploadToServer}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onRemove={(id) => {
            this.setState({ fileList: [...fileList.filter(({ uid }) => uid !== id.uid)] })
            if (this.props.setImages) this.props.setImages(this.state.fileList.map(({ url }) => url))
          }}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal style={{ display: 'flex' }} visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '50%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}

export default PicturesWall
