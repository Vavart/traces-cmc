// File: jsonUtils.mjs
// Author: Clara D. & Maxime S.
// Description: Utils functions to read / write JSON files

// Dependencies
import fs from 'fs';

// Function to create the JSON file
function createJsonFile(jsonFile, path){
    fs.writeFile(path, jsonFile, (err) => {
      if (err) throw err;
      console.log('File has been saved !');
    });
}

// Read the JSON file
function readJSONFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath));
}


export { createJsonFile, readJSONFile };