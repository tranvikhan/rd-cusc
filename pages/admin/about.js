import { Avatar, Card, Col, Layout, Row, Typography, Divider } from 'antd'
import WebHead from '../../components/Layout/head'

import Link from 'next/link'

const { Title, Paragraph, Text } = Typography

const { Meta } = Card
export default function AdminAbout() {
  return (
    <article>
      <WebHead
        title="Thông tin | Admin"
        pageTitle="Thông tin | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered={false}>
              <Typography>
                <Title level={3}>Giới thiệu</Title>
                <Paragraph>
                  In the process of internal desktop applications development,
                  many different design specs and implementations would be
                  involved, which might cause designers and developers
                  difficulties and duplication and reduce the efficiency of
                  development.
                </Paragraph>
                <Paragraph>
                  After massive project practice and summaries, Ant Design, a
                  design language for background applications, is refined by Ant
                  UED Team, which aims to
                  <Text strong>
                    uniform the user interface specs for internal background
                    projects, lower the unnecessary cost of design differences
                    and implementation and liberate the resources of design and
                    front-end development
                  </Text>
                  .
                </Paragraph>
              </Typography>
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <Typography>
                <Title level={3}>Nội quy</Title>
                <Paragraph>
                  In the process of internal desktop applications development,
                  many different design specs and implementations would be
                  involved, which might cause designers and developers
                  difficulties and duplication and reduce the efficiency of
                  development.
                </Paragraph>
                <Paragraph>
                  <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                  </ul>
                </Paragraph>
              </Typography>
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
