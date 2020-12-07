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

function getDatasetOptions(fields = null, modelSelected = null, decaySelected = false) {
    const datasets = fields === null ? DATASETS
        : DATASETS.filter(x => fields.indexOf(x.key) >= 0)
    return datasets.map(({ key, name }) => (
        <Option disabled={!modelSelected || !combinationValid(key, modelSelected, decaySelected)} value={key} key={key}>{ name }</Option>
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

function name2Option(name) {
    return (<Option key={name} value={name}>{name}</Option>)
}

function getOptions(acceptModels) {
    let all = ["PAKT", "SAKT", "UTKT"]
    if (acceptModels) {
        all = all.filter(x => acceptModels.indexOf(x) >= 0)
    }
    return all.map(x => name2Option(x))
}

const ConfigModal = (props) => {
    const { display,
        setDisplay,
        modelName,
        dataset,
        weightDecay = false,
        update,
        datasets,
        acceptModels = null
    } = props
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
                    { getOptions(acceptModels) }
                </Select>
            </Item>
            <Item label="数据集">
                <Select defaultValue={dataset} value={datasetSelected} onChange={onDatasetChange}>
                    { getDatasetOptions(datasets, modelSelected, decaySelected) }
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
