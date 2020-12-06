import Axios from 'axios'

export const PostInferenceStep = (data) => {
    const ret = Axios.post("inference/step/", data)
    return ret
}

const PostInferenceExercise = (data) => {
    const ret = Axios.post("inference/exercise/", data)
    return ret
}

export const getInferenceResult = (model, dataset, decay, values) => {
    const data = {
        model_name: model,
        dataset,
        exercise_list: values.map(x => String(x.id)),
        label_list: values.map(x => x.answer ? "1" : "0"),
        weight_decay: decay,
        step: "49"
    }

    const ret = PostInferenceStep(data)
    return ret
}

export const getInferenceExerciseResult = (model, dataset, decay, values, exercise) => {
    const data = {
        model_name: model,
        dataset,
        exercise_list: values.map(x => String(x.id)),
        label_list: values.map(x => x.answer ? "1" : "0"),
        weight_decay: decay,
        exercise
    }

    const ret = PostInferenceExercise(data)
    return ret
}


export function getConfigs(results) {
    console.log(results)
    const data = results.map((value, index) => {
        return {
            index,
            value
        }
    })
    const config = {
        data,
        height: 400,
        xField: 'index',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
            formatter: ({ value }) => { return parseFloat(value).toFixed(3) },
            autoEllipsis: true,
            autoHide: true,
            rotate: -0.618
        },
    }
    return config
}