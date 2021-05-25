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

const BasicDemo = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
})
const { TabPane } = Tabs

export default function NewProject() {
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
      title="Thêm dự án mới"
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
      <ProjectFormMain />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tiếng Việt" key="1">
          <ProjectFormDetail lang="vi" />
        </TabPane>
        <TabPane tab="English" key="2">
          <ProjectFormDetail lang="en" />
        </TabPane>
      </Tabs>
    </Modal>
  )
}
const ProjectFormMain = (props) => {
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
      </Row>
    </Form>
  )
}

const ProjectFormDetail = (props) => {
  const mapLang = {
    vi: {
      name: {
        label: 'Tên dự án',
        placeholder: 'Nhập tên dự án',
        require: 'Vui lòng nhập tên dự án',
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
        label: 'Ảnh dự án',
        placeholder: 'Chọn ảnh dự án',
        require: 'Vui lòng chọn ảnh cho dự án',
      },

      content: 'Nội dung',
    },
    en: {
      name: {
        label: 'Project name',
        placeholder: 'Enter project name',
        require: 'Please fill in project name',
      },
      description: {
        label: 'Project description',
        placeholder: 'Enter project description',
        require: 'Please fill in project description',
      },
      tags: {
        label: 'Tags',
        placeholder: 'Enter keywords',
      },
      image: {
        label: 'Project thumbnail',
        placeholder: 'Choose project thumbnail',
        require: 'Please choose project thumbnail',
      },

      content: 'Content',
    },
  }
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label={mapLang[props.lang].name.label}
            name="name"
            rules={[
              { required: true, message: mapLang[props.lang].name.require },
            ]}
          >
            <Input placeholder={mapLang[props.lang].name.placeholder} />
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