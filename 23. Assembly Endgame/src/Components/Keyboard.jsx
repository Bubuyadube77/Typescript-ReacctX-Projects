import React from "react"
import clsx from "clsx"

function KeyboardLetters({ guessedLetters, currentWord, addGuessedLetters }) {
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyboardKeys = alphabet.split("").map((keyboardKey, index) => {
        const isGuessed = guessedLetters.includes(keyboardKey)
        const isCorrect = isGuessed && currentWord.includes(keyboardKey)
        const isWrong = isGuessed && !currentWord.includes(keyboardKey)

        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                key={index}
                className={className}
                onClick={() => addGuessedLetters(keyboardKey)}
            >
                {keyboardKey.toUpperCase()}
            </button>
        )
    })

    return (
        <section className="keyboard">
            {keyboardKeys}
        </section>
    )
}

export default KeyboardLetters