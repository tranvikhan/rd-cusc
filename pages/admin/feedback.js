import { Avatar, Button, Card, Col, Layout, Row, Tooltip } from 'antd'
import WebHead from '../../components/Layout/head'
import { SyncOutlined } from '@ant-design/icons'
import React from 'react'
import ReceiveInformationTable from '../../components/Table/feedback/receiveInformationTable'
import ContactTable from '../../components/Table/feedback/contactTable'
import AdvisoryTable from '../../components/Table/feedback/advisoryTable'

const { Meta } = Card
export default function AdminHome() {
  const [key, setKey] = React.useState('tab1')
  const [loading, setLoading] = React.useState(false)
  const contentList = {
    tab1: <ReceiveInformationTable />,
    tab2: <AdvisoryTable />,
    tab3: <ContactTable />,
  }

  const tabListNoTitle = [
    {
      key: 'tab1',
      tab: 'Nhận thông tin',
    },
    {
      key: 'tab2',
      tab: 'Hỗ trợ tư vấn',
    },
    {
      key: 'tab3',
      tab: 'Liên hệ',
    },
  ]

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
              loading={loading}
              extra={
                <Tooltip title="Làm mới">
                  <Button
                    shape="circle"
                    icon={<SyncOutlined />}
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => {
                        setLoading(false)
                      }, 1000)
                    }}
                  />
                </Tooltip>
              }
              tabList={tabListNoTitle}
              activeTabKey={key}
              onTabChange={(key) => {
                setKey(key)
              }}
            >
              {contentList[key]}
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
