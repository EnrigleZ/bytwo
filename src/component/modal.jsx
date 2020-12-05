import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Tooltip, Select, Checkbox } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { mapStateToProps, mapDispatchToProps } from '../redux'

const { Item } = Form
const { Option } = Select

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const ConfigModal = (props) => {
    const { display, setDisplay, modelName, dataset, weightDecay, update } = props
    const [datasetSelected, setDataset] = React.useState(dataset)
    const [modelSelected, setModel] = React.useState(modelName)
    const [decaySelected, setDecay] = React.useState(weightDecay)

    const onOk = () => {
        setDisplay(false)
        update(modelSelected, datasetSelected, decaySelected)
    }

    const onCancel = () => {
        setDisplay(false)
        setDataset(dataset)
        setModel(modelName)
        setDecay(weightDecay)
    }

    const onDatasetChange = React.useCallback((e) => {
        setDataset(e)
    }, [setDataset])

    const onModelChange = React.useCallback(e => {
        setModel(e)
    }, [setModel])

    const onDecayChange = React.useCallback(e => {
        console.log(e)
        setDecay(e.target.checked)
    }, [setDecay])

    return (<Modal
        visible={display}
        okText="确认"
        onOk={onOk}
        cancelText="取消"
        onCancel={onCancel}
        title="请选择配置"
    >
        <Form {...formLayout}>
            <Item label="模型">
                <Select defaultValue={modelName} value={modelSelected} onChange={onModelChange}>
                    <Option value="PAKT">PAKT</Option>
                    <Option value="SAKT">SAKT</Option>
                </Select>
            </Item>
            <Item label="数据集">
                <Select defaultValue={dataset} value={datasetSelected} onChange={onDatasetChange}>
                    <Option value="assist2009">Assist 2009</Option>
                    <Option value="assist2015">Assist 2015</Option>
                </Select>
            </Item>
            <Item label={<span>启用权重衰减&nbsp;
                    <Tooltip title="正则化">
                    <QuestionCircleOutlined />
                </Tooltip>
            </span>} hidden={modelSelected !== "PAKT"}>
                <Checkbox onChange={onDecayChange} checked={decaySelected} />
            </Item>
        </Form>
    </Modal>)
}

export default ConfigModal
