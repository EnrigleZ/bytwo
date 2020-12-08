export function getRandom(array, n = 10) {
    let len = array.length,
        result = new Array(n),
        taken = new Array(len)

    if (n < 0 || n >= len) {
        throw new RangeError("getRandom: invalid number.")
    }

    while (n--) {
        const index = (Math.random() * len) << 0
        result[n] = (index in taken) ? array[taken[index]] : array[index]
        len -= 1
        taken[index] = len in taken ? taken[len] : len
    }

    return result
}
