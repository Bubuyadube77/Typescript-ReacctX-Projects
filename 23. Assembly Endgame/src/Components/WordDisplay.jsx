import React from "react"

function WordDisplay({ currentWord, guessedLetters }) {
    const letterElements = currentWord.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        return (
            <span key={index}>
                {isGuessed ? letter.toUpperCase() : ""}
            </span>
        )
    })

    return (
        <section className="word">
            {letterElements}
        </section>
    )
}

export default WordDisplay