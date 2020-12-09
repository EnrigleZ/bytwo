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

export const COMPAREMAP = {
    transe: { name: 'TransE', hit1: 19.91, hit5: 24.28, hit10: 29.69, mr: 38.55 },
    transh: { name: 'TransH', hit1: 0.23, hit5: 2.76, hit10: 5.87, mr: 98.09 },
    transd: { name: 'TransD', hit1: 20.37, hit5: 34.18, hit10: 40.39, mr: 36.30 },
    toruse: { name: 'TorusE', hit1: 0.35, hit5: 2.65, hit10: 4.83, mr: 101.48 },
    crosse: { name: 'CrossE', hit1: 19.91, hit5: 37.17, hit10: 45.22, mr: 38.83 },
}

const singleResult2List = (result, model) => {
    const ret = [], a = ['hit1', 'hit5', 'hit10']
    if (!result) return ret

    a.forEach((key, index) => {
        ret.push({ key, value: result[key], model })
    })
    return ret
}

export const result2list = (result) => {
    let ret = []
    for (const model in COMPAREMAP) {
        ret = ret.concat(singleResult2List(COMPAREMAP[model], COMPAREMAP[model].name))
    }
    ret = ret.concat(singleResult2List(result, 'transe+MLP(tanh)'))
    return ret
}