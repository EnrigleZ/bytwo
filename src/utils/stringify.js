export function toPercentage(num, digits = 2) {
    let n = parseFloat(num)
    if (Number.isNaN(n)) return '-'
    n = (n * 100).toFixed(digits)
    return `${n}%`
}
