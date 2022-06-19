
var buttonColor = ["red","blue","green","yellow"];

var gamePattern = []; //initially empty;

var started = false;

var curr = 0;//will check the pattern

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4); //will return random integers from 0 to 3.
    var randomChosenColour = buttonColor[randomNumber];

    gamePattern.push(randomChosenColour);//adding the next button to the sequence
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//the new button will be flashed
    $("#level-title").text("Level "+gamePattern.length);
    playSound(randomChosenColour);
    curr = 0;
}

if(!started){
    $(document).on("keypress", function(event){
        gamePattern = [];
        started = true;
        nextSequence();        
    })
}

$("#level-title").click(function(e){
    if(!started){
        gamePattern = [];
        started = true;
        nextSequence();
    }
})

$(".btn").click(function(){
    let userChosenColor = this.id;
    //console.log(userChosenColor);
    if(started){
        animatePress(userChosenColor);
        if( gamePattern[curr] == userChosenColor ){
            playSound(userChosenColor);
            curr++;
        }

        else{
            $("#level-title").text("Game over! Press any Key to restart or click here");
            started = false;
            playSound("wrong");
            $("body").css({"background-color":"red"},{"opacity" : "0.8"});
            setTimeout(function() {
                $("body").css("background-color","#011F3F")
            },200); //animating body color
        }

        if(curr == gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },500);        
        }
    }
})
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
