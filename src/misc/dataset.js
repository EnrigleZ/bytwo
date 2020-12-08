import { DEFAULT_CASE, CASE_2018_S_1, CASE_2018_W_1, CASE_2019_W_1, CASE_2019_S_1 } from './default-cases'

export const DATASETS = [
    { key: "assist2009", name: "ASSIST2009", cases: DEFAULT_CASE, totalExercises: 124, base: 0 },
    { key: "assist2015", name: "ASSIST2015", cases: DEFAULT_CASE, totalExercises: 100, base: 0 },
    { key: "statics", name: "Statics2011", cases: DEFAULT_CASE, totalExercises: 1224, base: 0 },
    { key: "synthetic", name: "Simulated-5", cases: DEFAULT_CASE, totalExercises: 51, base: 0 },
    { key: "2018_s", name: "FCS-2018S", cases: CASE_2018_S_1, totalExercises: 61, base: 0 },
    { key: "2018_w", name: "FCS-2018A", cases: CASE_2018_W_1, totalExercises: 83, base: 61 },
    { key: "2019_s", name: "FCS-2019S", cases: CASE_2019_S_1, totalExercises: 74, base: 61 + 83 },
    { key: "2019_w", name: "FCS-2019A", cases: CASE_2019_W_1, totalExercises: 114, base: 61 + 83 + 74 }
]

export function getDatasetInfo(key) {
    const [dataset] = DATASETS.filter(x => x.key === key)
    if (!dataset) return null
    return {...dataset}
}