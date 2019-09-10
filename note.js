module.exports = message => {
    message.reply('Writing that down...')	
	// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData = '{"ideas":[{"idea":"message"},{"idea":"message2"}]}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
  }