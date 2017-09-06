/**
 * Created by thenry on 9/6/17.
 */

const NUMBER_OF_CARDS = 4;


$(document).ready( function() {

    for (let i=0; i<NUMBER_OF_CARDS; i++) {
        $("#cardTable").append(`<div value=${i} class="card col-md-4 col-lg-3 col-sm-6">Card</div>`);
    }

})


