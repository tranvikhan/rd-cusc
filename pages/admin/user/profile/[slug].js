import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
  Space,
  Typography,
  message,
  Avatar,
} from 'antd'
import WebHead from '../../../../components/Layout/head'
import { DeleteOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons'
import ImageUpload from '../../../../components/Upload/imageUpload'
import moment from 'moment'
import ResetPassword from '../../../../components/Form/user/resetPassword'
import { useAuth } from '../../../../hook/useAuth'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import {
  deleteUserAPI,
  editUserAPI,
  getDetailUserAPI,
  uploadAvatarAPI,
} from '../../../../axios/user'
import useSWR from 'swr'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const userFetcher = async (type, id) => {
  return await getDetailUserAPI(id)
}
export default function AdminUser() {
  const [form] = Form.useForm()
  const [file, setFile] = React.useState(null)
  const [defaultFileURL, setDefaultFileURL] = React.useState(null)
  const [checkRole, setCheckRole] = React.useState(false)
  const [resetPasswordModal, setResetPasswordModal] = React.useState(false)
  const router = useRouter()
  const { user, refreshUserInfo } = useAuth()
  const handelFileUpload = useCallback((file) => {
    setFile(file)
  }, [])
  const { data, error, isValidating, mutate } = useSWR(
    ['getUserDetailEdit', parseInt(router.query.slug)],
    userFetcher,
    {
      revalidateOnFocus: false,
    }
  )
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const { slug } = router.query
    if (user.role === 'root' || user.id === parseInt(slug)) {
      setCheckRole(true)
    }
  }, [user, router])
  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        birth_day: moment(data.birth_day),
      })
      setDefaultFileURL(data.avatar)
    }
  }, [data, form])
  const handelError = useCallback((error) => {
    error.errorFields.forEach((ls) => {
      ls.errors.forEach((ms) => {
        message.error(ms, 1.5)
      })
    })
  }, [])
  const handelFinish = useCallback(
    (values) => {
      setLoading(true)
      if (user && data) {
        editUserAPI(
          parseInt(router.query.slug),
          { ...values, avatar: data.avatar },
          user.jwt
        )
          .then((res) => {
            setLoading(false)
            if (file) {
              uploadAvatarAPI(file, parseInt(router.query.slug), user.jwt)
                .then((res) => {
                  message.success(res.message, 2).then(() => {
                    if (user.id === parseInt(router.query.slug))
                      refreshUserInfo()
                  })
                })
                .catch((err) => {
                  message.success(res.message, 2).then(() => {
                    if (user.id === parseInt(router.query.slug))
                      refreshUserInfo()
                  })
                })
            } else {
              message.success(res.message, 2).then(() => {
                mutate()
                if (user.id === parseInt(router.query.slug)) refreshUserInfo()
              })
            }
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      } else {
        message.error('L???i x??c th???c ng?????i d??ng', 1.5)
      }
    },
    [user, router.query.slug, file, data]
  )
  return (
    <>
      {user && resetPasswordModal && (
        <ResetPassword
          user={user}
          userId={parseInt(router.query.slug)}
          isShow={resetPasswordModal}
          togle={() => {
            setResetPasswordModal(false)
          }}
        />
      )}
      <article>
        <WebHead
          title="Th??ng tin th??nh vi??n | Admin"
          pageTitle="Th??ng tin th??nh vi??n | Admin"
          description="Qu???n l?? website nh??m R&D"
        />
        <Layout>
          <Card
            loading={isValidating || loading}
            bordered={false}
            title={
              data ? (
                <Space align="center">
                  <Avatar src={'/api/' + data.avatar} />
                  <Typography.Text level={5}>{data.name_vi}</Typography.Text>
                </Space>
              ) : (
                'Th??ng tin th??nh vi??n ...'
              )
            }
            extra={
              <Space size="middle">
                {checkRole && (
                  <>
                    <Tooltip title="L??u th??ng tin">
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                      >
                        L??u
                      </Button>
                    </Tooltip>
                    <Tooltip title="?????i m???t kh???u">
                      <Button
                        icon={<KeyOutlined />}
                        onClick={() => {
                          setResetPasswordModal(true)
                        }}
                      ></Button>
                    </Tooltip>
                  </>
                )}

                {user && user.role === 'root' && router.query.slug != '1' && (
                  <Tooltip title="X??a t??i kho???n">
                    <Popconfirm
                      title="B???n c?? ch???c ch???n mu???n x??a t??i kho???n n??y kh???i h??? th???ng"
                      okText="Ch???p nh???p"
                      cancelText="H???y"
                      onConfirm={() => {
                        if (user) {
                          setLoading(true)
                          deleteUserAPI(parseInt(router.query.slug), user.jwt)
                            .then((res) => {
                              message.success(res.message, 1.5).then(() => {
                                router.push('/admin/user')
                              })
                            })
                            .catch((err) => {
                              setLoading(false)
                              message.error(err.info, 1.5)
                            })
                        } else {
                          message.error('L???i x??c th???c ng?????i d??ng', 1.5)
                        }
                      }}
                    >
                      <Button type="danger" icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                  </Tooltip>
                )}
              </Space>
            }
          >
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="form_user"
              onFinishFailed={handelError}
              onFinish={handelFinish}
            >
              <Tabs defaultActiveKey="1">
                {/* Tab Th??ng tin chung ---------------------------------------------------- */}
                <Tabs.TabPane tab="Th??ng tin chung" key="1">
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item
                        disabled={!checkRole}
                        label="H??? t??n (vi)"
                        name="name_vi"
                        rules={[
                          {
                            required: true,
                            message: 'Vui l??ng nh???p t??n ti???ng Vi???t',
                          },
                        ]}
                      >
                        <Input placeholder="T??n ti???ng Vi???t" />
                      </Form.Item>
                      <Form.Item
                        disabled={!checkRole}
                        label="H??? t??n (en)"
                        name="name_en"
                        rules={[
                          {
                            required: true,
                            message: 'Vui l??ng nh???p t??n ti???ng Anh',
                          },
                        ]}
                      >
                        <Input placeholder="T??n ti???ng Anh" />
                      </Form.Item>
                      <Form.Item
                        disabled={!checkRole}
                        label="V??? tr?? l??m vi???c (vi)"
                        name="position_vi"
                        rules={[
                          {
                            required: true,
                            message: 'Vui l??ng nh???p v??? tr?? l??m vi???c ti???ng Vi???t',
                          },
                        ]}
                      >
                        <Input placeholder="V??? tr?? l??m vi???c ti???ng Vi???t" />
                      </Form.Item>
                      <Form.Item
                        disabled={!checkRole}
                        label="V??? tr?? l??m vi???c (en)"
                        name="position_en"
                        rules={[
                          {
                            required: true,
                            message: 'Vui l??ng nh???p v??? tr?? l??m vi???c ti???ng Anh',
                          },
                        ]}
                      >
                        <Input placeholder="V??? tr?? l??m vi???c ti???ng Anh" />
                      </Form.Item>
                      <Form.Item label="Tr??ch d???n (vi)" name="saying_vi">
                        <Input.TextArea
                          showCount
                          rows={4}
                          maxLength={600}
                          placeholder="Nh???p tr??ch d???n ti???ng Vi???t"
                        />
                      </Form.Item>
                      <Form.Item label="Tr??ch d???n (en)" name="saying_en">
                        <Input.TextArea
                          showCount
                          rows={4}
                          maxLength={600}
                          placeholder="Nh???p tr??ch d???n ti???ng Anh"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Qu???c t???ch (vi)" name="national_vi">
                        <Input placeholder="Vi???t Nam" />
                      </Form.Item>
                      <Form.Item label="Qu???c t???ch (en)" name="national_en">
                        <Input placeholder="Viet Nam" />
                      </Form.Item>
                      <Form.Item label="Gi???i t??nh" name="gender">
                        <Select defaultValue="male" style={{ width: '100%' }}>
                          <Select.Option value="male">Nam</Select.Option>
                          <Select.Option value="female">N???</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Ng??y sinh" name="birth_day">
                        <DatePicker
                          style={{ width: '100%' }}
                          defaultValue={moment('01/01/1990', dateFormatList[0])}
                          format={dateFormatList}
                        />
                      </Form.Item>
                      <Form.Item label="???nh ?????i di???n" name="avatar">
                        <ImageUpload
                          file={file}
                          onChange={handelFileUpload}
                          defaultFileURL={defaultFileURL}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="T??i kho???n" key="2">
                  {/* Tab T??i kho???n ---------------------------------------------------- */}
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="M?? t??i kho???n" name="id">
                        <Input placeholder="M?? t??i kho???n" disabled />
                      </Form.Item>
                      <Form.Item label="T??n ????ng nh???p" name="username">
                        <Input placeholder="T??n ????ng nh???p" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Quy???n truy c???p" name="role">
                        <Select
                          defaultValue="user"
                          style={{ width: '100%' }}
                          disabled={
                            (user && user.role !== 'root') ||
                            router.query.slug == '1'
                          }
                        >
                          <Select.Option value="user">Th??nh vi??n</Select.Option>
                          <Select.Option value="admin">
                            Qu???n tr??? (Admin)
                          </Select.Option>

                          {router.query.slug == '1' && (
                            <Select.Option value="root">Root</Select.Option>
                          )}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="show"
                        label="Hi???n th??? th??nh vi??n tr??n trang t??? ch???c"
                        valuePropName="checked"
                      >
                        <Switch
                          disabled={
                            (user && user.role !== 'root') ||
                            router.query.slug == '1'
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Li??n h???" key="3">
                  {/* Tab Li??n h???---------------------------------------------------- */}
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Email" name="email">
                        <Input placeholder="Nh???p email" />
                      </Form.Item>
                      <Form.Item label="S??? ??i???n tho???i" name="phone">
                        <Input placeholder="Nh???p s??? ??i???n tho???i" />
                      </Form.Item>
                      <Form.Item label="CV" name="cv">
                        <Input placeholder="Nh???p ???????ng d???n ?????n file cv" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="?????a ch??? (vi)" name="address_vi">
                        <Input placeholder="Nh???p ?????a ch??? ti???ng Vi???t" />
                      </Form.Item>
                      <Form.Item label="?????a ch??? (en)" name="address_en">
                        <Input placeholder="Nh???p ?????a ch??? ti???ng Anh" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Form>
          </Card>
        </Layout>
      </article>
    </>
  )
}
