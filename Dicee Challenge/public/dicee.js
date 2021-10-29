
var firstOpen = window.performance.navigation.type; //wheter page is reloded or not
//performance.getEntriesByType("navigation")[0].type === "reload";

if (document.querySelector(".container h1").textContent === "Refresh Me" && firstOpen === 0){
    document.querySelector(".container .img1").setAttribute("src", "images/dice1.png");
    document.querySelector(".container .img2").setAttribute("src", "images/dice1.png");
}

if (firstOpen === 1){
    var player1dice = Math.floor(Math.random()*6) + 1;
    var player2dice = Math.floor(Math.random()*6) + 1;

    if (player1dice > player2dice){
        document.querySelector(".container h1").textContent = "😊 Player 1 Wins!";
    }
    else if (player2dice > player1dice){
        document.querySelector(".container h1").textContent = "Player 2 Wins! 😊";
    }
    else{
        document.querySelector(".container h1").textContent = "Draw!";
    }

    document.querySelector(".container .img1").setAttribute("src", "images/dice" + player1dice + ".png");
    document.querySelector(".container .img2").setAttribute("src", "images/dice" + player2dice + ".png");
    
}



