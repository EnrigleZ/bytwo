import Axios from 'axios'
import { stringify } from 'qs'
import { getRandom } from '../../utils/array'

export function getRandomStudents(n = 10) {
    return getRandom(STUDENTS, n)
}

export const GetPredictTail = (params) => {
    const ret = Axios.get(`pred-tail?${stringify(params)}`)
    return ret
}

const STUDENTS = [
    { name: 'a01', id: 0 },
    { name: 'b12', id: 1 },
    { name: 'c23', id: 2 },
    { name: 'd34', id: 3 },
    { name: 'e45', id: 4 },
    { name: 'f56', id: 5 },
    { name: 'g67', id: 6 },
    { name: 'h78', id: 7 },
    { name: 'i89', id: 8 },
    { name: 'j910', id: 9 },
    { name: 'k1011', id: 10 },
    { name: 'l1112', id: 11 },
    { name: 'm1213', id: 12 },
    { name: 'n1314', id: 13 },
    { name: 'o1415', id: 14 },
    { name: 'p1516', id: 15 },
    { name: 'q1617', id: 16 },
    { name: 'r1718', id: 17 },
    { name: 's1819', id: 18 },
    { name: 't1920', id: 19 },
    { name: 'u2021', id: 20 },
    { name: 'v2122', id: 21 },
    { name: 'w2223', id: 22 },
    { name: 'x2324', id: 23 },
    { name: 'y2425', id: 24 },
    { name: 'z2526', id: 25 },
    { name: 'a2627', id: 26 },
    { name: 'b2728', id: 27 },
    { name: 'c2829', id: 28 }
]