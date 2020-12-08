import React from 'react'
import { Button, Select, Card, Form, message } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import { getRandomStudents, GetPredictTail } from './logics'

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const TailPredPage = () => {
    const [students, setStudents] = React.useState([])
    const [selectedStudent, setSelected] = React.useState(null)

    const refreshCb = React.useCallback(() => {
        const randomStudents = getRandomStudents()
        setStudents(randomStudents)
        setSelected(randomStudents[0].id)
    }, [setStudents, setSelected, getRandomStudents])

    React.useEffect(refreshCb, [refreshCb])

    return (<Card title="尾实体预测">
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
                    {students.map(({ name, id }) => {
                        return (<Select.Option value={id} key={id}>{name}</Select.Option>)
                    })}
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                        if (selectedStudent === null) {
                            message.error("请选择一名学生")
                            return
                        }
                        const params = { id: selectedStudent }
                        GetPredictTail(params).then(res => {
                            console.log(res)
                        })
                    }}
                >提交</Button>
           </Form.Item>
        </Form>
    </Card>)
}

export default TailPredPage
