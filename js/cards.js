/**
 * Created by thenry on 9/7/17.
 */

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

// Shuffle function from http://stackoverflow.com/a/2450976; returns shuffled array
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


//input index of two cards, if matched will add "matched" class and return true; else returns false
function compareCards(card1Index, card2Index) {

    if (deckOfCards[card1Index].icon === deckOfCards[card2Index].icon) {
        $(getSpecificCard(card1Index)).addClass("matched");
        $(getSpecificCard(card2Index)).addClass("matched");
        numberOfMatchedCards += 2;
        return true;
    } else {
        return false;
    }
}

//functions for displaying the icon on the card, and removing icon from card respectively (based on card index)
function displayIcon(cardIndex) {

    let currentCard = getSpecificCard(cardIndex);
    $(currentCard).addClass("open");
    $(currentCard).append(`<i class="my-auto fa fa-${deckOfCards[cardIndex].icon}"></i>`);

}

function hideIcon(cardIndex) {

    let currentCard = getSpecificCard(cardIndex);
    $(currentCard).removeClass("open");
    $(currentCard).children('i').remove();

}

//draws the cards onto the cardTable div;
function drawCards() {

    $("#cardTable").empty();
    for (let i=0; i<numberOfCards; i++) {
        $("#cardTable").append(`<div class="cardHolder col-3"><div data-cardPosition=${i} class="card mx-auto"></div></div>`);
    }
}

//retrieves the card element based on it's index
function getSpecificCard(index) {
    return $($("#cardTable").children()[index]).children('.card');
}
