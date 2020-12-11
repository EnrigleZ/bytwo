import Axios from 'axios'
import { stringify } from 'qs'
import { getRandom } from '../../utils/array'

export function getRandomStudents(n = 10) {
    return getRandom(BETTER, n - 2).concat(getRandom(WORSE, 2))
}

export const GetPredictTail = (params) => {
    const ret = Axios.get(`pred/${params.id}`)
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
    'EmpZH',
    'SiegmundWang',
    '不一样-都一样',
    '我叫大熊猫',
    'wang19931031yun',
    'chudawen126com',
    'Peterrrrr',
    'chuichuifeng',
    '沉默的TOM',
    'mooc1479963441304',
    'Shouming-White',
    '不过四级不改名3x',
    '1156391296qqcom',
    'hit11111111',
    '王先球-20172747-中南林业科技大学',
    'mooc15917392395277885',
    '杨YYYXY',
    '不将就mooc1459408429467',
    'JOU信息1712015120673侯越',
    'mooc1519783391765',
    'mooc39838527886922745',
    'mooc1467218821940',
    'mooc1488283821586',
    'mooc1494332971733',
    'mooc1520171639103',
    '计科1701王水涛',
    '梦游甜茶',
    'XE10',
    'a18720508182',
    '慕渐鸿',
    '天天打鱼',
    '小黄鸭咩咩咩',
    'jobgy',
    'mooc90021402934989114',
    'zhanshen123_happy',
    'mooc15735159402',
    'mooc1514424249434',
    'Tyz22',
    'madjia163163com',
    '人间四月天mooc60',
    'mooc1476583210634',
    'joozenykt1452521716464',
    '北顾-岛城',
    'mooc79858265281562620',
    'ecore2020',
    '一共五个字ykt1510591421760',
]

const WORSE = [
    '孤独的菜鸟',
    '江安神藕',
    'mooc65288852375184946',
    '秋叶原的新宿',
    '小狼狗85',
    '要努力不要平庸',
    'mooc2939651889684125',
    'mooc51333243860209267',
    'beterliu',
    'ywxgong163com',
    '信管1705-2017012207-弓子鑫',
    'mooc74815357675854164',
    'NovakChan',
    'meikerwang',
    'NoobIsMyNature',
    'FAFU3175302023',
    'mooc1517654456484',
    'mju3171106113z',
    'mooc_sword',
    'xiao9di163com',
    'WUSTCSC17002025',
    '赖钦祥',
    '17秋本叶成林',
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