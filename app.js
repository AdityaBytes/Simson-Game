let gameseq = [];
let userseq = [];
let btns = ["red", "blue", "pink", "green"];

let started = false;
let level = 0;
const h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500); // Reduced timeout for better visibility
}

function checkans() {
    console.log(`Checking user sequence: ${userseq}`);
    for (let i = 0; i < userseq.length; i++) {
        if (gameseq[i] !== userseq[i]) {
            h2.innerText = "Game over!";
            console.log("Game over!");
            started = false;
            level = 0;
            gameseq = [];
            return;
        }
    }
    if (userseq.length === gameseq.length) {
        setTimeout(levelup, 1000);
    }
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    console.log(`Level up to ${level}`);
    let randomidx = Math.floor(Math.random() * 4);
    let randclr = btns[randomidx];
    gameseq.push(randclr);
    console.log(`Game sequence: ${gameseq}`);
    let randbtn = document.querySelector(`.${randclr}`);
    setTimeout(() => btnflash(randbtn), 500); // Added timeout to separate from text change
}

function btnpress() {
    let btn = this;
    btnflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log(`User sequence: ${userseq}`);
    checkans();
}

let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(function(btn) {
    btn.addEventListener("click", btnpress);
});
