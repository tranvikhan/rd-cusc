import { Button, Card, Layout, List, message, Popconfirm, Tooltip } from 'antd'
import WebHead from '../../components/Layout/head'
import {
  SettingOutlined,
  PushpinOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import ApplicationFormAction from '../../components/Form/application'
import { deleteAppAPI, getAllAppAPI } from '../../axios/application'
import useSWR from 'swr'
import { useAuth } from '../../hook/useAuth'
import React from 'react'

const { Meta } = Card

const applicationFetcher = async (type, user) => {
  if (user) {
    return await getAllAppAPI(user.jwt)
  } else {
    return null
  }
}
export default function AdminApp() {
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR(
    ['getAppAdmin', user],
    applicationFetcher,
    {
      revalidateOnFocus: false,
    }
  )
  const [applicationForm, setApplicationForm] = React.useState(null)
  return (
    <>
      {applicationForm && (
        <ApplicationFormAction
          user={user}
          data={applicationForm}
          toggle={(value) => {
            setApplicationForm(null)
            if (value) mutate()
          }}
        />
      )}
      <article>
        <WebHead
          title="Ứng dụng | Admin"
          pageTitle="Ứng dụng | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Card
            loading={isValidating}
            bordered={false}
            title="Danh sách ứng dụng"
            extra={
              user.role !== 'user' && (
                <Tooltip title="Thêm ứng dụng">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setApplicationForm('new')
                    }}
                  >
                    Thêm ứng dụng
                  </Button>
                </Tooltip>
              )
            }
          >
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
              dataSource={data}
              renderItem={(appItem) => (
                <List.Item>
                  <Card
                    type="inner"
                    actions={
                      user.role !== 'user' && [
                        appItem.show === 1 ? (
                          <Tooltip title="Đang hiển thị">
                            <PushpinOutlined key="show" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Đang ẩn">
                            <EyeInvisibleOutlined key="hide" />
                          </Tooltip>
                        ),
                        <Tooltip title="Chỉnh sửa">
                          <SettingOutlined
                            key="setting"
                            onClick={() => {
                              setApplicationForm(appItem)
                            }}
                          />
                        </Tooltip>,
                        <Popconfirm
                          title="Xác nhận xóa ứng dụng"
                          okText="OK"
                          cancelText="Hủy"
                          key="delete"
                          onConfirm={() => {
                            if (user) {
                              deleteAppAPI(appItem.id, user.jwt)
                                .then((res) => {
                                  mutate()
                                  message.success(res.message, 1.5)
                                })
                                .catch((err) => {
                                  message.error(err.info, 2)
                                })
                            } else {
                              message.error('Lỗi xác thực người dùng', 2)
                            }
                          }}
                        >
                          <DeleteOutlined />
                        </Popconfirm>,
                      ]
                    }
                    cover={
                      <img
                        className="object-cover h-44 w-full filter brightness-90"
                        alt={appItem.name_vi}
                        src={'/api/' + appItem.image}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Link href={appItem.domain}>{appItem.name_vi}</Link>
                      }
                      description={appItem.domain}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Layout>
      </article>
    </>
  )
}
