var pokemon; // Current pokemon
var dex_dim = 898; // Pokedex size
var research_name; // Pokemon's name for getting the right gif image

class Pokemon{
    constructor(){
        this.link = undefined;  // Will have the informations from pokeapi
        this.id = undefined;
        this.name = "";

        this.hp = 0;
        this.atk = 0;
        this.def = 0;
        this.spa = 0;
        this.spd = 0;
        this.spe = 0;

        this.ability = undefined;
        this.shiny = false;
        this.nature = undefined;

        this.moves = [];
    }

    // Build the pokemon
    build(){
        if(this.name == "") return undefined;
        
        // Get pokemon informations
        var a, b;
        $.ajax({ 
            type: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + this.name,
            async: false,
            data: {},
            dataType: 'json',
            success: function (data) {
                a = data;
            }
        });

        this.link = a;

        // Ability
        this.ability = this.link.abilities[randomNum(0, this.link.abilities.length)].ability.name;

        // Get and set the nature
        $.ajax({ 
            type: 'GET',
            url: "https://pokeapi.co/api/v2/nature?offset=" + randomNum(0, 25) + "&limit=1",
            async: false,
            data: {},
            dataType: 'json',
            success: function (data) {
                a = data.results[0].name;
            }
        });
        this.nature = a;

        // EVs
        a = randomNum(0, 6);
        b = randomNum(0, 6);
        while(a == b){
            a = randomNum(0, 6);
            b = randomNum(0, 6);
        }
        switch(a){
            case 0: this.hp = 255; break;
            case 1: this.atk = 255; break;
            case 2: this.def = 255; break;
            case 3: this.spa = 255; break;
            case 4: this.spd = 255; break;
            case 5: this.spe = 255; break;
        }
        switch(b){
            case 0: this.hp = 255; break;
            case 1: this.atk = 255; break;
            case 2: this.def = 255; break;
            case 3: this.spa = 255; break;
            case 4: this.spd = 255; break;
            case 5: this.spe = 255; break;
        }

        // Moves
        var b;
        if(!this.link.moves.length == 0){
            b = this.link.moves[randomNum(0, this.link.moves.length)].move.name;
            this.moves.push(b);
        }
        else
            this.moves.push("pound");
        while(this.moves.length < 4 && this.moves.length < this.link.moves.length){
            b = this.link.moves[randomNum(0, this.link.moves.length)].move.name;
            if(!this.moves.includes(b))
            this.moves.push(b);
        }
    }

    // Pokemon stats format
    make(){
        var result;

        // Name
        result = capitalizeFirstLetter(this.name) + "\n";

        // EVs
        result += "EVs: " + this.hp + " HP / " + this.atk + " Atk / " + this.def + " Def / " + this.spa + " SpA / " + this.spd + " SpD / " + this.spe + " Spe\n";

        // Ability
        result += "Ability: " + capitalizeFirstLetter(this.ability.replace('-', ' ')) + "\n";

        // Shiny
        if(this.shiny)
            result += "Shiny: Yes\n";

        // Nature
        result += capitalizeFirstLetter(this.nature) + " Nature\n";

        var x, y;
        // Moves
        for(var i = 0; i < this.moves.length; i++){
            x = this.moves[i].replace('-', ' ');
            result += "- " + capitalizeFirstLetter(x) + "\n";
        }

        return result;
    }
}

$(document).ready(function(){
    pokemon = new Pokemon();

    generate();
});

// Core function
function generate(){
    console.clear();
    pokemon = new Pokemon();
    $('#name').css({'color':'white'});
    $("#name").text("?");
    $('#img').attr("src", "");
    $("pokemon-stats").val("");

    pokemon.id = randomNum(0, dex_dim);
    pokemon.link = retrieve_pokemon(pokemon.id);
    research_name = pokemon.link.name.replace('-', '');
    pokemon.name = pokemon.link.name;

    if(randomNum(0, 10) == 0){
        pokemon.shiny = true;
        $('#name').css({'color':'gold'});
    }
    
    $("#name").text(pokemon.link.name.toUpperCase());

    if(pokemon.shiny)
        $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani-shiny/" + research_name + ".gif");
    else
        $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani/" + research_name + ".gif");
    
    pokemon.build();
    
    $("#pokemon-stats").val(pokemon.make());
    console.log(pokemon.make());
}

// Generate a random number
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Set the first letter uppercase
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Retrieve pokemon data
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

// Copy pokemon stats
function copy() {
    var copyText = document.getElementById("pokemon-stats");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}