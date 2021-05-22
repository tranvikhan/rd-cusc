import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Tabs,
} from 'antd'
import { useState } from 'react'
import ImageUpload from '../../Upload/imageUpload'
import dynamic from 'next/dynamic'
import React from 'react'

const BasicDemo = dynamic(() => import('../../Editor'), {
  ssr: false,
})
const { TabPane } = Tabs

export default function NewPost() {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [loading, setLoading] = React.useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal
      title="Viết bài mới"
      closable={false}
      width={1300}
      centered
      destroyOnClose={true}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel">Hủy</Button>,
        <Button key="save">Bản nháp</Button>,
        <Button key="publish" type="primary">
          Hiển thị
        </Button>,
      ]}
    >
      <PostFormMain />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tiếng Việt" key="1">
          <PostFormDetail lang="vi" />
        </TabPane>
        <TabPane tab="English" key="2">
          <PostFormDetail lang="en" />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

const PostFormMain = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label="Ngôn ngữ hiển thị" name="show_lang">
            <Select defaultValue="vi,en" style={{ width: '100%' }}>
              <Select.Option value="vi">Chỉ tiếng Anh</Select.Option>
              <Select.Option value="en">Chỉ tiếng Việt</Select.Option>
              <Select.Option value="vi,en">Tiếng Anh + Việt</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label="Danh mục" name="category">
            <Select defaultValue={1} style={{ width: '100%' }}>
              <Select.Option value={1}>Tin hoạt động R&D</Select.Option>
              <Select.Option value={2}>Tin tức CN mới</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

const PostFormDetail = (props) => {
  const mapLang = {
    vi: {
      title: {
        label: 'Tiêu đề',
        placeholder: 'Nhập tiêu đề',
        require: 'Vui lòng nhập tiêu đề',
      },
      description: {
        label: 'Mô tả',
        placeholder: 'Nhập mô tả',
        require: 'Vui lòng nhập mô tả rút gọn',
      },
      tags: {
        label: 'Thẻ',
        placeholder: 'Nhập từ khóa',
      },
      image: {
        label: 'Ảnh bài viết',
        placeholder: 'Chọn ảnh bài viết',
        require: 'Vui lòng chọn ảnh cho bài viết',
      },
      content: 'Nội dung',
    },
    en: {
      title: {
        label: 'Title',
        placeholder: 'Enter title',
        require: 'Please fill in title',
      },
      description: {
        label: 'Description',
        placeholder: 'Enter description',
        require: 'Please fill in description',
      },
      tags: {
        label: 'Tags',
        placeholder: 'Enter keywords',
      },
      image: {
        label: 'Thumbnail',
        placeholder: 'Choose thumbnail',
        require: 'Please choose thumbnail',
      },
      content: 'Content',
    },
  }
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label={mapLang[props.lang].title.label}
            name="title"
            rules={[
              { required: true, message: mapLang[props.lang].title.require },
            ]}
          >
            <Input placeholder={mapLang[props.lang].title.placeholder} />
          </Form.Item>

          <Form.Item
            label={mapLang[props.lang].description.label}
            name="description"
            rules={[
              {
                required: true,
                message: mapLang[props.lang].description.require,
              },
            ]}
          >
            <Input.TextArea
              showCount
              rows={4}
              maxLength={600}
              placeholder={mapLang[props.lang].description.placeholder}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label={mapLang[props.lang].tags.label} name="tags">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder={mapLang[props.lang].tags.placeholder}
            ></Select>
          </Form.Item>
          <Form.Item
            label={mapLang[props.lang].image.label}
            name="image"
            rules={[
              {
                required: true,
                message: mapLang[props.lang].image.require,
              },
            ]}
          >
            <ImageUpload />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={mapLang[props.lang].content} name="content">
            <BasicDemo />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
