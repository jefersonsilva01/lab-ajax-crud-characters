class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.BASE_URL}/characters/`)
        .then(response => {
          console.log(response);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    });
  }

  getOneRegister(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.BASE_URL}/characters/${id}`)
        .then(response => {
          console.log(response);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    })
  }

  createOneRegister(characterInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.BASE_URL}/characters`, characterInfo)
        .then(response => {
          console.log(response);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    })
  }

  updateOneRegister(id, characterInfo) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${this.BASE_URL}/character/${id}`, characterInfo)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    })
  }

  deleteOneRegister(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.BASE_URL}/characters/${id}`)
        .then(response => {
          console.log(response);
          resolve('O personagem foi excluído com sucesso');
        })
        .catch(error => {
          console.log(error)
          reject('Caracter não encontrado');
        });
    })
  }
}
