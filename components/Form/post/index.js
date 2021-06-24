import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  message,
  Tabs,
  Spin,
} from 'antd'
import { useCallback, useState } from 'react'
import ImageUpload from '../../Upload/imageUpload'
import dynamic from 'next/dynamic'
import React from 'react'
import { tagToString, tagToArray } from '../../../helper/tagTranform'
import {
  addPostAPI,
  editPostAPI,
  getDetailPostAdminAPI,
  uploadPostImageAPI,
} from '../../../axios/post'

const BasicDemo = dynamic(() => import('../../Editor'), {
  ssr: false,
})
const { TabPane } = Tabs

export default function PostDetail(props) {
  const [formMain] = Form.useForm()
  const [formVi] = Form.useForm()
  const [formEn] = Form.useForm()
  const [activeTab, setActiveTab] = React.useState('vi')
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    show: 0,
    show_lang: 'vi,en',
    category: 1,
    vi: {
      title: 'Tiêu đề tiếng việt',
      description: 'Nội dung mô tả tiếng việt',
      tags: ['cusc', 'r&d'],
      image: null,
    },
    en: {
      title: 'English title',
      description: 'English description',
      tags: ['cusc', 'r&d'],
      image: null,
    },
  })
  const [contentVi, setContentVi] = React.useState(null)
  const [contentEn, setContentEn] = React.useState(null)
  const [file, setFile] = React.useState(null)

  const [defaultContentVi, setDefaultContentVi] = React.useState(null)
  const [defaultContentEn, setDefaultContentEn] = React.useState(null)
  const [defaultFileURL, setDefaultFileURL] = React.useState(null)

  React.useEffect(() => {
    setActiveTab('en')
    setTimeout(() => {
      setActiveTab('vi')
    }, 200)
  }, [])
  React.useEffect(() => {
    if (props.isShow && props.isShow !== 'add' && props.user) {
      console.log('Get data')
      setLoading(true)
      getDetailPostAdminAPI(props.isShow, props.user.jwt)
        .then((res) => {
          console.log(res)
          setLoading(false)
          let resVi = (res[0].lang = 'vi' ? res[0] : res[1])
          let resEn = (res[0].lang = 'vi' ? res[1] : res[0])

          formMain.setFieldsValue({
            show_lang: resVi.show_lang,
            category: resVi.category,
          })
          formVi.setFieldsValue({
            title: resVi.title,
            description: resVi.description,
            tags: tagToArray(resVi.tags),
          })
          formEn.setFieldsValue({
            title: resEn.title,
            description: resEn.description,
            tags: tagToArray(resEn.tags),
          })
          setDefaultContentVi(resVi.content)
          setDefaultContentEn(resEn.content)
          setDefaultFileURL(resVi.image)
        })
        .catch((err) => {
          message.error(err.info, 2).then(() => {
            setLoading(false)
            props.toggle()
          })
        })
    }
  }, [props.isShow, props.user, formMain, formVi, formEn])

  const sendForm = useCallback(
    (formData) => {
      if (formData && props.user) {
        let values = {
          show: formData.show,
          show_lang: formData.show_lang,
          category: formData.category,
          vi: {
            title: formData.vi.title,
            description: formData.vi.description,
            tags: tagToString(formData.vi.tags),
            content: formData.vi.content ? formData.vi.content.toRAW() : '',
          },
          en: {
            title: formData.en.title,
            description: formData.en.description,
            tags: tagToString(formData.en.tags),
            content: formData.en.content ? formData.en.content.toRAW() : '',
          },
        }

        if (props.isShow === 'add') {
          setLoading(true)
          addPostAPI(values, props.user.jwt)
            .then((res) => {
              setLoading(false)

              if (!formData.file) {
                message.warn('Sử dụng ảnh mặt định - ' + res.message, 2, () => {
                  props.toggle()
                })
              } else {
                uploadPostImageAPI(formData.file, res.obj.id, props.user.jwt)
                  .then((res2) => {
                    message.success(res.message, 2, () => {
                      props.toggle()
                    })
                  })
                  .catch((err2) => {
                    message.warn(
                      'Lỗi tải lên hình ảnh - Sử dụng ảnh mặt định',
                      2,
                      () => {
                        props.toggle()
                      }
                    )
                  })
              }
            })
            .catch((err) => {
              setLoading(false)
              message.error(err.info, 2)
            })
        } else if (props.isShow && props.user && parseInt(props.isShow)) {
          setLoading(true)
          editPostAPI(parseInt(props.isShow), values, props.user.jwt)
            .then((res) => {
              setLoading(false)

              if (formData.file) {
                uploadPostImageAPI(formData.file, res.obj.id, props.user.jwt)
                  .then((res2) => {
                    message.success(res.message, 2, () => {
                      props.toggle()
                    })
                  })
                  .catch((err2) => {
                    message.warn(
                      'Lỗi tải lên hình ảnh - Sử dụng ảnh mặt định',
                      2,
                      () => {
                        props.toggle()
                      }
                    )
                  })
              } else {
                message.success(res.message, 2, () => {
                  props.toggle()
                })
              }
            })
            .catch((err) => {
              setLoading(false)
              message.error(err.info, 2)
            })
        }
      }
    },
    [props.isShow, props.user]
  )

  const handelFileUpload = useCallback(
    (file) => {
      setFile(file)
      console.log(file)
      formVi.setFieldsValue({ image: file ? file.name : null })
      formEn.setFieldsValue({ image: file ? file.name : null })
    },
    [formVi, formEn]
  )

  const handelError = useCallback((error, formName) => {
    error.errorFields.forEach((ls) => {
      ls.errors.forEach((ms) => {
        message.error(ms, 1.5)
      })
    })
    setData({ ...data, checkpoint: 0 })
    if (formName === 'formVi') {
      setActiveTab('vi')
    } else {
      setActiveTab('en')
    }
  }, [])
  const submitForm = useCallback(
    (showType) => {
      formMain
        .validateFields()
        .then((MAIN) => {
          formVi
            .validateFields()
            .then((VI) => {
              formEn
                .validateFields()
                .then((EN) => {
                  console.log(MAIN)
                  sendForm({
                    show: showType,
                    ...MAIN,
                    vi: { ...VI, content: contentVi },
                    en: { ...EN, content: contentEn },
                    file: file,
                  })
                })
                .catch((err) => {
                  formEn.submit()
                })
            })
            .catch((err) => {
              formVi.submit()
            })
        })
        .catch((err) => {
          formMain.submit()
        })
    },
    [formMain, formVi, formEn, file, contentEn, contentVi]
  )
  return (
    <Modal
      title={
        props.isShow !== 'add'
          ? 'Chỉnh sửa bài viết ID= ' + props.isShow
          : 'Thêm bài viết mới'
      }
      closable={false}
      width={1300}
      centered
      destroyOnClose={true}
      visible={props.isShow}
      footer={[
        <Popconfirm
          title="Bạn chắc chắn hủy nội dung này"
          okText="Có"
          cancelText="Không"
          onConfirm={() => {
            props.toggle()
          }}
        >
          <Button key="cancel">Hủy</Button>
        </Popconfirm>,

        <Button
          key="save"
          onClick={() => {
            submitForm(0)
          }}
        >
          Bản nháp
        </Button>,
        <Button
          key="publish"
          type="primary"
          onClick={() => {
            submitForm(1)
          }}
        >
          Hiển thị
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <PostFormMain
          onChangeLang={(lang) => {
            setActiveTab(lang)
          }}
          form={formMain}
          initialValues={{ show_lang: data.show_lang, category: data.category }}
          onFinishFailed={(error) => handelError(error, 'formMain')}
        />
        <Tabs
          defaultActiveKey="vi"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <TabPane tab="Tiếng Việt" key="vi">
            <PostFormDetail
              lang="vi"
              form={formVi}
              file={file}
              onChangeFile={handelFileUpload}
              initialValues={{ ...data.vi }}
              onFinishFailed={(error) => handelError(error, 'formVi')}
              onContentEdit={(editorState) => {
                setContentVi(editorState)
              }}
              defaultContent={defaultContentVi}
              defaultFileURL={defaultFileURL}
            />
          </TabPane>
          <TabPane tab="English" key="en">
            <PostFormDetail
              lang="en"
              file={file}
              form={formEn}
              onChangeFile={handelFileUpload}
              initialValues={{ ...data.en }}
              onFinishFailed={(error) => handelError(error, 'formEn')}
              onContentEdit={(editorState) => {
                setContentEn(editorState)
              }}
              defaultContent={defaultContentEn}
              defaultFileURL={defaultFileURL}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </Modal>
  )
}
const PostFormMain = (props) => {
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={props.form}
      initialValues={props.initialValues}
      onFinishFailed={props.onFinishFailed}
    >
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label="Ngôn ngữ hiển thị" name="show_lang">
            <Select
              defaultValue="vi,en"
              style={{ width: '100%' }}
              onChange={(key) => {
                props.onChangeLang(key !== 'vi,en' ? key : 'vi')
              }}
            >
              <Select.Option value="en">Chỉ tiếng Anh</Select.Option>
              <Select.Option value="vi">Chỉ tiếng Việt</Select.Option>
              <Select.Option value="vi,en">Tiếng Anh + Việt</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label="Danh mục" name="category">
            <Select defaultValue={1} style={{ width: '100%' }}>
              <Select.Option value={1}>Hoạt động nhóm R&D</Select.Option>
              <Select.Option value={2}>Công nghệ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

const PostFormDetail = (props) => {
  const mapLang = {
    vi: {
      title: {
        label: 'Tiêu đề',
        placeholder: 'Nhập tiêu đề',
        require: 'Vui lòng nhập tiêu đề',
      },
      description: {
        label: 'Mô tả',
        placeholder: 'Nhập mô tả',
        require: 'Vui lòng nhập mô tả rút gọn',
      },
      tags: {
        label: 'Thẻ',
        placeholder: 'Nhập từ khóa',
      },
      image: {
        label: 'Ảnh bài viết',
        placeholder: 'Chọn ảnh bài viết',
        require: 'Vui lòng chọn ảnh cho bài viết',
      },

      content: 'Nội dung',
    },
    en: {
      title: {
        label: 'Post title',
        placeholder: 'Enter post title',
        require: 'Please fill in post title',
      },
      description: {
        label: 'Post description',
        placeholder: 'Enter post description',
        require: 'Please fill in post description',
      },
      tags: {
        label: 'Tags',
        placeholder: 'Enter keywords',
      },
      image: {
        label: 'Post thumbnail',
        placeholder: 'Choose post thumbnail',
        require: 'Please choose post thumbnail',
      },

      content: 'Content',
    },
  }
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={props.form}
      initialValues={props.initialValues}
      onFinishFailed={props.onFinishFailed}
    >
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label={mapLang[props.lang].title.label}
            name="title"
            rules={[
              { required: true, message: mapLang[props.lang].title.require },
            ]}
          >
            <Input placeholder={mapLang[props.lang].title.placeholder} />
          </Form.Item>

          <Form.Item
            label={mapLang[props.lang].description.label}
            name="description"
            rules={[
              {
                required: true,
                message: mapLang[props.lang].description.require,
              },
            ]}
          >
            <Input.TextArea
              showCount
              rows={4}
              maxLength={600}
              placeholder={mapLang[props.lang].description.placeholder}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item label={mapLang[props.lang].tags.label} name="tags">
            <Select
              maxTagCount={'responsive'}
              mode="tags"
              style={{ width: '100%' }}
              placeholder={mapLang[props.lang].tags.placeholder}
            ></Select>
          </Form.Item>

          <Form.Item label={mapLang[props.lang].image.label} name="image">
            <ImageUpload
              file={props.file}
              onChange={props.onChangeFile}
              defaultFileURL={props.defaultFileURL}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={mapLang[props.lang].content} name="content">
            <BasicDemo
              onChange={props.onContentEdit}
              defaultContent={props.defaultContent}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
