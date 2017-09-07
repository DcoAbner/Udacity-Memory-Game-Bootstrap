/**
 * Created by thenry on 9/6/17.
 */

//Function that runs when the page loads.  Calls resetGame() and then sets up
// listener for reset button
$(document).ready( function() {

    resetGame();

    $("#resetButton").click(function() {
        resetGame();
    })

})

//initializes variables (declared in variables.js), runs functions to reset game;
function resetGame() {

    deckOfCards = createDeck(listOfCards);
    numberOfCards = deckOfCards.length;
    numberOfMatchedCards = 0;
    elapsedTime = 0;
    numberOfMoves = 0;
    numberOfStars = 3;

    drawCards();
    initializeClick();
    updateTimer(elapsedTime);
    startTimer();
    drawStars();
    updateStars(numberOfMoves);
    updateMoves(numberOfMoves);

}


//click listener for clicking on cards.
// --does not allow click if a card is currently shown
// --stores as either selectedCard1 (first) or selectedCard2 (second);
// if second card then updates moves, runs compareCards to see if they match
function initializeClick() {

    $("#cardTable").on('click', '.card', function () {

        if ($(this).hasClass("open")) {
            return;
        } else {
            if (!selectedCard1) {
                selectedCard1 = $(this).attr('data-cardPosition');
                displayIcon(selectedCard1);
            } else if (!selectedCard2) {
                if (selectedCard1 !== $(this).attr('data-cardPosition')) {
                    numberOfMoves++;
                    updateStars();
                    updateMoves(numberOfMoves);
                    selectedCard2 = $(this).attr('data-cardPosition');
                    displayIcon(selectedCard2);

                    if (!compareCards(selectedCard1, selectedCard2)) {

                        setTimeout(function() {
                            hideIcon(selectedCard1);
                            hideIcon(selectedCard2);
                            selectedCard1 = null;
                            selectedCard2 = null;
                        }, 2000)

                    } else {

                        selectedCard1 = null;
                        selectedCard2 = null;

                        if (numberOfMatchedCards === numberOfCards) {
                            endGame();
                        }
                    }
                }
            }
        }
    })
}

//runs when the all of the cards are matched; shows the modal that displays time, moves, star rating;
// allows for reset of game
function endGame() {

    timeToComplete = elapsedTime;
    $("#endGameModal").show();
    $("#modalBodyText").text(`You won in ${timeToComplete} seconds and ${numberOfMoves} moves`);
    for (let i=0; i<numberOfStars; i++) {
        $("#modalBodyStars").append(`<i class="fa fa-star"></i>`);
    }
    $("#newGameButton").click(function() {
        resetGame();
        $("#endGameModal").hide();
    })

}

//starts the game timer (stores the setInterval as timerFunction so that it can be cleared on subsequent resets;
// calls update timer function to update text every second
function startTimer() {

    if (timerFunction) {
        clearInterval(timerFunction);
    }
    let start = Date.now();
    timerFunction = setInterval(function() {
        elapsedTime = (Math.round((new Date - start) / 1000));
        updateTimer(elapsedTime);
    }, 1000);

}

//displays the current timer elapsed in seconds
function updateTimer(time) {
    $("#timer").text(`${time} seconds`);
}

//updates the number of stars (default 3, minimum 1)
function updateStars() {

    if (numberOfMoves > 17) {
        numberOfStars = 1;
    } else if (numberOfMoves > 13) {
        numberOfStars = 2;
    }

    drawStars(numberOfStars);
}

//displays stars on screen
function drawStars(num) {
    $("#stars").empty();
    for (let i = 0; i < num; i++) {
        $("#stars").append(`<i class="fa fa-star"></i>`)
    }
}

//displays moves on screen
function updateMoves(num) {
    $("#movesCounter").text(`${numberOfMoves} moves`);
}
