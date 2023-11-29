const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");

function jump() {
    dino.classList.add('jump-animation');
    setTimeout(()=>{
        dino.classList.remove('jump-animation');
    },500);

}
document.addEventListener('keypress',()=> {
    if (!dino.classList.contains('jump-animation')){
        jump();
    }
})

setInterval(()=>{
    score.innerText++;
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
    if (rockLeft<0){
        rock.style.display = 'none';
    } else {
        rock.style.display ='';
    }
    if(rockLeft<175 && rockLeft>100 && dinoTop>175){
        alert('Score: '+ (score.innerText - 1) + '\nPlay again?');
        location.reload();
    }

},50)