const btnDice = document.getElementById("btnDice");
const btnPlay = document.getElementById("btnPlay");
const txtRound = document.getElementById("round_time");
const lbltalk = document.getElementById("lbltalk");
const theme = document.getElementById("theme");
const themeLable = document.getElementById("lblTitle");
const topicgen = document.getElementById("topicgenerator");

btnPlayStatus(false);
lbltalkVisibile(false);
themeVisibility(false);
topicgen.addEventListener("click", event => {
    theme.innerText = window.randomWords();
    themeVisibility(true);
});

txtRound.addEventListener('keyup', (event) => {
    switch (txtRound.value) {
        case '11':
        case '22':
        case '33':
        case '44':
        case '55':
            btnPlayStatus(true);
            break;
        default:
            btnPlayStatus(false);
            break;
    }
});
var game_round_active = false;
const texts = document.querySelector(".texts");
window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
recognition.addEventListener("result", (e) => {
    texts.appendChild(p);

    const text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    p.innerText = text;
    if (e.results[0].isFinal) {
        var stringArray = p.innerText.split(/(\s+)/);
        if (stringArray.length > 1) {
            p.setAttribute("style", "background-color:#F47070;");
        } else {
            p.setAttribute("style", "background-color:#C6E584;");
        }
        p = document.createElement("p");
        window.scrollTo(0, document.body.scrollHeight);
    }
});

recognition.addEventListener("end", () => {
    if (txtRound.value > 0)
        recognition.start();
});

function startGame() {
    texts.innerHTML = '';
    gameInterval = setInterval(game_counter, 1000);
    lbltalkVisibile(true);
    btnPlayStatus(false);
    diceStatus(false);
    recognition.start();
}

var silentInterval = null;
var gameInterval = null;

function dice() {
    const r = Math.ceil(Math.random() * 6);
    if (r == 6) {
        txtRound.value = r;
        alert("Please be silent for 6 seconds.");
        silentInterval = setInterval(silent_counter, 1000);
        btnPlayStatus(false);
    } else {
        txtRound.value = r.toString() + r.toString();
        btnPlayStatus(true);
    }
    diceStatus(false);
}

function silent_counter() {
    if (txtRound.value > 0) {
        txtRound.value = txtRound.value - 1;
    } else {
        clearInterval(silentInterval);
        diceStatus(true);
    }
}

function game_counter() {
    if (txtRound.value > 0) {
        txtRound.value = txtRound.value - 1;
    } else {
        clearInterval(gameInterval);
        diceStatus(true);
        btnPlayStatus(false);
        lbltalkVisibile(false);
        alert("Round is finished!");
    }
}
function btnPlayStatus(val) {
    btnPlay.disabled = !val;
}
function diceStatus(val) {
    btnDice.disabled = !val;
    txtRound.disabled = !val;
}

function lbltalkVisibile(val) {
    if (val)
        lbltalk.style.display = 'inline';
    else
        lbltalk.style.display = 'none';
}

function themeVisibility(val) {
    if (val)
        themeLable.style.visibility = "visible";
    else
        themeLable.style.visibility = "hidden";
}