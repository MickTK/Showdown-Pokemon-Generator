var pokemon;
var dex_dim = 898;
var research_name;

class Pokemon{
    constructor(){
        this.link = undefined;
        this.id = undefined;
        this.name = "";

        this.hp = undefined;
        this.atk = undefined;
        this.def = undefined;
        this.spa = undefined;
        this.spd = undefined;
        this.spe = undefined;

        this.ability = undefined;
        this.shiny = false;
        this.nature = undefined;

        this.moves = [];
    }

    build(){
        if(this.name == "") return undefined;
        
        var a;

        // Core
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

        // Nature
        

        // Moves
        var b;
        console.log(this.link);
        b = this.link.moves[randomNum(0, this.link.moves.length)].move.name;
        this.moves.push(b);
        while(this.moves.length < 4){
            b = this.link.moves[randomNum(0, this.link.moves.length)].move.name;
            if(!this.moves.includes(b))
            this.moves.push(b);
        }
    }

    make(){
        var result;

        // Name
        result = this.name + "\n";

        // EVs
        result += "EVs: " + this.hp[0] + " HP / " + this.atk[1] + " Atk / " + this.def[2] + " Def / " + this.spa[3] + " SpA / " + this.spd[4] + " SpD / " + this.spe[5] + " Spe\n";

        // Shiny
        if(this.shiny)
            result += "Shiny: Yes\n";

        // Ability
        result += this.ability + " Nature\n";

        // Moves
        result += "- " + this.moves[0] + "\n";
        result += "- " + this.moves[1] + "\n";
        result += "- " + this.moves[2] + "\n";
        result += "- " + this.moves[3] + "\n";

        return result;
    }
}

$(document).ready(function(){
    pokemon = new Pokemon()

    generate();
});

function generate(){
    pokemon.id = randomNum(0, dex_dim);
    pokemon.link = retrieve_pokemon(pokemon.id);
    research_name = pokemon.link.name.replace('-', '');
    pokemon.name = pokemon.link.name;
    $("#name").text(pokemon.link.name.toUpperCase());
    $('#img').attr("src","https://play.pokemonshowdown.com/sprites/ani/" + research_name + ".gif");
    
    pokemon.build();

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