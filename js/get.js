$(document).ready(() => {
  console.log('Page is ready!');

  // When #pokebuton is clicked
  $('#pokeButton').click(() => {
    //do this
    getPokemonInfo(7);
      // pokemon #7
  });

  // When the form is submitted...
  $('#pokeSearchForm').submit((theEvent) => {
    // prevent the normal from submission page refresh
    theEvent.preventDefault();

    //retrieve what the user typed in the input (the input value)
    const pokeNumber = $('#pokemonId').val();

    //call "getPokemonInfo()" with the user's inputted number
    getPokemonInfo(pokeNumber);
  });
});

function getPokemonInfo (myId) {
  // fetch the data from the pokeapi
  $.ajax({ // 1st arg -> giant settings object
    url: 'http://pokeapi.co/api/v2/pokemon/' + myId,
    method: 'GET',

    // if successful, put some of the data on the screen (DOM monipulation)
    success: (responseFromApi) => {
        // The 1st parameter of the "success" callback
        // will always be the data we get from the API.
        console.log('Response for Pokemon ' + myId);
        console.log(responseFromApi);

        // responseFromApi.sprites.front_default
        $('#pokeInfo').html(`
          ${responseFromApi.name}
          <img src="${responseFromApi.sprites.front_default}">
        `);
    },

    // if error, show error feedback (DOM manipulation)
    error: (errorFromApi) => {
        alert('Sorry! Pokemon data error. 😑');
        console.log(errorFromApi);
    }
  });
}
