import { Button, Form, Input, Modal, Switch, message, Spin } from 'antd'
import { useState } from 'react'
import ImageUpload from '../../Upload/imageUpload'
import React from 'react'
import {
  addAppAPI,
  editAppAPI,
  uploadAppImageAPI,
} from '../../../axios/application'

export default function ApplicationFormAction(props) {
  const [loading, setLoading] = React.useState(false)
  const [form] = Form.useForm()
  const [file, setFile] = React.useState(null)

  const handelFileUpload = React.useCallback(
    (file) => {
      setFile(file)
      form.setFieldsValue({ image: file ? file.name : null })
    },
    [form]
  )
  const handelFinish = React.useCallback(
    (values) => {
      let newValues = {
        name_vi: values.name_vi,
        name_en: values.name_en,
        domain: values.domain,
        show: values.show ? 1 : 0,
      }
      if (props.data === 'new') {
        setLoading(true)
        addAppAPI(newValues, props.user.jwt)
          .then((res) => {
            setLoading(false)
            if (!file) {
              message.warn(res.message + ' Sử dụng ảnh mặt định', 1.5)
              props.toggle(true)
            } else {
              uploadAppImageAPI(file, res.obj.id, props.user.jwt)
                .then((res2) => {
                  message.success(res.message + ' - ' + res2.message, 1.5)
                  props.toggle(true)
                })
                .catch((err2) => {
                  message.warn(res.message + ' Sử dụng ảnh mặt định', 1.5)
                  message.error(err2.info, 2).then(() => {
                    props.toggle(true)
                  })
                })
            }
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      } else {
        setLoading(true)
        editAppAPI(props.data.id, newValues, props.user.jwt)
          .then((res) => {
            setLoading(false)
            if (!file) {
              message.success(res.message, 1.5)
              props.toggle(true)
            } else {
              uploadAppImageAPI(file, res.obj.id, props.user.jwt)
                .then((res2) => {
                  message.success(res.message + ' - ' + res2.message, 1.5)
                  props.toggle(true)
                })
                .catch((err2) => {
                  message.error(err2.info, 2).then(() => {
                    props.toggle(true)
                  })
                })
            }
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      }
    },
    [file, props.user, props.data]
  )

  return (
    <Modal
      title={props.data === 'new' ? 'Thêm ứng dụng mới' : 'Chỉnh sửa ứng dụng'}
      closable={false}
      destroyOnClose={true}
      visible={props.data}
      onCancel={() => {
        props.toggle(null)
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            props.toggle(null)
          }}
        >
          Hủy
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Lưu
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          initialValues={props.data !== 'new' ? props.data : null}
          onFinish={handelFinish}
        >
          <Form.Item
            label="Tên ứng dụng (vi)"
            name="name_vi"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên ứng dụng tiếng Việt',
              },
            ]}
          >
            <Input placeholder="Nhập tên ứng dụng tiếng Việt" />
          </Form.Item>
          <Form.Item
            label="Tên ứng dụng (en)"
            name="name_en"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên ứng dụng tiếng Anh',
              },
            ]}
          >
            <Input placeholder="Nhập tên ứng dụng tiếng Anh" />
          </Form.Item>
          <Form.Item
            label="Đường dẫn"
            name="domain"
            rules={[{ required: true, message: 'Vui lòng nhập đường dẫn' }]}
          >
            <Input placeholder="url" />
          </Form.Item>

          <Form.Item label="Ảnh ứng dụng" name="image">
            <ImageUpload
              file={file}
              onChange={handelFileUpload}
              defaultFileURL={props.data !== 'new' ? props.data.image : null}
            />
          </Form.Item>
          <Form.Item
            name="show"
            label="Hiển thị công khai"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
