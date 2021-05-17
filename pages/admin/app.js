import { Avatar, Card, Col, Layout, Row } from 'antd'
import WebHead from '../../components/Layout/head'
import {
  BsFilePost,
  BsInboxesFill,
  BsFillBriefcaseFill,
  BsPersonFill,
} from 'react-icons/bs'
import Link from 'next/link'

const { Meta } = Card
export default function AdminApp() {
  return (
    <article>
      <WebHead
        title="Ứng dụng | Admin"
        pageTitle="Ứng dụng | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={12} xs={24}>
            <Card
              bordered={false}
              cover={
                <img
                  className="object-cover h-48 w-full"
                  alt="example"
                  src="/assets/img/iso.PNG"
                />
              }
            >
              <Meta
                title={
                  <Link href="https://iso.cusc.vn/web/iso/trang-chu">
                    HỆ THỐNG ISO
                  </Link>
                }
                description="ios.cusc.vn"
              />
            </Card>
          </Col>
          <Col lg={6} md={12} xs={24}>
            <Card
              bordered={false}
              cover={
                <img
                  className="object-cover h-48 w-full"
                  alt="example"
                  src="/assets/img/meet.PNG"
                />
              }
            >
              <Meta
                title={
                  <Link href="https://cusc-meet.ddns.net/ ">
                    PHÒNG HỌP TRỰC TUYẾN
                  </Link>
                }
                description="cusc-meet.ddns.net"
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
