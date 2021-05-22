import { Avatar, Card, Col, Layout, Row } from 'antd'
import WebHead from '../../components/Layout/head'
import {
  BsFilePost,
  BsInboxesFill,
  BsFillBriefcaseFill,
  BsPersonFill,
} from 'react-icons/bs'
import dynamic from 'next/dynamic'

const AccessChart = dynamic(
  () => import('../../components/Chart/accessChart'),
  {
    ssr: false,
  }
)
const TopUserChart = dynamic(
  () => import('../../components/Chart/topUserChart'),
  {
    ssr: false,
  }
)

const { Meta } = Card
export default function AdminDashBoard() {
  return (
    <article>
      <WebHead
        title="Tổng quan | Admin"
        pageTitle="Tổng quan | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={12} xs={24}>
            <Card bordered={false}>
              <Meta
                avatar={
                  <div className="flex bg-red-100 w-14 h-14 rounded-full text-red-500 justify-center items-center">
                    <BsFilePost size={28} />
                  </div>
                }
                title="12"
                description="Bài viết"
              />
            </Card>
          </Col>
          <Col lg={6} md={12} xs={24}>
            <Card bordered={false}>
              <Meta
                avatar={
                  <div className="flex bg-blue-100 w-14 h-14 rounded-full text-blue-500 justify-center items-center">
                    <BsFillBriefcaseFill size={28} />
                  </div>
                }
                title="5"
                description="Dự án"
              />
            </Card>
          </Col>
          <Col lg={6} md={12} xs={24}>
            <Card bordered={false}>
              <Meta
                avatar={
                  <div className="flex bg-green-100 w-14 h-14 rounded-full text-green-500 justify-center items-center">
                    <BsPersonFill size={28} />
                  </div>
                }
                title="3"
                description="Thành viên"
              />
            </Card>
          </Col>
          <Col lg={6} md={12} xs={24}>
            <Card bordered={false}>
              <Meta
                avatar={
                  <div className="flex bg-yellow-100 w-14 h-14 rounded-full text-yellow-500 justify-center items-center">
                    <BsInboxesFill size={28} />
                  </div>
                }
                title="124"
                description="Phản hồi"
              />
            </Card>
          </Col>
          <Col lg={15} md={15} xs={24}>
            <Card title="Lược truy cập" bordered={false}>
              <AccessChart />
            </Card>
          </Col>
          <Col lg={9} md={9} xs={24}>
            <Card title="Thành viên tích cực" bordered={false}>
              <TopUserChart />
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
