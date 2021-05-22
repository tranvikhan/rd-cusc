import { Avatar, Button, Card, Col, Layout, Row, Space, Tooltip } from 'antd'
import WebHead from '../../components/Layout/head'
import { SyncOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'

import NewProject from '../../components/Form/project/newProject'
import PostShowTable from '../../components/Table/post/showTable'
import PostHideTable from '../../components/Table/post/hideTable'
import NewPost from '../../components/Form/post/newPost'

const { Meta } = Card
export default function AdminPost() {
  const [key, setKey] = React.useState('tab1')
  const [loading, setLoading] = React.useState(false)
  const contentList = {
    tab1: <PostShowTable />,
    tab2: <PostHideTable />,
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
          title="Bài viết | Admin"
          pageTitle="Bài viết | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title="Bài viết"
                loading={loading}
                extra={
                  <Space size="middle">
                    <Tooltip title="Viết bài">
                      <Button type="primary" icon={<PlusOutlined />}>
                        Viết bài
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
      <NewPost />
    </>
  )
}
