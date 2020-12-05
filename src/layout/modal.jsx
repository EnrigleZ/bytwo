import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Tooltip, Select, Checkbox } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { mapStateToProps, mapDispatchToProps } from '../redux'
import ConfigModal from '../component/modal'

const { Item } = Form
const { Option } = Select

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigModal)
