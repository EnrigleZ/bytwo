import React from 'react'
import { Col, Row, Slider, Steps, InputNumber, Button, Card, Divider, Statistic } from 'antd'

import ConfigModal from '../../component/modal'
import { getDatasetInfo } from '../../misc/dataset'
import ExerciseList from './exercise-list'

const InteractArea = (props) => {
    const { submit } = props

    const [display, setDisplay] = React.useState(false)
    const [dataset, setDataset] = React.useState(null)
    const [model, setModel] = React.useState(null)
    const [decay, setDecay] = React.useState(null)
    const [values, setValues] = React.useState([])
    const [n, setN] = React.useState(0)

    function update(m, d, dec) {
        setModel(m)
        setDecay(dec)

        const datasetInfo = getDatasetInfo(d)
        if (datasetInfo) {
            setDataset(datasetInfo)
            const { cases, totalExercises } = datasetInfo
            setValues(cases.map(x => ({ ...x })))
            setN(totalExercises)
        }
    }

    const statisticArea = dataset && (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="数据集" value={dataset.name} />
                </Col>
                <Col span={12}>
                    <Statistic title="总习题数" value={n} />
                </Col>
            </Row>
            <Divider />
        </>)

    return (
        <Card
            title="样例设置"
            extra={(<Button type="primary" onClick={() => { setDisplay(true) }}>配置实验参数</Button>)}
        >
            <ExerciseList values={values} totalExercises={n} />
            <ConfigModal
                display={display}
                setDisplay={setDisplay}
                update={update}
            />
            <Divider />
            { statisticArea }
            <Button hidden={!dataset} type="primary" onClick={() => { submit(model, dataset.key, decay, values) }}>开始</Button>
        </Card>
    )
}

export default InteractArea
