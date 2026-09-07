import React from "react"
import clsx from "clsx"
import { languages } from "./languages.ts"
import { getFarewellText, getRandomWord } from "./utils.ts"
import ReactConfetti from "react-confetti"

function App() {

  const [currentWord, setCurrentWord] = React.useState<string>(():string=> getRandomWord())

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  } 

  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([])

  const wrongGuessCount: number = guessedLetters.filter((letter: string): boolean=> !currentWord.includes(letter)).length

  const isGameWon: boolean = currentWord.split("").every((letter: string):boolean=> guessedLetters.includes(letter))

  const numGuessesLeft: number = languages.length - 1

  const isGameLost: boolean = wrongGuessCount >= numGuessesLeft

  const isGameOver: boolean = isGameWon || isGameLost

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const lastGuessedLetter: string = guessedLetters[guessedLetters.length-1]
  const isLastGuessIncorrect: boolean = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }

        const className = clsx ("chip", isLanguageLost ? "lost" : "")

        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )

        return(
        <span key={index} className={letterClassName}>
            {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
    )})

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        
        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status",
        {
            won: isGameWon,
            lost: isGameLost,
            farewell: !isGameOver && isLastGuessIncorrect
        })

    function renderGameStatus() {
        if(!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount-1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>   
            )
        }

        if (isGameLost) {
            return (
                <>
                    <h2>Game Over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </> 
            )
        }
    }

    return (
        <main>
        {isGameWon && <ReactConfetti
            recycle={false}
            numberOfPieces={1000}
         />}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}
                     role="status"
                     aria-live="polite"
            >
                {renderGameStatus()}
            </section>
            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>

            {/* Combined visually-hidden aria-alive region for status update*/}

            <section className="sr-only" aria-live="polite" role="status">
                
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                    `Correct! The letter ${lastGuessedLetter} is in the word.` :
                    `Sorry, the letter ${lastGuessedLetter} is not in the word`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>

                <p>Current Word: {currentWord.split("").map
                    (letter=> guessedLetters.includes(letter) ? letter : "blank.").join(" ")}</p>
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
        </main>
    )
}

export default App
