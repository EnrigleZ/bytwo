import Axios from 'axios'
import { stringify } from 'qs'

export const GetCheckStatus = (params) => {
    const ret = Axios.get("check/", params)
    return ret
}

export const CreateExperiment = () => {
    const ret = Axios.get("start/")
    return ret
}


// export const getPrediction = (modelName, dataset, weightDecay) => {
//     const params = {
//         model_name: modelName,
//         dataset,
//         weight_decay: weightDecay
//     }
//     const ret = GetTestsetPredictionAPI(params)
//     return ret
// }
