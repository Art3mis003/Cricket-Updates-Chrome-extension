let isSpeaking = false;
let currentUtterance = null;

document.addEventListener('DOMContentLoaded', () => {
    const speakScoresButton = document.getElementById('speakScores');
    
    speakScoresButton.addEventListener('click', () => {
        if (isSpeaking) {
            stopSpeaking();
            speakScoresButton.textContent = "Speak Scores";
        } else {
            const matches = Array.from(document.querySelectorAll('#matches li')).map(li => li.textContent).join('. ');
            if (matches) {
                speak(matches);
            } else {
                speak("No matches available.");
            }
            speakScoresButton.textContent = "Stop Speaking";
        }
        isSpeaking = !isSpeaking;
    });
});

function speak(text) {
    if ('speechSynthesis' in window) {
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.onend = () => {
            document.getElementById('speakScores').textContent = "Speak Scores";
            isSpeaking = false;
        };
        window.speechSynthesis.speak(currentUtterance);
    } else {
        alert("Sorry, your browser does not support text to speech.");
    }
}

function stopSpeaking() {
    if (currentUtterance && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}
