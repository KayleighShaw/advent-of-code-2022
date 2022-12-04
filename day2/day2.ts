import * as fs from 'fs'

const enum PlayerMove {
    'ROCK' = 'X',
    'PAPER' = 'Y',
    'SCISSORS' = 'Z'
}

const enum OpponentMove {
    'ROCK' = 'A',
    'PAPER' = 'B',
    'SCISSORS' = 'C'
}

const enum Outcome {
    'LOSE' = 'X',
    'DRAW' = 'Y',
    'WIN' = 'Z'
}

const getData = async () => {
    const data = await fs.readFileSync('./testFiles/giantTestFile.txt', 'utf8');
    console.log(data)
    dataToArray(data)
}

const dataToArray = (data: any) => {
    const array = [...data.split("\n")]
    calculateTotalScore(array)
}

const getMoveBasedOnOutcome = (opponentMove: string, outcome: string) => {
    console.log(`The opponent is playing ${opponentMove}`)
    console.log(`The desired outcome is ${outcome}`)
    switch(opponentMove) {
        case (OpponentMove.PAPER): {
            if (outcome === Outcome.LOSE) {
                return PlayerMove.ROCK
            }
            if (outcome === Outcome.DRAW) {
                return PlayerMove.PAPER
            }
            if (outcome === Outcome.WIN) {
                return PlayerMove.SCISSORS
            }
        }
        case (OpponentMove.ROCK): {
            if (outcome === Outcome.LOSE) {
                return PlayerMove.SCISSORS
            }
            if (outcome === Outcome.DRAW) {
                return PlayerMove.ROCK
            }
            if (outcome === Outcome.WIN) {
                return PlayerMove.PAPER
            }
        }
        case (OpponentMove.SCISSORS): {
            if (outcome === Outcome.LOSE) {
                return PlayerMove.PAPER
            }
            if (outcome === Outcome.DRAW) {
                return PlayerMove.SCISSORS
            }
            if (outcome === Outcome.WIN) {
                return PlayerMove.ROCK
            }
        }
        default: {
            console.log(`Invalid move with opponent move of ${opponentMove}`)
            return PlayerMove.PAPER
        }
    }
}

const getScoreBasedOnGameResult = (playerMove: string, opponentMove: string) => {
    console.log(`Player move is ${playerMove}`)
    console.log(`Opponent move is ${opponentMove}`)

    switch(playerMove) {
        case PlayerMove.ROCK: {
            if (opponentMove === OpponentMove.ROCK) {
                return 3
            }
            if (opponentMove === OpponentMove.PAPER) {
                return 0
            }
            if (opponentMove === OpponentMove.SCISSORS) {
                return 6
            }
        }
        case PlayerMove.PAPER: {
            if (opponentMove === OpponentMove.ROCK) {
                return 6
            }
            if (opponentMove === OpponentMove.PAPER) {
                return 3
            }
            if (opponentMove === OpponentMove.SCISSORS) {
                return 0
            }
        }
        case PlayerMove.SCISSORS: {
            if (opponentMove === OpponentMove.ROCK) {
                return 0
            }
            if (opponentMove === OpponentMove.PAPER) {
                return 6
            }
            if (opponentMove === OpponentMove.SCISSORS) {
                return 3
            }
        }
        default: {
            console.log(`Invalid move with ${playerMove}`)
            return 0
        }
    }
}

const getScoreBasedOnMove = (letterString: string) => {
    switch(letterString) {
        case PlayerMove.ROCK:
            return 1
        case PlayerMove.PAPER:
            return 2
        case PlayerMove.SCISSORS:
            return 3
        default: {
            console.log(`Invalid move with ${letterString}`)
            return 0
        }
    }
}

const calculateTotalScore = (array: string[]) => {
    let totalScore = 0
    let gamesArray = array

    gamesArray.forEach((string) => {
        console.log(`_______________________________`)
        const gameMove = getMoveBasedOnOutcome(string[0], string[2])
        const moveScore = getScoreBasedOnMove(gameMove)
        const gameScore = getScoreBasedOnGameResult(gameMove, string[0])
        console.log(`The move score is ${moveScore}`)
        console.log(`The game score is ${gameScore}`)
        totalScore += (moveScore + gameScore)
        console.log(`The total score is ${totalScore}`)
    })

    console.log(totalScore)
    return totalScore
}

getData()
