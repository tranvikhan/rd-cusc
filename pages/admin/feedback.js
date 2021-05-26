import { message, Button, Card, Col, Layout, Row, Tooltip } from 'antd'
import WebHead from '../../components/Layout/head'
import { SyncOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'
import ReceiveInformationTable from '../../components/Table/feedback/receiveInformationTable'
import ContactTable from '../../components/Table/feedback/contactTable'
import AdvisoryTable from '../../components/Table/feedback/advisoryTable'
import { useAuth } from '../../hook/useAuth'
import {
  approvedFeedbackAPI,
  deleteFeedbackAPI,
  getAllFeedbackAPI,
} from '../../axios/feedback'
import useSWR from 'swr'

const feedbackFetcher = async (type, user, key) => {
  if (user) {
    return await getAllFeedbackAPI(key, user.jwt)
  } else {
    return null
  }
}
export default function AdminFeedback() {
  const [key, setKey] = React.useState('get-news')
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR(
    ['getFeedback', user, key],
    feedbackFetcher,
    {
      revalidateOnFocus: false,
    }
  )
  const tabListNoTitle = [
    {
      key: 'get-news',
      tab: 'Nhận thông tin',
    },
    {
      key: 'advisory',
      tab: 'Hỗ trợ tư vấn',
    },
    {
      key: 'contact',
      tab: 'Liên hệ',
    },
  ]
  const handleApproved = useCallback(
    (id) => {
      if (user) {
        approvedFeedbackAPI(id, 1, user.jwt)
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
  const handleDelete = useCallback(
    (id) => {
      if (user) {
        deleteFeedbackAPI(id, user.jwt)
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
  const handleApprovedAll = useCallback(
    (rows) => {
      if (user) {
        rows.forEach(async (id) => {
          try {
            await approvedFeedbackAPI(id, 1, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xử lý ' + rows.length + ' phản hồi', 1)
        mutate()
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  const handleDeleteAll = useCallback(
    (rows) => {
      if (user) {
        rows.forEach(async (id) => {
          try {
            await deleteFeedbackAPI(id, user.jwt)
          } catch (e) {
            console.log(e)
          }
        })
        message.success('Đã xóa thành công ' + rows.length + ' phản hồi', 1)
        mutate()
      } else {
        message.error('Lỗi xác thực người dùng', 1)
      }
    },
    [user]
  )
  return (
    <article>
      <WebHead
        title="Phản hồi | Admin"
        pageTitle="Phản hồi | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title="Phản hồi"
              loading={isValidating}
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
              tabList={tabListNoTitle}
              activeTabKey={key}
              onTabChange={(key) => {
                setKey(key)
                mutate()
              }}
            >
              {
                {
                  'get-news': (
                    <ReceiveInformationTable
                      data={data}
                      onApproved={handleApproved}
                      onDelete={handleDelete}
                      onApprovedAll={handleApprovedAll}
                      onDeleteAll={handleDeleteAll}
                    />
                  ),
                  advisory: (
                    <AdvisoryTable
                      data={data}
                      onApproved={handleApproved}
                      onDelete={handleDelete}
                      onApprovedAll={handleApprovedAll}
                      onDeleteAll={handleDeleteAll}
                    />
                  ),
                  contact: (
                    <ContactTable
                      data={data}
                      onApproved={handleApproved}
                      onDelete={handleDelete}
                      onApprovedAll={handleApprovedAll}
                      onDeleteAll={handleDeleteAll}
                    />
                  ),
                }[key]
              }
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
