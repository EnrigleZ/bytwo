import React from 'react'
import { Divider, Descriptions, Card, Button, Tag, Select, Form, message, Progress } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import { Line } from '@ant-design/charts'

import { GetCheckStatus, CreateExperiment, COMPAREMAP, result2list } from './logics'
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
    const [list, setList] = React.useState(result2list(null))
    const [progr, setProgr] = React.useState(0)
    const [color, tagname] = tagMap[status]

    const checkStatus = React.useCallback((intv) => {
        GetCheckStatus().then(res => {
            const { status, progress } = res.data
            setStatus(status)
            if (status !== 'running') {
                clearInterval(intv)
                if (status === "finished") {
                    const {results} = res.data
                    setResult(results)
                    const ls = result2list(results)
                    setList(ls)
                }
            } else {
                // 注意null progress
                const value = Number.parseInt(progress)
                if (!Number.isNaN(value)) {
                    setProgr(value)
                }
            }
        })
    }, [setStatus])

    const startLoop = () => {
        if (intv) clearInterval(intv)
        
        checkStatus()
        const interval = setInterval(() => {
            checkStatus(interval)
        }, 3000)
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
                            .then(() => {
                                message.success("提交实验成功")
                                setResult(defaultResult)
                                setStatus("running")
                            })
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
                    {/* <Descriptions.Item label="数据样本数">13257</Descriptions.Item> */}
                    <Descriptions.Item label="实验状态">
                        <Tag color={color}>{tagname}</Tag>
                    </Descriptions.Item>
                </Descriptions>
                <Form>
                    <Form.Item label="对照模型">
                        <Select value={compareKey} onChange={setCompareKey} style={{ width: '200px' }}>
                            <Select.Option key="transe">transE</Select.Option>
                            <Select.Option key="transh">transH</Select.Option>
                            <Select.Option key="transd">transD</Select.Option>
                            <Select.Option key="toruse">torusE</Select.Option>
                            <Select.Option key="crosse">crossE</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                { status === "running" && (<Progress percent={progr} />)}
            </Card>
            <Divider />
            <StaticCard title="transE+MLP(tanh)" result={result} loading={status === "running"} compare={COMPAREMAP[compareKey]} />
            <Divider />
            <StaticCard title={COMPAREMAP[compareKey].name} result={COMPAREMAP[compareKey]} compare={result} />
            <Divider />
            <Card title="性能比较">
                <Line seriesField="model" autoFit={true} data={list} yAxis={{
                    label: {
                        formatter: (v) => {
                            return (v * 100).toFixed(2) + '%'
                        },
                        style: {
                            fontSize: 16
                        }
                    }
                }}
                xAxis={{label: {style: {fontSize: 14}}}}
                legend={{
                    itemName: {
                        style: {
                            fontSize: 20
                        }
                    }
                }}
                xField='key' yField='value' point={{size: 5, shape: 'diamond'}} />
            </Card>
        </>
    )
}

export default TestsetPredictionPage
