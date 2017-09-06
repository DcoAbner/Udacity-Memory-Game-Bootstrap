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
    // {
    //     icon: 'leaf'
    // },
    // {
    //     icon: 'bolt'
    // }
]

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

let deckOfCards = [];
let numberOfCards = 0;
let numberOfMatchedCards = 0;

selectedCard1 = null;
selectedCard2 = null;

$(document).ready( function() {


    resetGame();

    $("#resetButton").click(function() {
        resetGame();
    })

})

$("#cardTable").on('click', 'div', function() {

    if ($(this).hasClass("open")) {
        return;
    } else {
        console.log("click");
        if (!selectedCard1) {
            selectedCard1 = $(this).attr('data-cardPosition');
            displayIcon(selectedCard1);
        } else if (!selectedCard2) {
            if (selectedCard1 !== $(this).attr('data-cardPosition')) {
                selectedCard2 = $(this).attr('data-cardPosition');
                displayIcon(selectedCard2);

                if (!compareCards(selectedCard1, selectedCard2)) {
                    hideIcon(selectedCard1);
                    hideIcon(selectedCard2);
                } else {
                    if (numberOfMatchedCards === numberOfCards) {

                        endGame();

                    }
                }

                selectedCard1 = null;
                selectedCard2 = null;

            }
        }
    }
})

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
    $(currentCard).append(`<i class="fa fa-${deckOfCards[cardIndex].icon}"></i>`);

}

function hideIcon(cardIndex) {

    let currentCard = $("#cardTable").children()[cardIndex];
    $(currentCard).removeClass("open");
    $(currentCard).children('i').remove();

}

function endGame() {
    alert("You win");
}

function resetGame() {
    deckOfCards = createDeck(listOfCards);
    numberOfCards = deckOfCards.length;
    numberOfMatchedCards = 0;

    drawCards();
}

function drawCards() {

    $("#cardTable").empty();
    for (let i=0; i<numberOfCards; i++) {
        $("#cardTable").append(`<div data-cardPosition=${i} class="card col-md-4 col-lg-3 col-sm-6"></div>`);
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
