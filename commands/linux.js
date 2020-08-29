const https = require('https');

// reference: https://www.commandlinefu.com/site/api#json

const fetchFromCommandLineFu = (param) => new Promise((resolve, reject) => {
  return https.get(`https://www.commandlinefu.com/commands/browse/sort-by-votes/json/load_into_page`, (res) => {

    let response = ""

    res.on('data', (d) => {
      response += d;
    });

    res.on("end", () => {
      resolve(response);
    });

  }).on('error', (e) => {
    console.error(e);
    reject(e);
  });
})

fetchFromCommandLineFu("python").then(res => {
  //console.log("res ? ", res)

  const dirtyArray = res.toString().substring(15) // remove first 15 characters from string, cf https://www.techiedelight.com/remove-first-character-string-javascript/
  const cleanArray = dirtyArray.slice(0, -1) // remove last character from string, cf https://flaviocopes.com/how-to-remove-last-char-string-js/
  console.log("cleanArray ? ", JSON.parse(cleanArray))


})

