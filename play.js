const texts = document.querySelector(".texts");
//console.log(texts);
window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
recognition.addEventListener("result", (e) => {
    //console.log(e);
    texts.appendChild(p);

    const text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    p.innerText = text;
    if (e.results[0].isFinal) {
        var stringArray = p.innerText.split(/(\s+)/);
        if (stringArray.length > 1) {
            alert("Compound words are not allowed. Repeat again please!");
        } else {
            p = document.createElement("p");
        }
    }
});

recognition.addEventListener("end", () => {
    recognition.start();
});

recognition.start();
