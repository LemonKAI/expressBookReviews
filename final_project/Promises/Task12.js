const axios = require('axios');

function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    axios.get(`https://ningtongqi-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${author}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Usage
getBooksByAuthor("Unknown")
  .then(books => {
    console.log(books);
  })
  .catch(error => {
    console.error(error);
  });