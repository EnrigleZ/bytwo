import React from 'react'
import { Divider, Descriptions, Card, Button, Tag } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import { GetCheckStatus } from './logics'
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

    const [result1, setResult1] = React.useState(defaultResult)
    const [result2, setResult2] = React.useState(defaultResult)

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
                    onClick={() => {}}
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
            </Card>
            <Divider />
            <StaticCard title="测试配置一" result={result1} loading={spinning1} compare={result2} />
            <Divider />
            <StaticCard title="测试配置二" result={result2} loading={spinning2} compare={result1} />

        </>
    )
}

export default TestsetPredictionPage
