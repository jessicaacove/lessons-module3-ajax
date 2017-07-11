console.log('post.js is linked');

$(document).ready(() => {
  console.log('Page is ready');

  $('#postWalle').click((theEvent) => {
    const walleInfo = {
      name: "WALL-E",
      occupation: "robot",
      weapon: "laser"
    };

  postCharacterInfo(walleInfo);
  });

  $('#postCharacterForm').submit((theEvent) => {
    theEvent.preventDefault();

    const characterInfo = {
      name: $('#postCharacterName').val(),
      occupation: $('#postCharacterOccupation').val(),
      weapon: $('#postCharacterWeapon').val()
    };

    postCharacterInfo(characterInfo);
  });

  $('#updateForm').submit((theEvent) => {
    theEvent.preventDefault();

    const updatedInfo = {
      name: $('#updateName').val(),
      weapon: $('#updateWeapon').val(),
      occupation: $('#updateOccupation').val(),
    };

    const characterId = $('#updateCharacterId').val();

    updateCharacter(characterId, updatedInfo);
  });
});

function postCharacterInfo (newCharacterDetails) {
  // Post data to the characters api
  $.ajax({

    url: 'https://ih-api.herokuapp.com/characters',
    method: 'POST',

    // the "data" setting is only used when you need to send the api extra info
    data: newCharacterDetails,
          // "newCharacterDetails" is an object that contains:
          // name: , occupation: , and weapon: properties

    // if successful, put some of the data on the screen (DOM monipulation)
    success: (responseFromApi) => {
        console.log('posted yea');
        $('#characterList').append(`
          <li>
            <h3> ${responseFromApi.name} </h3>
            <p> Id: ${responseFromApi.id} </p>
          </li>
          `);
    },

    // if error, show error feedback (DOM manipulation)
    error: (errorFromApi) => {
        alert('Sorry! Character post error. 😑');
        console.log(errorFromApi);
    }
  });
}

function updateCharacter (myId, newInfo) {
  $.ajax({
    url: 'https://ih-api.herokuapp.com/characters/' + myId,
    method: 'PATCH',
    // the "data" setting is only used when you need to send the api extra info
    data: newInfo,

    // if successful, put some of the data on the screen (DOM monipulation)
    success: (responseFromApi) => {
      alert('update success');
      console.log(responseFromApi);
    },
    error: (errorFromApi) => {
      alert('i got an error and i am not happy');
      console.log(errorFromApi);
    }
  });
}
