import React from 'react'
import { Steps, Avatar, Modal, Form, Input, message, Empty } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const { Step } = Steps

const correctStyle = { color: '#52c41a', backgroundColor: '#f6ffed' }
const wrongStyle = {
    color: '#fa541c', backgroundColor: '#fff2e8'
}

const ExerciseStep = ({ value, toggle, change, index }) => {
    const { id, answer } = value
    const ref = React.createRef()
    return (
        <Avatar
            onClick={toggle}
            onDoubleClick={() => {
                // return
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
        >{ id }<span className="xindex">{index}</span></Avatar>
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
                            index={index}
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
