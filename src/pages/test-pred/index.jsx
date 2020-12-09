import React from 'react'
import { Divider, Descriptions, Card, Button, Tag, Select, Form, message } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import { GetCheckStatus, CreateExperiment, COMPAREMAP } from './logics'
import StaticCard from './static-card'

const defaultResult = {}

const tagMap = {
    notstarted: ["pink", "未开始"],
    running: ["blue", "运行中"],
    finished: ["green", "已完成"],
    undefined: ['', '-']
}

const TestsetPredictionPage = (props) => {
    const [status, setStatus] = React.useState(undefined)
    const [result, setResult] = React.useState(defaultResult)
    const [compareKey, setCompareKey] = React.useState('transe')
    const [intv, setIntv] = React.useState(null)

    const checkStatus = React.useCallback((intv) => {
        GetCheckStatus().then(res => {
            const { status } = res.data
            setStatus(status)
            if (status !== 'running') {
                clearInterval(intv)
                if (status === "finished") {
                    setResult(res.data)
                }
            }
        })
    }, [setStatus])

    const startLoop = () => {
        console.log("Start loop")
        if (intv) clearInterval(intv)
        
        checkStatus()
        const interval = setInterval(() => {
            checkStatus(interval)
        }, 1000)
        setIntv(interval)
        return interval
    }


    React.useEffect(() => {
        const interval = startLoop()
        
        return () => {
            clearInterval(interval)
            setIntv(null)
        }
    }, [])
    
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
                    onClick={() => {
                        CreateExperiment()
                            .then(() => { message.success("提交实验成功")})
                            .catch(() => { message.error("提交实验失败") })
                        startLoop()
                    }}
                    disabled={status === 'running'}
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
            <StaticCard title="TransE+MLP(tanh)" result={result} loading={status === "running"} compare={COMPAREMAP[compareKey]} />
            <Divider />
            <StaticCard title={COMPAREMAP[compareKey].name} result={COMPAREMAP[compareKey]} compare={result} />

        </>
    )
}

export default TestsetPredictionPage
