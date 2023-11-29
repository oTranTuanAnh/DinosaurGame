const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");

function jump() {
    dino.classList.add('jump-animation');
    setTimeout(()=>{
        dino.classList.remove('jump-animation');
    },250);

}
document.addEventListener('keypress',()=>{
    jump();
})