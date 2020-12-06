import React from 'react'
import { Steps, Avatar, Modal, Form, Input, message, Empty } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const { Step } = Steps

const correctStyle = { backgroundColor: '#87d068' }
const wrongStyle = {
    color: '#f56a00', backgroundColor: '#fde3cf'
}

function resizeList(list, n, max) {
    if (!list) list = []
    if (list.length > n) list = list.slice(0, n)
    while (list.length < n) {
        list.push({id: (Math.random() * max) << 0, answer: Math.random() > 0.5})
    }
    return list
}

const ExerciseStep = ({ value, toggle, change }) => {
    const { id, answer } = value
    const ref = React.createRef()
    return (
        <Avatar
            //onClick={toggle}
            onDoubleClick={() => {
                return
                Modal.confirm({
                    content: (
                        <Form>
                            <Form.Item label="请输入题号">
                                <Input ref={ref} />
                            </Form.Item>
                        </Form>
                    ),
                    onOk: () => {
                        const value = ref.current.state.value
                        const newId = parseInt(value)
                        if (Number.isNaN(newId) || value === null || value === undefined) return

                        change(newId)
                    }
                })
            }}
            size={40}
            style={answer ? correctStyle : wrongStyle}
        >{ id }</Avatar>
    )
}

const Correct = <CheckOutlined />
const Wrong = <CloseOutlined />

const ExercistList = (props) => {
    const { values, totalExercises } = props
    const [_, setState] = React.useState(false)

    const toggleAnswerCallback = React.useCallback((index) => {
        const value = values[index]
        value.answer = !value.answer
        setState(c => !c)
        // setValues(c => [...c])
    }, [values])

    const changeIdCallback = React.useCallback((index, newId) => {
        if (newId < 0 || newId >= totalExercises) {
            message.error(`题号${newId}不合法`)
            return
        }
        const value = values[index]
        value.id = newId
        setState(c => !c)
        // setValues(c => [...c])
    }, [values])

    if (!values || values.length === 0) {
        return (<Empty description="请选择实验参数" />)
    }


    return (
        <div className="exercises-area">
            {
                values.map((value, index) => {return (
                    <div key={index} style={{ flex: "1 0 9.9%", paddingBottom: "3px" }}>
                        <ExerciseStep
                            key={index}
                            value={value}
                            toggle={() => { toggleAnswerCallback(index) }}
                            change={(newId) => { changeIdCallback(index, newId) } }
                        />
                    </div>
                )})
            }
        </div>
    )
}

export default ExercistList
