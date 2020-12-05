import Axios from 'axios'
import { stringify } from 'qs'

const GetTestsetPredictionAPI = (params) => {
    const ret = Axios.post("pred/", params)
    return ret
}

export const getPrediction = (modelName, dataset, weightDecay) => {
    const params = {
        model_name: modelName,
        dataset,
        weight_decay: weightDecay
    }
    const ret = GetTestsetPredictionAPI(params)
    return ret
}
