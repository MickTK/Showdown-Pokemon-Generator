var pokemon;
var dex_dim = 898;
var research_name;

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
    pokemon.id = randomNum(0, dex_dim-1);
    pokemon = retrieve_pokemon(pokemon.id);
    research_name = pokemon.name.replace('-', '');
    $("#name").text(pokemon.name.toUpperCase());
    $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani/" + research_name + ".gif");
    console.log(pokemon);
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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