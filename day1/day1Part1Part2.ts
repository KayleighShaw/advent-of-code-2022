import * as fs from 'fs'

const getData = async () => {
    const data = await fs.readFileSync('./testFiles/giantTestFile.txt', 'utf8');
    dataToSumArray(data)
}

const getTopThree = (array: number[]) => {
    let sortedArray = array.sort((a, b) => (a - b)).reverse()
    const sumOfTopThree = sortedArray[0] + sortedArray[1] + sortedArray[2]
    console.log(sumOfTopThree)
}

const dataToSumArray = (data: any) => {
    const array = [...data.split("\n")]
    let sumArray: number[] = []
    let sum: number = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "") {
            sumArray.push(sum)
            sum = 0
        } else {
            let number = Number(array[i])
            sum += number
        }
    }
    const part1 = Math.max(...sumArray)
    console.log(part1)
    getTopThree(sumArray)
}

getData()