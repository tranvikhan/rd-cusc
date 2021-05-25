import { Button, Popconfirm, Space, Table, Tag, Input, Select } from 'antd'
import React from 'react'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  SendOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
const { Option } = Select

export default function ReceiveInformationTable() {
  const [state, setState] = React.useState({
    searchText: '',
    searchedColumn: '',
  })
  const searchInput = React.useRef()
  const getColumnSearchProps = (dataIndex) => ({
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
          placeholder={`Tìm kiếm ${dataIndex}`}
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      ...getColumnSearchProps('email'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'approved',
      key: 'approved',
      filters: [
        {
          text: 'Đang chờ',
          value: 0,
        },
        {
          text: 'Đã xử lý',
          value: 1,
        },
      ],
      onFilter: (value, record) => record.approved === value,
      render: (approved) => (
        <Tag color={approved === 0 ? 'red' : 'green'}>
          {approved === 0 ? 'Đang chờ' : 'Đã xử lý'}
        </Tag>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Hành động',
      key: 'action',

      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xác nhận xóa？"
            okText="Chấp nhận"
            cancelText="Hủy"
            onConfirm={() => {
              console.log(record)
            }}
          >
            <a href="#" className="text-red-600 font-medium">
              Xóa
            </a>
          </Popconfirm>
          {record.approved === 0 && (
            <Popconfirm
              title="Chọn hành động"
              okText="Chấp nhận"
              cancelText="Hủy yêu cầu"
            >
              <a href="#" className="text-gray-600 font-medium">
                Xử lý
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]
  const data = []
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      email: i + 'tranvikhan@gmail.com',
      time: '12:00:05 14/05/2021',
      approved: Math.random() > 0.5 ? 0 : 1,
    })
  }

  const [selectedRowKeys, setSelectedKeys] = React.useState([])
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedKeys,
  }
  const [actionType, setActionType] = React.useState('accept')
  const actionMap = {
    accept: 'Chấp nhận',
    cancel: 'Hủy yêu cầu',
    delete: 'Xóa',
  }
  return (
    <>
      <Space size="middle" className="mb-4">
        <Button icon={<DownloadOutlined />}>Tải về danh sách</Button>
        <Link href="mailto:thviet@ctu.edu.vn,tranvikhan@gmail.com">
          <Button icon={<SendOutlined />}>Gửi email</Button>
        </Link>
      </Space>
      <Table
        scroll={{ x: 1100 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        footer={() => (
          <Space size="middle">
            <Select
              defaultValue={actionType}
              value={actionType}
              onChange={(val) => setActionType(val)}
              style={{ width: 120 }}
            >
              <Option value="accept">{actionMap['accept']}</Option>
              <Option value="cancel">{actionMap['cancel']}</Option>
              <Option value="delete">{actionMap['delete']}</Option>
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
    </>
  )
}