import Axios from 'axios'
import { stringify } from 'qs'
import { getRandom } from '../../utils/array'

export function getRandomStudents(n = 10) {
    return getRandom(BETTER, n - 2).concat(getRandom(WORSE, 2))
}

export const GetPredictTail = (params) => {
    const ret = Axios.get(`pred-tail/${params.id}/`)
    return ret
}

const mockResult = {
    "name": "我叫大熊猫",
    "pred": [
        "Python语言程序设计",
        "计算机编码与密码学",
        "人工智能实践：Tensorflow笔记",
        "数据结构",
        "数据库系统概论（基础篇）",
        "面向对象程序设计??Java语言",
        "Python网络爬虫与信息提取",
        "算法设计与问题求解",
        "C语言程序设计",
        "大学计算机"
    ],
    "real": [
        "Python语言程序设计",
        "人工智能实践：Tensorflow笔记"
    ]
}

const BETTER = [
    '纸浅要躬行',
    '18计算机本科1班-高磊',
    '要努力不要平庸',
    '不一样-都一样',
    '计算机1704-方应明',
    '稻根腾鹿',
    'motoe680i',
    '山鲁佐德mooc2',
    '生活是一面镜子',
    '619784008163com',
]

const WORSE = [
    '金露201610800409zjut',
    '太执着而已mooc15',
    '周国维',
    '30沈阳',
    'FAFU3175302023',
    '小白小白小白小白小白了白',
    'iluzongyuan',
    '剑圣无极',
    '黄鑫要加油学啊',
    '我爱学习学习爱我咯',
]

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

const successStyle = {
    color: {
        background: '#d9f7be',
        border: '#7cb305'
    },
}
const failStyle = {
    color: {
        background: '#ffccc7',
        border: '#610b00'
    }
}

export function getGraph(name, data, trueData) {
    if (!data || !trueData) return {}
    const nodes = data.map((value, index) => {
        const basicStyle = trueData.indexOf(value) >= 0 ? successStyle : failStyle
        return { ...basicStyle, id: value, label: value, title: value, shape: 'box', margin: 10, chosen: false }
    })
    const graph = {
        nodes: nodes.concat({ id: 'student', label: name, shape: 'circle' }),
        edges: data.map(value => ({ from: 'student', to: value }))
    }
    return graph
}

export async function getMockStudentPredict() {
    return {
        data: mockResult
    }
}