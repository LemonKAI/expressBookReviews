const axios = require('axios');

function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    axios.get(`https://ningtongqi-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${title}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Usage
getBooksByTitle("The Book Of Job")
  .then(books => {
    console.log(books);
  })
  .catch(error => {
    console.error(error);
  });