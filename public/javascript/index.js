const charactersAPI = new APIHandler('http://localhost:8000');
const charactersContainer = document.querySelector('.characters-container');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    event.preventDefault();

    charactersAPI.getFullList()
      .then(data => {
        charactersContainer.innerHTML = '';
        data.forEach(element => {
          const text = `
            <div class="character-info">
              <div class="id">id: <span style="color: yellow;">${element.id}</span></div>
              <div class="name">Name: <span style="color: yellow;">${element.name}</span></div>
              <div class="occupation">Occupation: <span style="color: yellow;">${element.occupation}</span></div>
              <div class="cartoon">Is a Cartoon?: <span style="color: yellow;">${element.cartoon}</span></div>
              <div class="weapon">Weapon: <span style="color: yellow;">${element.weapon}</span></div>
            </div>  
          `
          charactersContainer.innerHTML += text;
        });
      })
      .catch(error => {
        console.error(error);
      })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault();

    const characterId = document.getElementsByName('character-id')[0].value;

    charactersAPI.getOneRegister(characterId)
      .then(data => {
        const text = `
          <div class="character-info">
            <div class="id">id: <span style="color: yellow;">${data.id}</span></div>
            <div class="name">Name: <span style="color: yellow;">${data.name}</span></div>
            <div class="occupation">Occupation: <span style="color: yellow;">${data.occupation}</span></div>
            <div class="cartoon">Is a Cartoon?: <span style="color: yellow;">${data.cartoon}</span></div>
            <div class="weapon">Weapon: <span style="color: yellow;">${data.weapon}</span></div>
          </div>  
        `
        charactersContainer.innerHTML = text;
      })
      .catch(error => {
        console.error(error);
      })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault();

    const characterIDDelete = document.getElementsByName('character-id-delete')[0].value;

    const deleteOneButton = document.getElementById('delete-one');

    charactersAPI.deleteOneRegister(characterIDDelete)
      .then(data => {
        console.log(data)
        charactersContainer.innerHTML = `
          <div class="character-info">
            <div class="name">Character Name</div>
            <div class="occupation">Character Occupation</div>
            <div class="cartoon">Is a Cartoon?</div>
            <div class="weapon">Character Weapon</div>
          </div>
        `;
        deleteOneButton.style.backgroundColor = 'green';
      })
      .catch(error => {
        console.log(error);
        deleteOneButton.style.backgroundColor = 'red';
      })
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault();

    let name, occupation, weapon, cartoon, characterInfo = {};

    const id = document.querySelector('#edit-character-form input[name="chr-id"]').value

    if (document.querySelector('#edit-character-form input[name="name"]').value) {
      name = document.querySelector('#edit-character-form input[name="name"]').value
      characterInfo.name = name;
    }

    if (document.querySelector('#edit-character-form input[name="occupation"]').value) {
      occupation = document.querySelector('#edit-character-form input[name="occupation"]').value
      characterInfo.occupation = occupation;
    }

    if (document.querySelector('#edit-character-form input[name="weapon"]').value) {
      weapon = document.querySelector('#edit-character-form input[name="weapon"]').value
      characterInfo.weapon = weapon;
    }

    if (document.querySelector('#edit-character-form input[name="cartoon"]').checked) {
      cartoon = document.querySelector('#edit-character-form input[name="cartoon"]').checked
      characterInfo.cartoon = cartoon;
    }

    const sendDataButton = document.querySelector('#edit-character-form button[id="send-data"]');

    console.log(characterInfo);

    charactersAPI.updateOneRegister(id, characterInfo)
      .then(data => {
        sendDataButton.style.backgroundColor = 'green';
      })
      .catch(error => {
        console.log(error)
        sendDataButton.style.backgroundColor = 'red';
      })
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault();

    const name = document
      .querySelector('#new-character-form input[name="name"]').value;

    const occupation = document
      .querySelector('#new-character-form input[name="occupation"]').value;

    const weapon = document
      .querySelector('#new-character-form input[name="weapon"]').value;

    const cartoon = document
      .querySelector('#new-character-form input[name="cartoon"]').checked;

    const characterInfo = { name, occupation, weapon, cartoon };

    const sendDataButton = document.querySelector('#new-character-form button[id="send-data"]');

    charactersAPI.createOneRegister(characterInfo)
      .then(data => {
        sendDataButton.style.backgroundColor = 'green';
      })
      .catch(error => {
        console.log(error)
        sendDataButton.style.backgroundColor = 'red';
      })
  });
});
