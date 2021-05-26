import { Button, Popconfirm, Space, Table, Tag, Input, Select } from 'antd'
import React from 'react'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import ExportCSV from '../../Export/exportCSV'
import moment from 'moment'
const { Option } = Select

export default function AdvisoryTable(props) {
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
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',

      ...getColumnSearchProps('name'),
    },
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
      dataIndex: 'created_at',
      key: 'time',
      render: (text, record) =>
        moment(record.created_at).format('DD-MM-YYYY HH:mm:ss'),
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
              props.onDelete(record.id)
            }}
          >
            <a href="#" className="text-red-600 font-medium">
              Xóa
            </a>
          </Popconfirm>
          {record.approved === 0 && (
            <Popconfirm
              title="Chọn hành động"
              okText="Đã phản hồi"
              cancelText="Tiếp tục đợi"
              onConfirm={() => {
                props.onApproved(record.id)
              }}
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

  const [selectedRowKeys, setSelectedKeys] = React.useState([])
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedKeys,
  }
  const [actionType, setActionType] = React.useState('feedback')
  const actionMap = {
    feedback: 'Đã phản hồi',
    delete: 'Xóa',
  }
  return (
    <>
      <Space size="middle" className="mb-4">
        <ExportCSV
          csvData={props.data ? props.data : []}
          fileName="Danh Sach Nguoi Can Tu Van"
        />
      </Space>
      <Table
        scroll={{ x: 1100 }}
        rowSelection={rowSelection}
        columns={columns}
        rowKey="id"
        dataSource={props.data ? props.data : []}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <span className="font-medium">Nội dung: </span>
              <span style={{ margin: 0 }}>{record.content}</span>
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
              <Option value="feedback">{actionMap['feedback']}</Option>

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
              onConfirm={() => {
                if (actionType === 'feedback') {
                  props.onApprovedAll(selectedRowKeys)
                } else {
                  props.onDeleteAll(selectedRowKeys)
                }
              }}
            >
              <Button disabled={selectedRowKeys.length === 0}>Hành động</Button>
            </Popconfirm>
          </Space>
        )}
      />
    </>
  )
}
