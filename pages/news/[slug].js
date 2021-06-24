import React from 'react'
import Container from '../../components/Layout/container'
import Header from '../../components/Layout/header'
import Link from 'next/link'
import WebHead from '../../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getServerSideProps = async (props) => ({
  props: {
    ...(await serverSideTranslations(props.locale, ['organization'])),
  },
})

export default function News(props) {
  const { t } = useTranslation('organization')
  return (
    <article>
      <WebHead
        image="/assets/img/news/5456237_Cover_Nvidia.jpg"
        title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
        pageTitle="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
        description="Trước đây có tin đồn là những chiếc card đồ họa RTX 3000 series bản nâng cấp sẽ được ra mắt vào ngày 18/05, với chiếc RTX 3080 Ti và 3070 Ti."
      />
      <Header>
        <Container>
          <PostInfo
            href="/news/123456"
            imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
            title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
            author={{
              avatar: '/assets/img/users/thViet.jpg',
              name: 'Trần Hoàng Việt',
            }}
            createAt="04/05/2021"
          />
        </Container>
      </Header>
      <Container>
        <div className="grid lg:grid-cols-6 grid-cols-1 gap-8">
          <div className="lg:col-span-4 col-span-1">
            <section className="bg-white py-10">
              <Paragraph>
                Trước đây có tin đồn là những chiếc card đồ họa RTX 3000 series
                bản nâng cấp sẽ được ra mắt vào ngày 18/05, với chiếc RTX 3080
                Ti và 3070 Ti. Tuy nhiên theo nguồn tin mà Overclocking.com dẫn
                lại, thì ngày ra mắt đã bị dời sang ngày 31/05, và sẽ bán ra vào
                tháng 06 tới. Cụ thể hơn, RTX 3080 Ti sẽ bán vào ngày 02/06, và
                RTX 3070 Ti sẽ bán vào ngày 09/06. Không rõ lý do vì sao Nvidia
                dời ngày ra mắt hai chiếc card đồ họa cao cấp này, nhưng cũng
                cần nhớ là cái ngày 18/05 kể trên cũng chưa được Nvidia xác nhận
                chính thức.
              </Paragraph>
              <Paragraph>
                Những thông tin chưa chính thức nói rằng, RTX 3080 Ti nâng cấp
                mạnh hơn hẳn so với chiếc 3080 ra mắt vào tháng 09/2020, với bộ
                nhớ GDDR6X dung lượng lớn hơn, nhiều nhân CUDA và Tensor xử lý
                AI hơn trên bề mặt chip CPU, băng thông bộ nhớ 384-bit giống hệt
                như RTX 3090. Còn trong khi đó, RTX 3070 Ti thì được cho là nâng
                cấp nhẹ hơn, vẫn có 8GB VRAM như 3070 và băng thông bộ nhớ
                256-bit, nhưng sẽ dùng GDDR6X thay vì GDDR6 như bản cũ. Để không
                bóp người dùng đã mua RTX 3080, hiệu năng của chiếc này được cho
                là vẫn ở tầm dưới, nằm giữa 3070 và 3080.
              </Paragraph>
              <Paragraph>
                Đấy là thông tin tờ Forbes vừa chia sẻ. Còn phía Tom's Hardware
                thì đưa tin rằng một vài kênh thương mại điện tử đã đăng tải
                thông tin trước về giá của mẫu card chơi game còn chưa được
                Nvidia công bố. Cụ thể hơn là Aquila Technology Ltd. ở New
                Zealand đã báo giá MSI GeForce RTX 3080 TI Ventus 3X 12G OC
                khoảng 1.830 USD, và GeForce Geforce RTX 3080 Ti Gaming OC báo
                giá khoảng 2.270 USD. Tương tự như vậy là bên Úc. Perth
                Technical Services Pty Ltd báo giá Gigabyte GeForce RTX 3080 Ti
                Eagle khoảng 1.730 USD và Gigabyte GeForce RTX 3080 Ti Vision OC
                ở mức 1.344 USD sau khi quy đổi tỷ giá Đô Úc sang Đô Mỹ. Mức giá
                này hẳn là đã có thuế phí, và nhìn vào độ chi tiết của từng sản
                phẩm, khá chắc giá đó không phải chỉ là để sẵn cho đủ cơ sở dữ
                liệu theo kiểu placeholder.
              </Paragraph>
              <Paragraph>
                Và ở một nguồn tin khác, nghe nói GPU mới của Nvidia sẽ có cả
                khả năng giới hạn tốc độ và hiệu năng đào tiền ảo ngay trên phần
                cứng thay vì thông qua driver và firmware như RTX 3060. Không
                biết các dân cày có tìm được cách flash BIOS để cày tiếp hay
                không.
              </Paragraph>
            </section>
          </div>

          <div className="lg:col-span-2 col-span-1 my-10 space-y-8">
            <div className="bg-blue-50 p-4 space-y-4 rounded">
              <h1 className="text-xl  font-bold">Danh mục</h1>
              <Link href="/news/#rdnews">
                <h1 className="cursor-pointer text-black text-sm leading-6 font-medium text-2-line hover:text-blue-600">
                  Tin hoạt động nhóm R&D
                </h1>
              </Link>
              <Link href="/news/#technews">
                <h1 className="cursor-pointer text-black text-sm leading-6 font-medium text-2-line hover:text-blue-600">
                  Tin tức công nghệ mới
                </h1>
              </Link>
            </div>
            <div className="bg-blue-50 p-4 space-y-4 rounded">
              <h1 className="text-xl  font-bold">Tin mới</h1>
              <PostItem
                href="/"
                imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
                title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5457092_cover.jpg"
                title="Trên tay AirTag: tìm rất chính xác"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5455999_cover_chuphinh_realme8pro_tinhte.jpg"
                title="Ngày nghỉ lễ của mình, chụp bằng realme 8 & realme 8 Pro"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5457306_cover_hinh_anh_ro_net_Galaxy_Z_Flip_3_tinhte.jpg"
                title="Thêm hình ảnh rò rỉ rõ nét về Galaxy Z Flip 3?"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
                title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
                title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
                title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
              <PostItem
                href="/"
                imageURL="/assets/img/news/5457306_cover_hinh_anh_ro_net_Galaxy_Z_Flip_3_tinhte.jpg"
                title="Thêm hình ảnh rò rỉ rõ nét về Galaxy Z Flip 3?"
                author={{
                  avatar: '/assets/img/users/thViet.jpg',
                  name: 'Trần Hoàng Việt',
                }}
                createAt="04/05/2021"
              />
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

const PostItem = (props) => (
  <div className="flex space-x-2">
    <img
      src={props.imageURL}
      alt="Ảnh bài viết"
      className="object-cover h-16 w-24 rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center">
      <div className="flex flex-row items-center justify-between flex-wrap-reverse">
        <div className="flex flex-row items-center ">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="object-cover h-4 w-4  rounded-full shadow-lg mr-2 border bg-blue-300"
          />
          <span className="text-gray-600 text-xs font-medium py-1">
            {props.author.name}
          </span>
        </div>

        <span className="text-gray-500 text-xs leading-5 font-medium mt-1  lg:mb-0 mb-1">
          {props.createAt}
        </span>
      </div>
      <Link href={props.href}>
        <h1 className="cursor-pointer text-black text-sm leading-6 font-medium text-2-line hover:text-blue-600">
          {props.title}
        </h1>
      </Link>
    </div>
  </div>
)

const PostInfo = (props) => (
  <div>
    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover lg:h-96 h-64 w-full rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center  p-0 py-8">
      <span className="text-gray-200 text-sm leading-5 font-medium mt-1">
        {props.createAt}
      </span>

      <h1 className="text-white text-2xl leading-7 font-bold py-4">
        {props.title}
      </h1>
      <div className="flex flex-row items-center justify-between flex-wrap">
        <div className="flex flex-row items-center py-2">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="object-cover h-8 w-8  rounded-full shadow-lg mr-2 border bg-purple-50"
          />

          <h3 className="text-blue-50 text-sm font-medium py-1">
            {props.author.name}
          </h3>
        </div>
        <div className="flex flex-row items-center py-2 space-x-2">
          <div
            class="fb-share-button"
            data-href="https://rd-cusc.herokuapp.com/news/123456"
            data-layout="button_count"
            data-size="large"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frd-cusc.herokuapp.com%2Fnews%2F123456&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore"
            >
              <div
                className="fb-xfbml-parse-ignore cursor-pointer bg-blue-600 text-white rounded text-xs font-semibold block"
                style={{ padding: 6 }}
              >
                Chia sẻ FB
              </div>
            </a>
          </div>

          <div
            className="zalo-share-button cursor-pointer bg-blue-500 text-white rounded text-xs font-semibold"
            style={{ padding: 6 }}
            data-href="https://rd-cusc.herokuapp.com/news/123456"
            data-oaid="579745863508352884"
            data-customize={true}
          >
            Chia sẻ Zalo
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Paragraph = ({ children }) => (
  <p className="text-base font-normal text-gray-900 mb-6">{children}</p>
)
