// Definiera frågor och svar
const questions = [
    {
        question: "Fråga: Vad är din favoritfärg? \n\n Svar: Jag gillar blått. Det är en lugnande färg.",
        response: "Jag gillar blått. Det är en lugnande färg.", // AI-svar
        isAI: true
    },
    {
        question: "Fråga: Vad tycker du om att göra på fritiden? \n\n Svar: På fritiden gillar jag att gå till gymmet och spela tv-spel med vänner",
        response: "På fritiden gillar jag att gå till gymmet och spela tv-spel med vänner", // Människa-svar
        isAI: false
    },
    {
        question: "Fråga: Vad är din drömresa? \n\n Svar: Jag skulle vilja besöka Japan och se körsbärsblommorna",
        response: "Jag skulle vilja besöka Japan och se körsbärsblommorna.", // AI-svar
        isAI: true
    },
    {
        question: "Fråga: Vad tycker du om tv-serier?\n\n Svar: Jag tycker att de flesta är tråkiga så jag tittar inte mycket på serier.",
        response: "Jag tycker att de flesta är tråkiga så jag tittar inte mycket på serier..", // Människa-svar
        isAI: false
    },
    {
        question: "Fråga: Har du några husdjur? \n\n Svar: Nej, jag har inga husdjur, men jag gillar hundar.",
        response: "Nej, jag har inga husdjur, men jag gillar hundar.", // AI-svar
        isAI: true
    },
    {
        question: "Vad tycker du om musik?",
        response: "Jag gillar rock och popmusik.", // Människa-svar
        isAI: false
    },
    {
        question: "Vad är din favoritmat?",
        response: "Jag älskar sushi och italiensk mat.", // AI-svar
        isAI: true
    },
    {
        question: "Vad tycker du om att göra på helgerna?",
        response: "Jag älskar att umgås med vänner och spela brädspel.", // Människa-svar
        isAI: false
    },
    {
        question: "Vad är din största dröm?",
        response: "Min största dröm är att få resa jorden runt.", // AI-svar
        isAI: true
    },
    {
        question: "Vilken bok läste du senast?",
        response: "Jag läste 'Stolthet och fördom' av Jane Austen.", // Människa-svar
        isAI: false
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Funktion för att visa nästa fråga
function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionElement = document.getElementById("question");
        const responseElement = document.getElementById("response");
        const aiButton = document.getElementById("aiButton");
        const humanButton = document.getElementById("humanButton");

        // Visa frågan och rensa tidigare svar
        questionElement.innerText = questions[currentQuestionIndex].question;
        responseElement.innerText = "\n Är svaret från en människa eller AI?"; // Rensa tidigare svar

        // Sätt upp händelsehanterare för knapparna
        aiButton.onclick = () => handleAnswer('AI');
        humanButton.onclick = () => handleAnswer('Human');
    } else {
        // När alla frågor är besvarade
        const questionElement = document.getElementById("question");
        const responseElement = document.getElementById("response");
        questionElement.innerText = "Tack för att du deltog!";
        responseElement.innerText = `Du fick ${score} av ${questions.length} rätt!`;
        document.getElementById("options").style.display = "none"; // Dölja svarsalternativ
        // Skicka resultat till servern
        sendResultsToServer();
    }
}

// Funktion för att hantera svar
function handleAnswer(selected) {
    const responseElement = document.getElementById("response");
    const actualResponse = questions[currentQuestionIndex].response;
    const isAI = questions[currentQuestionIndex].isAI;

    // Kontrollera om svaret är rätt
    if ((selected === 'AI' && isAI) || (selected === 'Human' && !isAI)) {
        score++;
        responseElement.innerText = `Rätt! Svaret var: "${actualResponse}"`;
    } else {
        responseElement.innerText = `Fel! Svaret var: "${actualResponse}"`;
    }

    currentQuestionIndex++;
    showNextQuestion(); // Visa nästa fråga
}

// Skicka resultat till servern
function sendResultsToServer() {
    fetch('/save_results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            totalQuestions: questions.length
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultat sparat:', data);
    })
    .catch((error) => {
        console.error('Fel vid sparande av resultat:', error);
    });
}

// Starta frågeprocessen
document.addEventListener("DOMContentLoaded", function() {
    showNextQuestion();
});
