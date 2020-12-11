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
    transe: { name: 'transE', hit1: 0.2122, hit3: 0.2376, hit5: 0.2963, hit10: 0.4302, mr: 36.53, color: '#eb2f96' },
    transh: { name: 'transH', hit1: 0.2090, hit3: 0.2132, hit5: 0.2164, hit10: 0.2386, mr: 74.82, color: '#2f54eb' },
    transd: { name: 'transD', hit1: 0.2127, hit3: 0.2439, hit5: 0.3217, hit10: 0.3841, mr: 34.79, color: '#13c2c2' },
    toruse: { name: 'torusE', hit1: 0.0053, hit3: 0.0254, hit5: 0.0254, hit10: 0.0555, mr: 101.30, color: '#ff4d4f' },
    crosse: { name: 'crossE', hit1: 0.1724, hit3: 0.2422, hit5: 0.2882, hit10: 0.3469, mr: 59.06, color: '#ffa940' }
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