import React from 'react'
import { connect } from 'react-redux'
import { Divider, message } from 'antd'

import { mapStateToProps } from '../../redux'
import ConfigModal from '../../component/modal'
import { getPrediction } from './logics'
import StaticCard from './static-card'

const defaultResult = {}

const TestsetPredictionPage = (props) => {
    const { modelName, dataset, weightDecay } = props
    const [spinning1, setSpinning1] = React.useState(false)
    const [spinning2, setSpinning2] = React.useState(false)

    const [result1, setResult1] = React.useState(defaultResult)
    const [result2, setResult2] = React.useState(defaultResult)

    const [display1, setDisplay1] = React.useState(false)
    const [display2, setDisplay2] = React.useState(false)

    const callback = (setResult, setSpinning, modelName, dataset, weightDecay) => {
        if (!modelName || !dataset) {
            message.error("请填写模型类型与测试数据集")
            return
        }
        setSpinning(true)
        getPrediction(modelName, dataset, weightDecay)
            .then(res => {
                setResult(res.data)
            })
            .finally(() => { setSpinning(false) })
    }

    return (
        <>
            <StaticCard title="测试配置一" result={result1} loading={spinning1} setDisplay={setDisplay1} compare={result2} />
            <Divider />
            <StaticCard title="测试配置二" result={result2} loading={spinning2} setDisplay={setDisplay2} compare={result1} />

            <ConfigModal display={display1} setDisplay={setDisplay1} update={callback.bind(null, setResult1, setSpinning1)} />
            <ConfigModal display={display2} setDisplay={setDisplay2} update={callback.bind(null, setResult2, setSpinning2)} />
        </>
    )
}

export default connect(mapStateToProps)(TestsetPredictionPage)
