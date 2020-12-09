import React from 'react'
import { Divider, Descriptions, Card, Button, Tag, Select, Form } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import { GetCheckStatus, COMPAREMAP } from './logics'
import StaticCard from './static-card'

const defaultResult = {}

const tagMap = {
    notstarted: ["pink", "未开始"],
    running: ["blue", "运行中"],
    finished: ["green", "已完成"]
}

const TestsetPredictionPage = (props) => {
    const [spinning1, setSpinning1] = React.useState(false)
    const [spinning2, setSpinning2] = React.useState(false)

    const [status, setStatus] = React.useState('notstarted')

    const [result, setResult] = React.useState(defaultResult)

    const [compareKey, setCompareKey] = React.useState('transe')

    const checkStatus = React.useCallback(() => {
        GetCheckStatus().then(res => {
            const { status } = res.data
            setStatus(status)
        })
    }, [setStatus])

    React.useEffect(() => {
        checkStatus()
    }, [checkStatus])
    const [color, tagname] = tagMap[status]

    return (
        <>
            <Card
                title={(<div>
                    <span style={{ marginRight: '15px' }}>实验状态</span>
                    <Button shape="circle" icon={<RedoOutlined />} onClick={() => { checkStatus() }} />
                </div>)}
                extra={(<Button
                    type="primary"
                    onClick={() => { }}
                    disabled={status !== 'notstarted'}
                >
                    开始实验
                </Button>)}
            >
                <Descriptions>
                    <Descriptions.Item label="模型名称">transE+MLP(tanh)</Descriptions.Item>
                    <Descriptions.Item label="数据样本数">13257</Descriptions.Item>
                    <Descriptions.Item label="实验状态">
                        <Tag color={color}>{tagname}</Tag>
                    </Descriptions.Item>
                </Descriptions>
                <Form>
                    <Form.Item label="对照模型">
                        <Select value={compareKey} onChange={setCompareKey} style={{ width: '200px' }}>
                            <Select.Option key="transe">Transe</Select.Option>
                            <Select.Option key="transh">Transh</Select.Option>
                            <Select.Option key="transd">Transd</Select.Option>
                            <Select.Option key="toruse">Toruse</Select.Option>
                            <Select.Option key="crosse">Crosse</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
            <Divider />
            <StaticCard title="测试配置一" result={result} loading={spinning1} compare={COMPAREMAP[compareKey]} />
            <Divider />
            <StaticCard title={COMPAREMAP[compareKey].name} result={COMPAREMAP[compareKey]} compare={COMPAREMAP[compareKey]} />

        </>
    )
}

export default TestsetPredictionPage
