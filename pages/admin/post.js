import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  message,
  Row,
  Space,
  Tooltip,
} from 'antd'
import WebHead from '../../components/Layout/head'
import { SyncOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'

import PostShowTable from '../../components/Table/post/showTable'
import PostHideTable from '../../components/Table/post/hideTable'
import PostDetail from '../../components/Form/post'
import {
  approvedPostAPI,
  deletePostAPI,
  editPostAPI,
  getAllPostAdminAPI,
} from '../../axios/post'
import { useAuth } from '../../hook/useAuth'
import useSWR from 'swr'

const postFetcher = async (type, user, show) => {
  if (user) {
    return await getAllPostAdminAPI(show, user.jwt)
  } else {
    return null
  }
}
export default function AdminPost() {
  const [key, setKey] = React.useState('1')
  const [modal, setModal] = React.useState(null)
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR(
    ['getPostAdmin', user, parseInt(key)],
    postFetcher,
    {
      revalidateOnFocus: false,
    }
  )
  React.useEffect(() => {
    if (error) {
      message.error(error.info, 2)
    }
  }, [error])
  const tabListNoTitle = [
    {
      key: '1',
      tab: 'Hiển thị',
    },
    {
      key: '0',
      tab: 'Bản nháp',
    },
  ]

  const handelShowHide = useCallback(
    (id, show) => {
      if (user) {
        editPostAPI(id, { show_hide: show }, user.jwt)
          .then((rs) => {
            message.success(rs.message, 1)
            mutate()
          })
          .catch((err) => {
            message.error(err.info, 1)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handelDelete = useCallback(
    (id) => {
      if (user) {
        deletePostAPI(id, user.jwt)
          .then((rs) => {
            message.success(rs.message, 1)
            mutate()
          })
          .catch((err) => {
            message.error(err.info, 1)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handelApproved = useCallback(
    (id) => {
      if (user) {
        approvedPostAPI(id, 1, user.jwt)
          .then((rs) => {
            message.success(rs.message, 1)
            mutate()
          })
          .catch((err) => {
            message.error(err.info, 1)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handelApprovedAll = useCallback(
    async (rows) => {
      if (user) {
        await rows.forEach(async (id) => {
          try {
            let res = await approvedPostAPI(id, 1, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xử lý ' + rows.length + ' bài viết', 1)
        setTimeout(() => {
          mutate()
        }, 1000)
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handelShowHideAll = useCallback(
    async (rows, show) => {
      if (user) {
        await rows.forEach(async (id) => {
          try {
            let res = await editPostAPI(id, { show_hide: show }, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })

        message.success('Đã xử lý ' + rows.length + ' bài viết', 1)
        setTimeout(() => {
          mutate()
        }, 1000)
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handelDeleteAll = useCallback(
    async (rows) => {
      if (user) {
        await rows.forEach(async (id) => {
          try {
            let res = await deletePostAPI(id, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xử lý ' + rows.length + ' bài viết', 1)
        setTimeout(() => {
          mutate()
        }, 1000)
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  return (
    <>
      <article>
        <WebHead
          title="Bài viết | Admin"
          pageTitle="Bài viết | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title="Bài viết"
                loading={isValidating}
                extra={
                  <Space size="middle">
                    <Tooltip title="Viết bài">
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setModal('add')
                        }}
                      >
                        Viết bài
                      </Button>
                    </Tooltip>
                    <Tooltip title="Làm mới">
                      <Button
                        icon={<SyncOutlined />}
                        onClick={() => {
                          mutate()
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                tabList={tabListNoTitle}
                activeTabKey={key}
                onTabChange={(key) => {
                  setKey(key)
                }}
              >
                {
                  {
                    1: (
                      <PostShowTable
                        data={data ? data : []}
                        role={user && user.role}
                        onHide={async (id) => {
                          await handelShowHide(id, 0)
                        }}
                        onEdit={(id) => {
                          setModal(id)
                        }}
                        onApproved={handelApproved}
                        onApprovedAll={handelApprovedAll}
                        onHideAll={async (rows) => {
                          await handelShowHideAll(rows, 0)
                        }}
                      />
                    ),
                    0: (
                      <PostHideTable
                        data={data ? data : []}
                        role={user && user.role}
                        onEdit={(id) => {
                          setModal(id)
                        }}
                        onShow={async (id) => {
                          await handelShowHide(id, 1)
                        }}
                        onShowAll={async (rows) => {
                          await handelShowHideAll(rows, 1)
                        }}
                        onDelete={async (id) => {
                          await handelDelete(id)
                        }}
                        onDeleteAll={async (rows) => {
                          await handelDeleteAll(rows)
                        }}
                        onApproved={handelApproved}
                        onApprovedAll={handelApprovedAll}
                      />
                    ),
                  }[key]
                }
              </Card>
            </Col>
          </Row>
        </Layout>
      </article>
      {modal && (
        <PostDetail
          isShow={modal}
          toggle={() => {
            setModal(null)
            mutate()
          }}
          user={user}
        />
      )}
    </>
  )
}
