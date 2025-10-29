import React, { useState } from 'react'
import Board from './Board'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [step, setStep] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)

    const current = history[step]
    const winner = calculateWinner(current)
    const isDraw = !winner && current.every(Boolean)

    function handlePlay(i) {
        if (winner || current[i]) return
        const next = current.slice()
        next[i] = xIsNext ? 'X' : 'O'
        const newHistory = history.slice(0, step + 1).concat([next])
        setHistory(newHistory)
        setStep(newHistory.length - 1)
        setXIsNext(!xIsNext)
    }

    function jumpTo(move) {
        setStep(move)
        setXIsNext((move % 2) === 0)
    }

    function handleReset() {
        setHistory([Array(9).fill(null)])
        setStep(0)
        setXIsNext(true)
    }

    const moves = history.map((_, move) => {
        const desc = move ? `Voltar para jogada #${move}` : 'Início'
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    let status
    if (winner) status = `Vencedor: ${winner}`
    else if (isDraw) status = 'Empate!'
    else status = `Próximo: ${xIsNext ? 'X' : 'O'}`

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <button onClick={handleReset}>Reiniciar</button>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}