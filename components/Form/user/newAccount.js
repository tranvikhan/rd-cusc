import { Button, Form, Input, Modal, message, Spin } from 'antd'
import React, { useCallback } from 'react'
import { registerAPI } from '../../../axios/auth'

export default function NewAccount(props) {
  const [loading, setLoading] = React.useState(false)
  const [form] = Form.useForm()

  const handelError = useCallback((error) => {
    error.errorFields.forEach((ls) => {
      ls.errors.forEach((ms) => {
        message.error(ms, 1.5)
      })
    })
  }, [])
  const handelFormSubmit = useCallback(
    (values) => {
      values.role = 'user'
      if (props.user) {
        setLoading(true)
        registerAPI(values, props.user.jwt)
          .then((res) => {
            setLoading(false)
            message.success(res.message, 2).then(() => {
              props.toggle('success')
            })
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng!')
      }
    },
    [props.user]
  )
  return (
    <Modal
      title="Tạo tài khoản mới"
      closable={false}
      destroyOnClose={true}
      visible={props.isShow}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            props.toggle('cancel')
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
          Thêm
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          onFinishFailed={handelError}
          initialValues={{
            name_vi: '',
            name_en: '',
            username: '',
            password: 'rd@cusc',
          }}
          onFinish={handelFormSubmit}
        >
          <Form.Item
            label="Tên thành viên (vi)"
            name="name_vi"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên thành viên tiếng Việt',
              },
            ]}
          >
            <Input placeholder="Nhập tên thành viên tiếng Việt" />
          </Form.Item>
          <Form.Item
            label="Tên thành viên (en)"
            name="name_en"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên thành viên tiếng Anh',
              },
            ]}
          >
            <Input placeholder="Nhập tên thành viên tiếng Anh" />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Tên đăng nhập không được trống',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  for (let i = 0; i < props.data.length; i++) {
                    if (value === props.data[i].username) {
                      return Promise.reject(new Error('Tên đăng nhập bị trùng'))
                    }
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              {
                min: 7,
                message: 'Mật khẩu cần dài hơn 6 ký tự',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
