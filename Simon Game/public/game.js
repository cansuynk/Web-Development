
var level = 0;
var pressedBtns = [];

/*Press Button and play sound*/
function playSound(sound){

    var audioFile = "sounds/" + sound + ".mp3"
    var audio = new Audio(audioFile);
    audio.play();

}

/*Game Over*/
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);

    playSound("wrong");
    level = 0;
    pressedBtns = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");

}

/*Click random buttons and save them into array*/
var buttons = ["green", "red", "yellow", "blue"];
function randomBtn(){
    level = level + 1;
    $("#level-title").text("Level " + level);
    var rdmNum = Math.floor(Math.random() * 4);
    $("#" + buttons[rdmNum]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttons[rdmNum]);
    pressedBtns.push(buttons[rdmNum]);
}

/*Start Game*/
$("body").keypress(function(){
    if (level === 0){
        randomBtn();
    }
});  

function clickedBtn(btn){
    
    $("#" + btn).addClass("pressed");
    setTimeout(() => {
        $("#" + btn).removeClass("pressed");
    }, 100);

    playSound(btn);


    if(btn === pressedBtns[pressCount]){
        pressCount++;

        if (pressCount === pressedBtns.length){
            pressCount = 0;
            setTimeout(randomBtn, 1000);
        }
    }
    else{
        pressCount = 0;
        gameOver();
    }
}
/*User clicks button*/
var pressCount = 0;
$(".btn").click(function(){
    if (level !== 0){
        var btn = $(this).attr("id");
        clickedBtn(btn);
    }
});

/*Arrows option*/
$("body").keydown(function(e){
    if (level !== 0){
        if (e.which == 37) { 
            clickedBtn("red");
        }
        else if (e.which == 38) { 
            clickedBtn("green");
        }
        else if (e.which == 39) { 
            clickedBtn("yellow");
        }
        else if (e.which == 40) { 
            clickedBtn("blue");
        }
    }
});










