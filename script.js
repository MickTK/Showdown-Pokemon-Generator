var pokemon;

class Pokemon{
    constructor(){
        this.id = undefined;
        this.name = undefined;
    }
}

$(document).ready(function(){
    pokemon = new Pokemon()

    generate();
});

function generate(){
    pokemon.id = retrieve_pokemon_id();
    pokemon = retrieve_pokemon(pokemon.id);
    pokemon.name = pokemon.name;
    $("#name").text(pokemon.name.toUpperCase());
    $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani/" + pokemon.name + ".gif");
    console.log(pokemon);
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function retrieve_pokemon_id(){
    var a;
    var dex_dim = 898;

    $.ajax({ 
        type: 'GET', 
        url: 'https://pokeapi.co/api/v2/pokemon/',
        async: false,
        data: {},
        dataType: 'json',
        success: function (data) {
            a = randomNum(0, dex_dim-1);
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