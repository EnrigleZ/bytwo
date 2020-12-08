import React from 'react'
import { Button, Col, Card, Row, Statistic, Descriptions, Divider, Spin } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { toPercentage } from '../../utils/stringify'

const propInc = {
    valueStyle: {color: '#cf1322'},
    prefix: (<ArrowUpOutlined />)
}

const propDec = {
    valueStyle: { color: '#3f8600'},
    prefix: (<ArrowDownOutlined />)
}

const StatComp = ({ value, compare, title }) => {
    const delta = parseFloat(value) - parseFloat(compare)

    const valueStyle = !delta ? {} : delta > 0 ? propInc : propDec
    return (<Statistic {...valueStyle} title={title} value={toPercentage(value)} />)
}

export default (props) => {
    const { result, loading, title, compare } = props
    const extra = (<Button
        type="primary"
        onClick={() => {}}
    >
        一个按钮
    </Button>)

    let { auc, f1, precision, recall } = result
    const { model_name, n_exercises, n_students, average_exercise, dataset } = result

    let { auc: a_, precision: p_, f1: f_, recall: r_ } = compare

    return (
        <Spin spinning={loading} tip="模型计算中">
            <Card loading={loading} title={title} extra={extra}>
                <Descriptions>
                    <Descriptions.Item label="模型">{ model_name }</Descriptions.Item>
                    <Descriptions.Item label="数据集">{ dataset }</Descriptions.Item>
                    <Descriptions.Item label="平均交互数">{ average_exercise }</Descriptions.Item>
                    <Descriptions.Item label="学生数">{ n_students }</Descriptions.Item>
                    <Descriptions.Item label="习题数">{ n_exercises }</Descriptions.Item>
                </Descriptions>
                <Divider>
                    <span style={{ color: "#999", fontStyle: "italic" }}>测试结果</span>
                </Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <StatComp title="AUC" value={auc} compare={a_} />
                    </Col>
                    <Col span={12}>
                        <StatComp title="F1" value={f1} compare={f_} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <StatComp title="Precision" value={precision} compare={p_} />
                    </Col>
                    <Col span={12}>
                        <StatComp title="Recall" value={recall} compare={r_} />
                    </Col>
                </Row>
            </Card>
        </Spin>
    )
}
