/**
 * Created by thenry on 9/6/17.
 */

const NUMBER_OF_CARDS = 4;

selectedCard1 = null;
selectedCard2 = null;

$(document).ready( function() {

    for (let i=0; i<NUMBER_OF_CARDS; i++) {
        $("#cardTable").append(`<div data-cardPosition=${i} class="card col-md-4 col-lg-3 col-sm-6">Card</div>`);
    }

})

$("#cardTable").on('click', 'div', function() {

    if (!selectedCard1) {
        selectedCard1 = $(this).attr('data-cardPosition');
    } else if (!selectedCard2) {
        if (selectedCard1 !== $(this).attr('data-cardPosition'))
        selectedCard2 = $(this).attr('data-cardPosition');
    }

    console.log(`${selectedCard1}, ${selectedCard2}`);
})



