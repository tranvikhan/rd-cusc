import { Avatar, Button, Card, Col, Layout, Row, Space, Tooltip } from 'antd'
import WebHead from '../../components/Layout/head'
import { SyncOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'

import ProjectShowTable from '../../components/Table/project/showTable'
import ProjectHideTable from '../../components/Table/project/hideTable'
import NewProject from '../../components/Form/project/newProject'

const { Meta } = Card
export default function AdminProject() {
  const [key, setKey] = React.useState('tab1')
  const [loading, setLoading] = React.useState(false)
  const contentList = {
    tab1: <ProjectShowTable />,
    tab2: <ProjectHideTable />,
  }

  const tabListNoTitle = [
    {
      key: 'tab1',
      tab: 'Hiển thị',
    },
    {
      key: 'tab2',
      tab: 'Bản nháp',
    },
  ]

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
                loading={loading}
                extra={
                  <Space size="middle">
                    <Tooltip title="Thêm dự án">
                      <Button type="primary" icon={<PlusOutlined />}>
                        Thêm dự án
                      </Button>
                    </Tooltip>
                    <Tooltip title="Làm mới">
                      <Button
                        icon={<SyncOutlined />}
                        onClick={() => {
                          setLoading(true)
                          setTimeout(() => {
                            setLoading(false)
                          }, 1000)
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
                {contentList[key]}
              </Card>
            </Col>
          </Row>
        </Layout>
      </article>
      <NewProject />
    </>
  )
}
