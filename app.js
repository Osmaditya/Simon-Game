let gameSeq = [];  // Computer ki taraf se generate hone wali color sequence
let userSeq = [];  // User ki taraf se click ki gayi sequence

let btns = ["red", "yellow", "green", "blue"];  // Available colors (buttons)

let started = false;  // Game start hua ya nahi
let level = 0;        // Current level ka number

let h2 = document.querySelector("h2");

// Jab user koi bhi key press kare, game start hoga
document.addEventListener("keypress", function () {
    if (started == false) {
        // Agar game pehli baar start ho raha hai
        started = true;
    }

    levelup();
});

// Computer ke button flash(white) karne ka function
function compFlash(btn) {
    btn.classList.add("compFlash"); //classlist se color generate kiya haii ,ishme btn se direct access krke usko compFlash class add krr dega or add krne pe hi ushe color assign krr dega
    setTimeout(function () {
        btn.classList.remove("compFlash");  // Flash effect hatao 250ms ke baad
    }, 250);
}

// User ke click ke baad button flash(purple) karne ka function
function userFlash(btn) {
    btn.classList.add("userFlash"); // Button ko flash effect do
    setTimeout(function () {
        btn.classList.remove("userFlash");  // Flash effect hatao 250ms ke baad
    }, 250);
}

// Har level pe ek new color add karo sequence me
function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //choose random button
    let randIdx = Math.floor(Math.random() * 3);  //0-3 index of btns
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
   
    compFlash(randBtn);        // Button ko flash karo
    gameSeq.push(randColor);   // Game sequence me color add karo
    // console.log(gameSeq);      // Debug ke liye sequence print karo
}

// User ki answer sequence check karna
function checkAns(idx) {
    // Agar user ki poori sequence sahi hai, toh next level pe jao
    if (gameSeq.length === userSeq.length) {
        setTimeout(levelup, 1000);  //after 1s level change
    }

    // Check karo current color sahi hai ya nahi
    if (gameSeq[idx] === userSeq[idx]) {
        console.log("same value");
    } else {
         // Agar galat input diya toh game over
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br> Press any key to restart the game. `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Jab user koi button click kare
function btnPress() {
    let btn = this;
    userFlash(btn);  // Flash effect dikhana
    let userColor = btn.getAttribute("id");  // Button ka color lena
    userSeq.push(userColor);  // User sequence me add karna

    checkAns(userSeq.length - 1);  // Check karo ki sahi hai ya nahi
}

// Sabhi buttons ke liye event listener lagana
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Game reset karne ka function
function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];

}