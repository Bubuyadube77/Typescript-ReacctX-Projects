import { languages } from "./languages.js"

function LanguagesList() {
    
    const languageElements = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span key={lang.name} style={styles} className="language-chip">{lang.name}</span>
        )
    })

    return (
        <section className="languages-list">
           {languageElements}       
        </section>
    )
}

export default LanguagesList

