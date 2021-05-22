import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Input,
  Select,
  Dropdown,
  Menu,
  Typography,
} from 'antd'
import React from 'react'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  MoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
const { Option } = Select
const data = []
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    email: i + 'tranvikhan@gmail.com',
    image: '',
    title: 'Tin tức có tiêu đề thứ  ' + i,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    author: 'Trần Vi Khan ' + i,
    show_lang:
      Math.random() > 0.3 ? (Math.random() > 0.6 ? 'vi' : 'en') : 'vi,en',
    created_at: '14/05/2021',
    approved: Math.random() > 0.5 ? 1 : 0,
    category: Math.random() > 0.5 ? 1 : 2,
  })
}

export default function PostShowTable() {
  const [state, setState] = React.useState({
    searchText: '',
    searchedColumn: '',
  })
  const searchInput = React.useRef()
  const getColumnSearchProps = (dataIndex, label) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node
          }}
          placeholder={`Tìm kiếm ${label}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Khôi phục
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              })
            }}
          >
            Lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100)
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setState({ searchText: '' })
  }

  const columns = [
    {
      title: 'Ảnh bài viết',
      dataIndex: 'image',
      key: 'image',
      render: (status) => (
        <img
          src="/assets/img/famer.jpg"
          alt="famer"
          className="object-cover h-14 w-20 rounded"
        />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',

      ...getColumnSearchProps('title', 'tiêu đề'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'approved',
      key: 'approved',
      filters: [
        {
          text: 'Chờ duyệt',
          value: 0,
        },
        {
          text: 'Đã duyệt',
          value: 1,
        },
      ],
      onFilter: (value, record) => record.approved === value,
      render: (approved) => (
        <Tag color={approved === 0 ? 'red' : 'green'}>
          {approved === 0 ? 'Chờ duyệt' : 'Đã duyệt'}
        </Tag>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: [
        {
          text: 'Hoạt động R&D',
          value: 1,
        },
        {
          text: 'Tin tức CN',
          value: 2,
        },
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => (
        <Tag>{category === 1 ? 'Hoạt động R&D' : 'Tin tức CN'}</Tag>
      ),
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'show_lang',
      key: 'show_lang',
      filters: [
        {
          text: 'Tiếng Việt',
          value: 'vi',
        },
        {
          text: 'Tiếng anh',
          value: 'en',
        },
        {
          text: 'Tiếng Việt + Anh',
          value: 'vi,en',
        },
      ],
      onFilter: (value, record) => record.show_lang.indexOf(value) === 0,
      render: (show_lang) =>
        show_lang.split(',').map((i) => (
          <Tag color={i === 'vi' ? 'magenta' : 'cyan'} key={i}>
            {i}
          </Tag>
        )),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      ...getColumnSearchProps('author', 'tác giả'),
    },
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      key: 'created_at',
    },

    {
      title: 'Hành động',
      key: 'action',

      render: (text, record) => (
        <Dropdown.Button
          placement="bottomCenter"
          icon={<MoreOutlined />}
          overlay={() => (
            <Menu>
              <Menu.Item icon={<EditOutlined />}>Chỉnh sửa</Menu.Item>

              {record.approved === 0 && (
                <Menu.Item icon={<PlusOutlined />}>
                  <Popconfirm
                    title="Chọn hành động"
                    okText="Đã duyệt"
                    cancelText="Tiếp tục đợi"
                  >
                    Duyệt
                  </Popconfirm>
                </Menu.Item>
              )}
              <Menu.Item danger icon={<DeleteOutlined />}>
                <Popconfirm
                  title="Xác nhận chuyển đến bản nháp？"
                  okText="Chấp nhận"
                  cancelText="Hủy"
                  onConfirm={() => {
                    console.log(record)
                  }}
                >
                  Bản nháp
                </Popconfirm>
              </Menu.Item>
            </Menu>
          )}
        ></Dropdown.Button>
      ),
    },
  ]

  const [selectedRowKeys, setSelectedKeys] = React.useState([])
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedKeys,
  }
  const [actionType, setActionType] = React.useState('approved')
  const actionMap = {
    approved: 'Đã duyệt',
    hide: 'Bản nháp',
  }
  return (
    <Table
      scroll={{ x: 1100 }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            <span className="font-medium">Mô tả rút gọn: </span>
            <span style={{ margin: 0 }}>{record.description}</span>
          </div>
        ),
      }}
      footer={() => (
        <Space size="middle">
          <Select
            defaultValue={actionType}
            value={actionType}
            onChange={(val) => setActionType(val)}
            style={{ width: 120 }}
          >
            <Option value="approved">{actionMap['approved']}</Option>

            <Option value="hide">{actionMap['hide']}</Option>
          </Select>
          <Popconfirm
            disabled={selectedRowKeys.length === 0}
            title={
              'Xác nhận hành động "' +
              actionMap[actionType] +
              '" với ' +
              selectedRowKeys.length +
              ' trường dữ liệu'
            }
            okText="Thực thi"
            cancelText="Hủy"
          >
            <Button disabled={selectedRowKeys.length === 0}>Hành động</Button>
          </Popconfirm>
        </Space>
      )}
    />
  )
}
