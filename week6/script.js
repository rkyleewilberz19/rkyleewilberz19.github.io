// Pokemon Team Builder
// Week 6 version - simple fetch and DOM manipulation

// Get elements from HTML
var input = document.getElementById("pokemonInput");
var findBtn = document.getElementById("findBtn");

var img = document.getElementById("pokemonImg");
var audio = document.getElementById("pokemonAudio");

var move1 = document.getElementById("move1");
var move2 = document.getElementById("move2");
var move3 = document.getElementById("move3");
var move4 = document.getElementById("move4");

var addBtn = document.getElementById("addToTeamBtn");
var teamBody = document.getElementById("teamBody");

// This will store the current pokemon data
var currentPokemon = null;


// When Find button is clicked
findBtn.addEventListener("click", function () {

    var name = input.value.toLowerCase().trim();

    if (name === "") {
        alert("Enter a Pokemon name or ID");
        return;
    }

    var url = "https://pokeapi.co/api/v2/pokemon/" + name;

    // Fetch data from PokeAPI
    fetch(url)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Pokemon not found");
            }

            return response.json();
        })
        .then(function (data) {

            currentPokemon = data;

            // Show sprite
            img.src = data.sprites.front_default;

            // Show cry sound if available
            if (data.cries && data.cries.latest) {
                audio.src = data.cries.latest;
                audio.load();
            }

            // Clear old move options
            move1.innerHTML = "";
            move2.innerHTML = "";
            move3.innerHTML = "";
            move4.innerHTML = "";

            // Add moves to dropdowns
            for (var i = 0; i < data.moves.length; i++) {

                var moveName = data.moves[i].move.name;

                var option1 = document.createElement("option");
                option1.textContent = moveName;
                option1.value = moveName;

                var option2 = option1.cloneNode(true);
                var option3 = option1.cloneNode(true);
                var option4 = option1.cloneNode(true);

                move1.appendChild(option1);
                move2.appendChild(option2);
                move3.appendChild(option3);
                move4.appendChild(option4);
            }

        })
        .catch(function (error) {
            alert(error.message);
        });
});


// When Add to Team button is clicked
addBtn.addEventListener("click", function () {

    if (currentPokemon === null) {
        alert("Find a Pokemon first");
        return;
    }

    // Get selected moves
    var selectedMoves = [
        move1.value,
        move2.value,
        move3.value,
        move4.value
    ];

    // Create table row
    var row = document.createElement("tr");

    // Left side - sprite
    var spriteCell = document.createElement("td");
    spriteCell.className = "teamSpriteCell";

    var spriteImg = document.createElement("img");
    spriteImg.className = "teamSprite";
    spriteImg.src = currentPokemon.sprites.front_default;

    spriteCell.appendChild(spriteImg);

    // Right side - moves list
    var movesCell = document.createElement("td");
    movesCell.className = "teamMovesCell";

    var ul = document.createElement("ul");
    ul.className = "movesList";

    for (var i = 0; i < selectedMoves.length; i++) {
        var li = document.createElement("li");
        li.textContent = selectedMoves[i];
        ul.appendChild(li);
    }

    movesCell.appendChild(ul);

    row.appendChild(spriteCell);
    row.appendChild(movesCell);

    teamBody.appendChild(row);

});
