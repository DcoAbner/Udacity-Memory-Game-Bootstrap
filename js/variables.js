/**
 * Created by thenry on 9/7/17.
 */

//can add or remove icons and the number of cards in game will increase/decrease
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
    },
    {
        icon: 'diamond'
    },
    {
        icon: 'paper-plane-o'
    },
    {
        icon: 'cube'
    },
    {
        icon: 'bicycle'
    }

]

//array that will be used for cards
let deckOfCards = [];

//will be generated from length of the deck
let numberOfCards = 0;

//counter to know when matched cards equals total cards
let numberOfMatchedCards = 0;

//timer that will reset each game
let elapsedTime = null;

//star counter, will reset to 3 each game
let numberOfStars = 3;

//number of moves, will reset to 0 each game
let numberOfMoves = 0;

//function to store the setInterval timer so that it can be cleared each game
let timerFunction = null;

//array index of the 1st and 2nd selected cards
selectedCard1 = null;
selectedCard2 = null;