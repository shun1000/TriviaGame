$(document).ready(function() {
// Create a function that creates the start button and initial screen
// for reference go to:https://learn.jquery.com/using-jquery-core/document-ready/
function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
    clickSound.play();
    //attempted to add sound to the game. Has issues. Leaving it to work on later.
    generateHTML();
    timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
    //answeredQuestion = true;
    clickSound.play();
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
        //alert("correct");

        clearInterval(theClock);
        generateWin();
    }
    else {
        //alert("wrong answer!");
        clearInterval(theClock);
        generateLoss();
    }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
    clickSound.play();
    resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 30;
    timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Thanks for playing, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Game!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What race utilized pylons in the computer game StarCraft?", "Which of the following games was released first?", "Which of the following is NOT a name of a Pacman ghost?", "Which game character is not an animal?", "Which power up does not exist in Mario Bros?", "What is the name of the developer who created Sim City (Original Version)?", "Which map is not in Super Mario Kart (original)?", "Which power up let you skip levels in Super Mario 3?"];
var answerArray = [["Terrans", "Protoss", "Zerg", "Dwarfs"], ["Pokemon","Quake","StarCraft","Half-Life"], ["Clyde", "Blinky", "Peach", "Inky"], ["Sonic","Crash Bandicoot","Solid Snake","Fox McCloud"], ["Flower", "Mushroom", "Feather", "Banana"], ["Maxis","Blizzard","Riot Games","Activison"], ["Mario Circuit", "Koopa Troopa Beach", "Donut Plains", "Bowser Castle"], ["Mushroom","Boot","Whistle","flute"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/pylons.jpg'>", "<img class='center-block img-right' src='assets/images/quake.jpg'>", "<img class='center-block img-right' src='assets/images/pacman2.jpg'>", "<img class='center-block img-right' src='assets/images/solidsnake.jpg'>", "<img class='center-block img-right' src='assets/images/banana.jpg'>", "<img class='center-block img-right' src='assets/images/simcity.jpg'>", "<img class='center-block img-right' src='assets/images/koopatroopa.png'>", "<img class='center-block img-right' src='assets/images/whistle.jpg'>"];
var correctAnswers = ["B. Protoss", "B. Quake", "C. Peach", "C. Solid Snake", "D. Banana", "A. Maxis", "B. Koopa Troopa Beach", "D. flute"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/button.mp3");