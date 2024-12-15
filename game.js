
var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []; 
var level = 0;
var started = false;

function nextSequence() //  generates the random color
{
        userClickedPattern=[];
        level++;
        $("#level-title").html("Level "+level);

        var randomNum = Math.floor(Math.random()*4);
        var randomColor= buttonColors[randomNum];
        gamePattern.push(randomColor);
        
        $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }

function playSound(btnClicked){
/*  
    switch(btnClicked){
        case "green":
            var green = new Audio("./sounds/"+btnClicked+".mp3");
            green.play();
        break;

        case "red":
            var red = new Audio("./sounds/"+btnClicked+".mp3");
            red.play();
        break;

        case "yellow":
            var yellow = new Audio("./sounds/"+btnClicked+".mp3");
            yellow.play();
        break;

        case "blue":
            var blue = new Audio("./sounds/"+btnClicked+".mp3");
            blue.play();
        break;
        \sounds\wrong.mp3
    }*/

    var audio = new Audio("sounds/"+ btnClicked +".mp3");
    audio.play();
}

// adding animation to userclicks

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
    

}


// check btnPress
$(".btn").on("click" , function(){
    // store id of the btn
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var lastAns = (userClickedPattern.length)-1;
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkSequence(lastAns);
    
});


// detect keypress
$(document).keypress(function(event){
    
    if(!started)
{
    $("#level-title").html("Level "+level);
    //console.log(event.key);
    nextSequence();
    started = true;
}

});

function checkSequence(currlevel){
    if(gamePattern[currlevel]=== userClickedPattern[currlevel]){
        console.log("Success");

        if( userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }else{
        $("h1").text("Game Over, Press Any Key to Restart")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        console.log("Wrong");
        startover();
    }

}

function startover(){
    level =0;
    gamePattern=[];
    started=false;
}

    






