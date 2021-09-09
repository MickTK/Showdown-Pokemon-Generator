var pokemon_id;
var pokemon;

$(document).ready(function(){
    generate();
});

function generate(){
    pokemon_id = retrieve_pokemon_id();
    pokemon = retrieve_pokemon(pokemon_id);
    $("#name").text(pokemon.name);
    $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani/" + pokemon.name + ".gif");
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function retrieve_pokemon_id(){
    var a;
    $.ajax({ 
        type: 'GET', 
        url: 'https://pokeapi.co/api/v2/pokemon/',
        async: false,
        data: {},
        dataType: 'json',
        success: function (data) {
            a = randomNum(0, data.count-1);
        }
    });
    return a;
}

function retrieve_pokemon(id){
    var a;
    $.ajax({ 
        type: 'GET', 
        url: 'https://pokeapi.co/api/v2/pokemon/?offset=' + id + '&limit=1',
        async: false,
        data: {},
        dataType: 'json',
        success: function (data) {
            a = data.results[0];
        }
    });
    return a;
}