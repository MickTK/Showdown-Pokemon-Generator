$(document).ready(function(){
    generate();
});

function generate(){
    $.ajax({ 
        type: 'GET', 
        url: 'https://pokeapi.co/api/v2/pokemon/', 
        data: {},
        dataType: 'json',
        success: function (data) {
            $("#prova").text(randomNum(0, data.count-1));
        }
    });
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}