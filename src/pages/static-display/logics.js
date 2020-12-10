export function getSize(image) {
    if (!image) return [0, 0]
    const { width, height } = image.getBoundingClientRect()
    return [ width, height ]
}

export const TEXTS = [
    { index: 0, title: '', description: ''},
    { index: 1, title: '', description: ''},
    { index: 2, title: '感知沉浸性正向作用于教师评价', description: '使用道具增强学生在课堂中的专注度，寓教于乐，贯彻启发式、互动式、探究式的课程教学方式，有助于学生对教师评价的提升。'},
    { index: 3, title: '', description: ''},
    { index: 4, title: '团队合作对学生的对课程的感知易用性产生强烈的影响', description: '互帮互助的团队合作形式可以降低学生对课程的自我恐惧，便于学生开展学习，证实了本课程的课程组织形式设计合理性。'},
    { index: 5, title: '', description: ''},
    { index: 6, title: '感知易用性对感知有用性的标准化估计值为负数', description: '应鼓励老师设计一些有挑战的课程内容。'},
    { index: 7, title: '', description: ''},
    { index: 8, title: '', description: ''},
    { index: 9, title: '', description: ''},
]