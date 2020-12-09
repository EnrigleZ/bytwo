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
    transe: { name: 'transE', hit1: 19.91 / 100, hit3: 0.42, hit5: 24.28 / 100, hit10: 29.69 / 100, mr: 38.55 },
    transh: { name: 'transH', hit1: 0.23 / 100, hit3: 0.42, hit5: 2.76 / 100, hit10: 5.87 / 100, mr: 98.09 },
    transd: { name: 'transD', hit1: 20.37 / 100, hit3: 0.42, hit5: 34.18 / 100, hit10: 40.39 / 100, mr: 36.30 },
    toruse: { name: 'torusE', hit1: 0.35 / 100, hit3: 0.42, hit5: 2.65 / 100, hit10: 4.83 / 100, mr: 101.48 },
    crosse: { name: 'crossE', hit1: 19.91 / 100, hit3: 0.42, hit5: 37.17 / 100, hit10: 45.22 / 100, mr: 38.83 },
}

const singleResult2List = (result, model) => {
    const ret = [], a = ['hit1', 'hit3', 'hit5', 'hit10']
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
    ret = ret.concat(singleResult2List(result, 'transE+MLP(tanh)'))
    return ret
}