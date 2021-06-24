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
import moment from 'moment'
const { Option } = Select

export default function ProjectShowTable(props) {
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
      title: 'Ảnh dự án',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={'/' + image}
          alt="famer"
          className="object-cover h-14 w-20 rounded"
        />
      ),
    },
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ...getColumnSearchProps('name', 'tên dự án'),
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
      title: 'Người viết',
      dataIndex: 'writer_name',
      key: 'writer_name',
      ...getColumnSearchProps('writer_name', 'người viết'),
    },
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => moment(created_at).format('HH:mm DD-MM-YYYY'),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id', 'mã dự án'),
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
              <Menu.Item
                icon={<EditOutlined />}
                onClick={() => {
                  props.onEdit(record.id)
                }}
              >
                Chỉnh sửa
              </Menu.Item>

              {record.approved === 0 && props.role && props.role != 'user' && (
                <Menu.Item icon={<PlusOutlined />}>
                  <Popconfirm
                    title="Chọn hành động"
                    okText="Đã duyệt"
                    cancelText="Tiếp tục đợi"
                    onConfirm={() => {
                      props.onApproved(record.id)
                    }}
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
                    props.onHide(record.id)
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
  React.useEffect(() => {
    if (props.role && props.role === 'user') setActionType('hide')
  }, [props.role])
  return (
    <Table
      scroll={{ x: 1100 }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={props.data}
      rowKey="id"
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
            {props.role && props.role != 'user' && (
              <Option value="approved">{actionMap['approved']}</Option>
            )}

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
            onConfirm={() => {
              if (actionType === 'approved') {
                props.onApprovedAll(selectedRowKeys)
              } else {
                props.onHideAll(selectedRowKeys)
              }
            }}
          >
            <Button disabled={selectedRowKeys.length === 0}>Hành động</Button>
          </Popconfirm>
        </Space>
      )}
    />
  )
}
