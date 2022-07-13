/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  if (!dinosaurs.length){ // edge case
    return {}
  }
  // we gonna be using the lengthinmeters key
  let longestLength = dinosaurs[0].lengthInMeters // initalize var to hold first dino length ( accumulator )
  let longestName = dinosaurs[0].name// store the name of the dinosaur 
  const longestDino = {}// initalize var to hold an empty object ( our return )
  // t(hrough each iteration; check the length in meters; store the first length as the record holder)
  for (const dino of dinosaurs){
    // if length in meters are higher then our record holder variable
    // if it is; update the variable to our accumulator as the highest.
    if(dino.lengthInMeters > longestLength){
      longestLength = dino.lengthInMeters
      longestName = dino.name
    }
  }
  
  // if it is not; go to the next iteration.

  // once a record is found ( or whole object of arrays is iterated through;)
  // convert from length of meters to feet by mult by 3.281
  longestLength *= 3.281
  
  longestDino[longestName] = longestLength
  // add the name of the longestName to the {} as a key,  and have the length as the value.
  // return the object storing our dino
  return longestDino

  //iterate over the dinosaurs

}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescraiption(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // declare var to hold the dino that we find that matches the id
  let dino = false
  // iterate through dinosaurs using for of
  // compare the parma id number against each iteration of the dinos id
  // if they are a match, update dino var to hold found dino info
  // return string formated to have this dinos info
  for (i = 0; i < dinosaurs.length; i++){
    if(id === dinosaurs[i].dinosaurId){
      dino = dinosaurs[i]
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1]} million years ago.`
    }
  }
  // guard clause, return an error message if the ID is incorrect or not found ( aka dino = false still after our for loop )
  // console.log(getDinosaurDescription(exampleDinosaurData, YLtkN9R3)) // test code
  return "A dinosaur with an ID of 'incorrect-id' cannot be found."
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // initalize our accumulator var that we will use to return at the end
  let dinos = []
// our logic goes here
// iterate over dinosaurs
for (const dinosaur of dinosaurs) {
  if(dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya){
    // add id to our accumulator if there is no key param
    if(key){
      dinos.push(dinosaur[key])
    } else {
      dinos.push(dinosaur["dinosaurId"])
    }
  } else if(dinosaur.mya.length === 1){
    if(dinosaur.mya[0] === mya || dinosaur.mya[0] - 1 === mya){
      if(key){
        dinos.push(dinosaur[key])
      } else {
        dinos.push(dinosaur['dinosaurID'])
      }
    }
  }
  }
  return dinos // is this the same as the range for loop
}
// if mya param is between dinos myas
// else if dinos mya.length is equal to 1
  // if mya param is equal to dinos mya OR if mya param is equal to dinos mya - 1
  // add id to our accumulator if there is no key param

  // return accumulator 


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
