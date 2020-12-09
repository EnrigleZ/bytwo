import React from 'react'
import { Button, Col, Card, Row, Statistic, Descriptions, Divider, Spin } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { toPercentage } from '../../utils/stringify'

const propInc = {
    valueStyle: { color: '#cf1322' },
    prefix: (<ArrowUpOutlined />)
}

const propDec = {
    valueStyle: { color: '#3f8600' },
    prefix: (<ArrowDownOutlined />)
}

const StatComp = ({ value, compare, title, percentage, negative }) => {
    const delta = parseFloat(value) - parseFloat(compare)

    const valueStyle = !delta ? {} : delta > 0 ^ negative ? propInc : propDec
    const valueStr = '' + value + (percentage ? '%' : '')
    let extra = {}
    if (negative) extra.prefix = null
    return (<Statistic {...valueStyle} title={title} value={value === undefined ? '-' : valueStr} {...extra}/>)
}

export default (props) => {
    const { result, loading, title, compare } = props

    let { hit1, hit3, hit5, hit10, mr } = result
    const { model_name, n_exercises, n_students, average_exercise, dataset } = result

    let { hit1: h1, hit3: h3, hit5: h5, hit10: h10, mr: m_ } = compare

    return (
        <Spin spinning={!!loading} tip="模型计算中">
            <Card title={title}>
                {/* <Descriptions>
                    <Descriptions.Item label="模型">{ model_name }</Descriptions.Item>
                    <Descriptions.Item label="数据集">{ dataset }</Descriptions.Item>
                    <Descriptions.Item label="平均交互数">{ average_exercise }</Descriptions.Item>
                    <Descriptions.Item label="学生数">{ n_students }</Descriptions.Item>
                    <Descriptions.Item label="习题数">{ n_exercises }</Descriptions.Item>
                </Descriptions>
                <Divider>
                    <span style={{ color: "#999", fontStyle: "italic" }}>测试结果</span>
                </Divider> */}
                <Row gutter={16}>
                    <Col span={4}>
                        <StatComp percentage title="Hit@1" value={hit1} compare={h1} />
                    </Col>
                    <Col span={4}>
                        <StatComp percentage title="Hit@3" value={hit3} compare={h3} />
                    </Col>
                    <Col span={4}>
                        <StatComp percentage title="Hit@5" value={hit5} compare={h5} />
                    </Col>
                    <Col span={4}>
                        <StatComp percentage title="Hit@10" value={hit10} compare={h10} />
                    </Col>
                    <Col span={4}>
                        <StatComp negative title="MR" value={mr} compare={m_} />
                    </Col>
                </Row>
            </Card>
        </Spin>
    )
}
