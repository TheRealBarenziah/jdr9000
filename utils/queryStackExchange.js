const stackexchange = require("stackexchange");

const options = { version: 2.2 };
const context = new stackexchange(options);

module.exports = (query) => new Promise((resolve, reject) => {
  const backups = ["unix", "superuser", "askubuntu","dba"];
  let retryCounter = 0;
  let e; 

  const filter = {
    key: process.env.SE_API_KEY,
    pagesize: 50,
    // tagged: "node.js",
    sort: "relevance",
    order: "desc",
    q: query
  };


  // TODO! wrap in promise!!
  const querySe = () => context.search.advanced(filter, (err, results) => {
    console.log("execing querySe, obtw query : ", query, "filter: ", filter);

    if (err){
      console.log("error in querySe: ", err);
      e = err;
    }  

    if(results){
      console.log("if results! ");
      if(results.items){
        const output = results.items
          .sort((a, b) => {
            return Number(b.score) - Number(a.score);
          })
          .map(item => {
            console.log("item.score : ", item.score);
            return {
              site: filter.site ? filter.site : "stackoverflow",
              title: item.title,
              link: item.link,
              votes: item.score
            };
          });
					
        // sort by most voted;
        //output.sort(item => Number(item.votes) - Number(item.votes));
        //console.log("sorted nani ? ", output);
        // only get the first links
        resolve(output.slice(0, 3));
      }
      else{
        console.log("resutls exists, but no result.items ! ");
      }
    }

    else {
      filter["site"] = backups[retryCounter];
      retryCounter++;
      console.log("IM RETRYING !!! retryCounter after ++ : ", retryCounter);
      console.log("obtw filter.site : ", filter.site);
    }
  });

  if(retryCounter <= backups.length){
    try {
      console.log("im in yr while");
      querySe();
    } catch (error) {
      console.error("Error trying querySe():",error);
    }
  }


  if(e) {
    console.log("Perhaps the real response was the error we made along the way");
    reject(e);
  }
  // ELSE SHOULD SCRAP  "https://stackexchange.com/search?q=foo"
  resolve([{title: "SHOULD SCRAP !!! >.<"}]);
  
});

