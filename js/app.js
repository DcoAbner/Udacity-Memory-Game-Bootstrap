/**
 * Created by thenry on 9/6/17.
 */

let listOfCards = [
    {
        icon: 'anchor'
    },
    {
        icon: 'bomb'
    },
    {
        icon: 'leaf'
    },
    {
        icon: 'bolt'
    }
]

let deckOfCards = [];
let numberOfCards = 0;
let numberOfMatchedCards = 0;
let elapsedTime = null;

let numberOfMoves = 0;

let timerFunction = null;

selectedCard1 = null;
selectedCard2 = null;

$(document).ready( function() {

    resetGame();

    $("#resetButton").click(function() {
        resetGame();
    })

})

//function creates two copies of each card and returns the new array
function createDeck(cards) {
    let cardArray = [];
    for (let card of cards) {
        for (let i=0; i<2; i++){
            cardArray.push(card);
        }
    }
    return shuffle(cardArray);
}

function initializeClick() {

    $("#cardTable").on('click', 'div', function () {

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

function compareCards(card1Index, card2Index) {

    if (deckOfCards[card1Index].icon === deckOfCards[card2Index].icon) {
        console.log("Match");
        $($("#cardTable").children()[card1Index]).addClass("matched");
        $($("#cardTable").children()[card2Index]).addClass("matched");
        numberOfMatchedCards += 2;
        return true;
    } else {
        console.log("No")
        return false;
    }
}

function displayIcon(cardIndex) {

    let currentCard = $("#cardTable").children()[cardIndex];
    $(currentCard).addClass("open");
    $(currentCard).append(`<i class="my-auto fa fa-${deckOfCards[cardIndex].icon}"></i>`);

}

function hideIcon(cardIndex) {

    let currentCard = $("#cardTable").children()[cardIndex];
    $(currentCard).removeClass("open");
    $(currentCard).children('i').remove();

}

function endGame() {

    clearInterval(timerFunction);
    timeToComplete = elapsedTime;
    alert(`You won in ${timeToComplete} seconds and ${numberOfMoves} moves`);

}

function resetGame() {

    deckOfCards = createDeck(listOfCards);
    numberOfCards = deckOfCards.length;
    numberOfMatchedCards = 0;
    elapsedTime = 0;
    numberOfMoves = 0;

    drawCards();
    initializeClick();
    updateTimer(elapsedTime);
    startTimer();
    drawStars();
    updateStars(numberOfMoves);
    updateMoves(numberOfMoves);

}

function drawCards() {

    $("#cardTable").empty();
    for (let i=0; i<numberOfCards; i++) {
        $("#cardTable").append(`<div data-cardPosition=${i} class="card p-3 col-3"></div>`);
        let width = $($("#cardTable").children()[i]).width();
        $($("#cardTable").children()[i]).height(width);
        console.log(width);
    }

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startTimer() {

    let start = Date.now();
    timerFunction = setInterval(function() {
        elapsedTime = (Math.round((new Date - start) / 1000));
        console.log(elapsedTime);
        updateTimer(elapsedTime);
    }, 1000);

}

function updateTimer(time) {
    $("#timer").text(`${time} seconds`);
}

function updateStars() {
    let numberOfStars = 3;

    console.log(numberOfMoves);

    if (numberOfMoves > 10) {
        numberOfStars = 1;
    } else if (numberOfMoves > 5) {
        numberOfStars = 2;
    }

    drawStars(numberOfStars);
}

function drawStars(num) {
    $("#stars").empty();
    for (let i = 0; i < num; i++) {
        $("#stars").append(`<i class="fa fa-star"></i>`)
    }
}

function updateMoves(num) {
    $("#movesCounter").text(`${numberOfMoves} moves`);
}

