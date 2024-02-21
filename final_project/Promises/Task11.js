const axios = require('axios');

function getBookDetails(isbn) {
  return new Promise((resolve, reject) => {
    axios.get(`https://ningtongqi-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${isbn}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Usage
getBookDetails(1)
  .then(book => {
    console.log(book);
  })
  .catch(error => {
    console.error(error);
  });