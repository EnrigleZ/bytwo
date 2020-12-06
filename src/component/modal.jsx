import React from 'react'
import { Modal, Form, Tooltip, Select, Checkbox, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { DATASETS } from '../misc/dataset'

const { Item } = Form
const { Option } = Select

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

function getDatasetOptions(fields = null) {
    const datasets = fields === null ? DATASETS
        : DATASETS.filter(x => fields.indexOf(x.key) >= 0)

    console.log(datasets)
    return datasets.map(({ key, name }) => (
        <Option value={key} key={key}>{ name }</Option>
    ))
}

function combinationValid(dataset, modelName, decay) {
    console.log(dataset, modelName, decay)
    if (modelName === "PAKT") {
        return !decay || dataset.indexOf('_') >= 0
    }
    if (modelName === "UTKT") {
        return dataset.indexOf('_') >= 0
    }
    if (modelName === "SAKT") {
        return dataset.indexOf('_') < 0
    }
    return false
}

const ConfigModal = (props) => {
    const { display, setDisplay, modelName, dataset, weightDecay = false, update, datasets } = props
    const [datasetSelected, setDataset] = React.useState(dataset)
    const [modelSelected, setModel] = React.useState(modelName)
    const [decaySelected, setDecay] = React.useState(weightDecay)

    const onOk = () => {
        if (!combinationValid(datasetSelected, modelSelected, decaySelected)) {
            message.error("模型不支持该数据集")
            return
        }
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
                    <Option value="UTKT">UTKT</Option>
                </Select>
            </Item>
            <Item label="数据集">
                <Select defaultValue={dataset} value={datasetSelected} onChange={onDatasetChange}>
                    { getDatasetOptions(datasets) }
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
