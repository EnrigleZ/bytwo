import Axios from 'axios'

export const PostInferenceStep = (data) => {
    const ret = Axios.post("inference/step/", data)
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