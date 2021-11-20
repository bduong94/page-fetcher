const request = require('request');
const fs = require('fs');
const urlInputs = process.argv.slice(2);
const domainLink = urlInputs[0];
const specifiedPath = urlInputs[1];

request(domainLink, (error, response, body) => {
  fs.writeFile(specifiedPath, body, function(err) {
    if (err) throw err;
  });

  fs.stat(specifiedPath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Downloaded and saved ${stats.size} bytes to ${specifiedPath}`);
  });
});