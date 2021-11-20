const request = require('request');
const fs = require('fs');
const { exit } = require('process');
const urlInputs = process.argv.slice(2);
const domainLink = urlInputs[0];
const specifiedPath = urlInputs[1];

fs.access(specifiedPath, (err) =>{
  if (err) throw err;
});

request(domainLink, (error, response, body) => {
  if (error) {
    console.log(`Error due to an URL error or non-200`);
    exit();
  }

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