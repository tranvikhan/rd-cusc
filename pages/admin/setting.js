import { SyncOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Layout,
  message,
  Radio,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
} from 'antd'
import React from 'react'
import useSWR from 'swr'
import { getAllPostAdminAPI } from '../../axios/post'
import { getAllProjectAdminAPI } from '../../axios/project'
import {
  editSettingAPI,
  getAllSettingAPI,
  uploadSettingImageAPI,
} from '../../axios/setting'
import { getAllUserShowAPI } from '../../axios/user'
import WebHead from '../../components/Layout/head'
import ImageUpload from '../../components/Upload/imageUpload'
import { useAuth } from '../../hook/useAuth'

export default function AdminSetting() {
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR(
    ['getAllSettingAdmin', user],
    async (type, user) => {
      if (user) {
        return await getAllSettingAPI(user.jwt)
      } else {
        return null
      }
    },
    {
      revalidateOnFocus: false,
    }
  )

  return (
    <article>
      <WebHead
        title="Cài đặt | Admin"
        pageTitle="Cài đặt | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              bordered={false}
              title="Cài đặt"
              /* loading={isValidating} */
              extra={
                <Tooltip title="Làm mới">
                  <Button
                    icon={<SyncOutlined />}
                    onClick={() => {
                      mutate()
                    }}
                  />
                </Tooltip>
              }
            >
              {user && user.role === 'root' && (
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Trang chủ" key="homepage">
                    <HomePageSetting
                      user={user}
                      settings={data}
                      refresh={() => {
                        mutate()
                      }}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Trang dự án" key="projectpage">
                    <ProjectPageSetting
                      user={user}
                      settings={data}
                      refresh={() => {
                        mutate()
                      }}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Trang tin tức" key="newspage">
                    <NewsPageSetting
                      user={user}
                      settings={data}
                      refresh={() => {
                        mutate()
                      }}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Trang tổ chức" key="organization">
                    <OrganizationPageSetting
                      user={user}
                      settings={data}
                      refresh={() => {
                        mutate()
                      }}
                    />
                  </Tabs.TabPane>
                </Tabs>
              )}
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}

const HomePageSetting = (props) => {
  const [image1, setImage1] = React.useState(null)
  const [image2, setImage2] = React.useState(null)
  const [image3, setImage3] = React.useState(null)
  const [image1URL, setImage1URL] = React.useState(
    'upload/homePageImage/default.jpg'
  )
  const [image2URL, setImage2URL] = React.useState(
    'upload/homePageImage/default.jpg'
  )
  const [image3URL, setImage3URL] = React.useState(
    'upload/homePageImage/default.jpg'
  )
  const [form] = Form.useForm()
  const { data, error, isValidating, mutate } = useSWR(
    ['getAllProjectSettingAdmin', props.user],
    async (type, user) => {
      if (user) {
        return await getAllProjectAdminAPI(1, user.jwt)
      } else {
        return null
      }
    },
    {
      revalidateOnFocus: false,
    }
  )
  const newData = data ? data.filter((dt) => dt.show_lang === 'vi,en') : []
  const [homeImage_mode, set_homeImage_mode] = React.useState('auto')
  const [homeProject_mode, set_homeProject_mode] = React.useState('auto')
  React.useEffect(() => {
    if (props.settings) {
      set_homeImage_mode(props.settings.homeImage_mode)
      set_homeProject_mode(props.settings.homeProject_mode)
      setImage1URL(props.settings.homeImage_1)
      setImage2URL(props.settings.homeImage_2)
      setImage3URL(props.settings.homeImage_3)
    }
  }, [props.settings])
  const handelSubmit = React.useCallback(
    (values) => {
      if (props.user) {
        let newValues = {
          ...values,
          homeImage_1: null,
          homeImage_2: null,
          homeImage_3: null,
        }
        editSettingAPI(newValues, props.user.jwt)
          .then((res) => {
            if (image1) {
              uploadSettingImageAPI(image1, 'homeImage_1', props.user.jwt)
                .then((res) => {
                  message.success(res.message, 1.5)
                  props.refresh()
                })
                .catch((error) => {
                  message.error(error.info, 1.5)
                })
            }
            if (image2) {
              uploadSettingImageAPI(image2, 'homeImage_2', props.user.jwt)
                .then((res) => {
                  message.success(res.message, 1.5)
                  props.refresh()
                })
                .catch((error) => {
                  message.error(error.info, 1.5)
                })
            }
            if (image3) {
              uploadSettingImageAPI(image3, 'homeImage_3', props.user.jwt)
                .then((res) => {
                  message.success(res.message, 1.5)
                  props.refresh()
                })
                .catch((error) => {
                  message.error(error.info, 1.5)
                })
            }
            message.success(res.message, 2)
            props.refresh()
          })
          .catch((error) => {
            message.error(error.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 2)
      }
    },
    [image1, image2, image3, props.user]
  )
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      form={form}
      initialValues={{
        ...props.settings,
      }}
      onFinish={handelSubmit}
    >
      <Form.Item label="Hình ảnh chính của trang chủ" name="homeImage_mode">
        <Radio.Group
          buttonStyle="solid"
          defaultValue="default"
          value={homeImage_mode}
          onChange={(e) => {
            set_homeImage_mode(e.target.value)
          }}
        >
          <Radio.Button value="default">Mặc định</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {homeImage_mode === 'manual' && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <div>
            <Form.Item
              label="Hình ảnh 1"
              name="homeImage_1_show"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="homeImage_1">
              <ImageUpload
                isHomePage
                file={image1}
                onChange={(file) => {
                  setImage1(file)
                }}
                defaultFileURL={image1URL}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Hình ảnh 2"
              name="homeImage_2_show"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="homeImage_2">
              <ImageUpload
                isHomePage
                file={image2}
                onChange={(file) => {
                  setImage2(file)
                }}
                defaultFileURL={image2URL}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Hình ảnh 3"
              name="homeImage_3_show"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="homeImage_3">
              <ImageUpload
                isHomePage
                file={image3}
                onChange={(file) => {
                  setImage3(file)
                }}
                defaultFileURL={image3URL}
              />
            </Form.Item>
          </div>
        </div>
      )}

      <Divider dashed />
      <Form.Item label="Dự án ở trang chủ" name="homeProject_mode">
        <Radio.Group
          buttonStyle="solid"
          defaultValue="auto"
          value={homeProject_mode}
          onChange={(e) => {
            set_homeProject_mode(e.target.value)
          }}
        >
          <Radio.Button value="auto">Tự động</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {homeProject_mode === 'manual' && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <Form.Item label="Dự án 1" name="homeProject_1">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
          <Form.Item label="Dự án 2" name="homeProject_2">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
          <Form.Item label="Dự án 3" name="homeProject_3">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
        </div>
      )}

      <Form.Item className="text-right">
        <Button
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const ProjectPageSetting = (props) => {
  const [form] = Form.useForm()
  const [pageProject_mode, set_pageProject_mode] = React.useState('auto')
  React.useEffect(() => {
    if (props.settings) {
      set_pageProject_mode(props.settings.pageProject_mode)
    }
  }, [props.settings])
  const { data, error, isValidating, mutate } = useSWR(
    ['getAllProjectSettingAdmin2', props.user],
    async (type, user) => {
      if (user) {
        return await getAllProjectAdminAPI(1, user.jwt)
      } else {
        return null
      }
    },
    {
      revalidateOnFocus: false,
    }
  )
  const newData = data ? data.filter((dt) => dt.show_lang === 'vi,en') : []
  const handelSubmit = React.useCallback(
    (values) => {
      if (props.user) {
        editSettingAPI(values, props.user.jwt)
          .then((res) => {
            message.success(res.message, 2)
            props.refresh()
          })
          .catch((error) => {
            message.error(error.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 2)
      }
    },
    [props.user]
  )
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      form={form}
      initialValues={{
        ...props.settings,
      }}
      onFinish={handelSubmit}
    >
      <Form.Item label="Hiển thị dự án trên cùng" name="pageProject_mode">
        <Radio.Group
          buttonStyle="solid"
          defaultValue="auto"
          value={pageProject_mode}
          onChange={(e) => {
            set_pageProject_mode(e.target.value)
          }}
        >
          <Radio.Button value="auto">Dự án mới nhất</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {pageProject_mode === 'manual' && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <Form.Item label="Dự án 1" name="pageProject_1">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
          <Form.Item label="Dự án 2" name="pageProject_2">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
          <Form.Item label="Dự án 3" name="pageProject_3">
            <CustomeSlect data={newData} titleKey="name" imageKey="image" />
          </Form.Item>
        </div>
      )}

      <Form.Item className="text-right">
        <Button
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const NewsPageSetting = (props) => {
  const [form] = Form.useForm()
  const [pageNews_mode, set_pageNews_mode] = React.useState('auto')
  React.useEffect(() => {
    if (props.settings) {
      set_pageNews_mode(props.settings.pageNews_mode)
    }
  }, [props.settings])
  const { data, error, isValidating, mutate } = useSWR(
    ['getAllNewsSettingAdmin', props.user],
    async (type, user) => {
      if (user) {
        return await getAllPostAdminAPI(1, user.jwt)
      } else {
        return null
      }
    },
    {
      revalidateOnFocus: false,
    }
  )
  const newData = data ? data.filter((dt) => dt.show_lang === 'vi,en') : []
  const handelSubmit = React.useCallback(
    (values) => {
      if (props.user) {
        editSettingAPI(values, props.user.jwt)
          .then((res) => {
            message.success(res.message, 2)
            props.refresh()
          })
          .catch((error) => {
            message.error(error.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 2)
      }
    },
    [props.user]
  )
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      form={form}
      initialValues={{
        ...props.settings,
      }}
      onFinish={handelSubmit}
    >
      <Form.Item label="Hiển thị bài viết trên cùng" name="pageNews_mode">
        <Radio.Group
          buttonStyle="solid"
          defaultValue="auto"
          value={pageNews_mode}
          onChange={(e) => {
            set_pageNews_mode(e.target.value)
          }}
        >
          <Radio.Button value="auto">Bài viết mới nhất</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {pageNews_mode === 'manual' && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <Form.Item label="Bài viết 1" name="pageNews_1">
            <CustomeSlect data={newData} titleKey="title" imageKey="image" />
          </Form.Item>
          <Form.Item label="Bài viết 2" name="pageNews_2">
            <CustomeSlect data={newData} titleKey="title" imageKey="image" />
          </Form.Item>
          <Form.Item label="Bài viết 3" name="pageNews_3">
            <CustomeSlect data={newData} titleKey="title" imageKey="image" />
          </Form.Item>
        </div>
      )}

      <Form.Item className="text-right">
        <Button
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const OrganizationPageSetting = (props) => {
  const [form] = Form.useForm()
  const [userTop_mode, set_userTop_mode] = React.useState('root')
  React.useEffect(() => {
    if (props.settings) {
      set_userTop_mode(props.settings.userTop_mode)
    }
  }, [props.settings])
  const { data, error, isValidating, mutate } = useSWR(
    ['getAllUserSettingAdmin', props.user],
    async (type, user) => {
      if (user) {
        return await getAllUserShowAPI()
      } else {
        return null
      }
    },
    {
      revalidateOnFocus: false,
    }
  )
  const handelSubmit = React.useCallback(
    (values) => {
      if (props.user) {
        editSettingAPI(values, props.user.jwt)
          .then((res) => {
            message.success(res.message, 2)
            props.refresh()
          })
          .catch((error) => {
            message.error(error.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 2)
      }
    },
    [props.user]
  )
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      form={form}
      initialValues={{
        ...props.settings,
      }}
      onFinish={handelSubmit}
    >
      <Form.Item label="Trưởng nhóm" name="userTop_mode">
        <Radio.Group
          buttonStyle="solid"
          defaultValue="root"
          value={userTop_mode}
          onChange={(e) => {
            set_userTop_mode(e.target.value)
          }}
        >
          <Radio.Button value="root">Người dùng root</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {userTop_mode === 'manual' && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <Form.Item label="Người dùng tùy chỉnh" name="userTop">
            <CustomeSlect data={data} titleKey="name_vi" imageKey="avatar" />
          </Form.Item>
        </div>
      )}

      <Form.Item className="text-right">
        <Button
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const CustomeSlect = (props) => {
  return (
    <Select
      {...props}
      defaultValue={0}
      size="large"
      showSearch
      filterOption={(input, option) =>
        option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        (option.value + '').toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Select.Option value={0} name="Không chọn">
        Không chọn
      </Select.Option>
      {props.data &&
        props.data.map((item) => (
          <Select.Option value={item.id} name={item[props.titleKey]}>
            <div className="flex space-x-2 items-center">
              <img
                src={'/' + item[props.imageKey]}
                className="w-14 h-8 object-cover rounded flex-none"
              />
              <span className="flex-grow">
                {item[props.titleKey].length > 40
                  ? item[props.titleKey].substring(0, 40) + '...'
                  : item[props.titleKey]}
              </span>
            </div>
          </Select.Option>
        ))}
    </Select>
  )
}
