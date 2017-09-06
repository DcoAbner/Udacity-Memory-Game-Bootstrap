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

//function creates two copies of each card and returns the new array
function createDeck(cards) {
    let cardArray = [];
    for (let card of cards) {
        for (let i=0; i<2; i++){
            cardArray.push(card);
        }
    }
    return cardArray;
}

let deckOfCards = [];

selectedCard1 = null;
selectedCard2 = null;

$(document).ready( function() {

    deckOfCards = createDeck(listOfCards);

    for (let i=0; i<deckOfCards.length; i++) {
        $("#cardTable").append(`<div data-cardPosition=${i} class="card col-md-4 col-lg-3 col-sm-6"></div>`);
    }

})

$("#cardTable").on('click', 'div', function() {

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
            }

            selectedCard1 = null;
            selectedCard2 = null;

        }


    }

})

function compareCards(card1Index, card2Index) {
    if (deckOfCards[card1Index].icon === deckOfCards[card2Index].icon) {
        console.log("Match");
        return true;
    } else {
        console.log("No")
    }
}

function displayIcon(cardIndex) {

    let currentCard = $("#cardTable").children()[cardIndex];
    $(currentCard).append(`<i class="fa fa-${deckOfCards[cardIndex].icon}"></i>`);

}

function hideIcon(cardIndex) {

    let currentCard = $("#cardTable").children()[cardIndex];
    console.log(currentCard);
    $(currentCard).children('i').remove();

}



