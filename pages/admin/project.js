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

import ProjectShowTable from '../../components/Table/project/showTable'
import ProjectHideTable from '../../components/Table/project/hideTable'
import ProjectDetail from '../../components/Form/project'
import {
  approvedProjectAPI,
  deleteProjectAPI,
  editProjectAPI,
  getAllProjectAdminAPI,
} from '../../axios/project'
import { useAuth } from '../../hook/useAuth'
import useSWR from 'swr'

const projectFetcher = async (type, user, show) => {
  if (user) {
    return await getAllProjectAdminAPI(show, user.jwt)
  } else {
    return null
  }
}
export default function AdminProject() {
  const [key, setKey] = React.useState('1')
  const [modal, setModal] = React.useState(null)
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR(
    ['getProjectAdmin', user, parseInt(key)],
    projectFetcher,
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
        editProjectAPI(id, { show_hide: show }, user.jwt)
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
        deleteProjectAPI(id, user.jwt)
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
        approvedProjectAPI(id, 1, user.jwt)
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
            let res = await approvedProjectAPI(id, 1, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xử lý ' + rows.length + ' dự án', 1)
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
            let res = await editProjectAPI(id, { show_hide: show }, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })

        message.success('Đã xử lý ' + rows.length + ' dự án', 1)
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
            let res = await deleteProjectAPI(id, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xử lý ' + rows.length + ' dự án', 1)
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
          title="Dự án | Admin"
          pageTitle="Dự án | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title="Dự án"
                loading={isValidating}
                extra={
                  <Space size="middle">
                    <Tooltip title="Thêm dự án">
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setModal('add')
                        }}
                      >
                        Thêm dự án
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
                      <ProjectShowTable
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
                      <ProjectHideTable
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
        <ProjectDetail
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
