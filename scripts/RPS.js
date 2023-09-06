let computerMove;
let lastPlayed;
let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
localStorage.setItem('score', JSON.stringify(score));
// const score = JSON.parse(localStorage.getItem('score'));

let result = '';
function pickComputerMove() {
    const currentDate = new Date();
    if (sessionTimeManager() || score.wins + score.losses + score.ties > 14 ){
        return false;
    }
    let randomNumber = Math.random();
    if (randomNumber > 0 && randomNumber < 1/3){
        computerMove = `rock`;
    }else if (randomNumber > 1/3 && randomNumber < 2/3){
        computerMove = `paper`;
    }else {
        computerMove = `scissors`;
    }
    // console.log(`score: ${score.wins}, ${score.losses} , count: ${count}`)
     return true;
}

function updateScore() {
    let results;
    if (score.wins > score.losses){
    results = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties} <br><br>You win`;
    } else if (score.losses === score.wins) {
    results = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties} <br><br>It's a tie`;
    }else{
    results = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties} <br><br>You loose`;
    }
    return results;
}

function sessionTimeManager() {
    // Check if a timestamp indicating the last access time exists in localStorage
    const lastAccessTimestamp = localStorage.getItem('lastAccessTimestamp');

    if (!lastAccessTimestamp) {
    // Grant access if no timestamp exists
    localStorage.setItem('lastAccessTimestamp', Date.now().toString());
    console.log('Access granted for the first time.');
    return true;
    } else {
    const currentTime = Date.now();
    const timeDifference = currentTime - parseInt(lastAccessTimestamp, 10);
    const fourHoursInMillis = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    if (timeDifference >= fourHoursInMillis) {
        // Grant access if time difference is greater than or equal to 2 hours
        localStorage.setItem('lastAccessTimestamp', currentTime.toString());
        console.log('Access granted after 4 hours.');
        score = {wins: 0, losses: 0, ties: 0};
        localStorage.setItem('score', JSON.stringify(score));
        return true;
    } else {
        // Deny access if time difference is less than 2 hours
        console.log('Access denied. Please wait for 4 hours.');
        return false;
    }
    }
}
document.querySelector('.js-score').innerHTML = updateScore();