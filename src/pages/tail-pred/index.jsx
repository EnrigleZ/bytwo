import React from 'react'
import { Button, Select, Card, Form, message, Divider, Spin } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import Graph from 'react-graph-vis'

import { getRandomStudents, GetPredictTail, getGraph, getMockStudentPredict } from './logics'

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}
const options = {
    layout: {
        hierarchical: false,
        randomSeed: 42
    },
    edges: {
        color: "#000000",
        length: 80
    },
    nodes: {
        // physics: false,
        size: 50,
    },
    height: "500px",
    physics: {
        enabled: false
    },
    interaction: {
        // dragView: false
    }
}
const TailPredPage = () => {
    const [students, setStudents] = React.useState([])
    const [selectedStudent, setSelected] = React.useState(null)
    const [graph, setGraph] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [text, setText] = React.useState('')
    // const [temp, setTemp] = React.useState(0)

    const refreshCb = React.useCallback(() => {
        const randomStudents = getRandomStudents()
        setStudents(randomStudents)
        setSelected(randomStudents[0])
    }, [setStudents, setSelected, getRandomStudents])

    React.useEffect(refreshCb, [refreshCb])

    return (
        <>
            <Card title="选课预测">
                <Form {...formLayout}>
                    <Form.Item label={<div>
                        <Button
                            shape="circle"
                            icon={<RedoOutlined />}
                            size="small"
                            onClick={() => { refreshCb() }}
                        />
                        <span style={{ marginLeft: '10px' }}>选择学生</span>
                    </div>}>
                        <Select value={selectedStudent} onChange={value => { setSelected(value) }}>
                            {students.map((value) => {
                                return (<Select.Option value={value} key={value}>{value}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!selectedStudent}
                            onClick={() => {
                                if (selectedStudent === null) {
                                    message.error("请选择一名学生")
                                    return
                                }
                                const params = { id: selectedStudent }
                                setLoading(true)
                                GetPredictTail(params).then(res => {
                                    const g = getGraph(res.data.name, res.data.pred, res.data.real)
                                    setGraph(g)
                                    setText(res.data.real.join('、'))
                                }).finally(() => {
                                    setLoading(false)
                                })
                            }}
                        >提交</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Divider />
            <Card hidden={graph === null} title="预测结果展示">
                <Spin spinning={loading}>
                    <b>实际选课</b>
                    <div>
                        {text}
                    </div>
                    {graph && (<Graph key={`${selectedStudent}${loading}`} graph={graph} options={options} />)}
                </Spin>
            </Card>
        </>)
}

export default TailPredPage
