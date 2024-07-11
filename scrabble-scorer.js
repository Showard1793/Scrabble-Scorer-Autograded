// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

//Testing oldScrabbleScorer ++
/* console.log(oldScrabbleScorer(initialPrompt())) */

let newPointStructure = transform(oldPointStructure);

//testing newPointStructure ++
/* console.log(newPointStructure); */

let simpleScorer = function(word){
   return word.length 
};

//Testing simpleScorer ++
/* console.log(simpleScorer("manners"))
 */

let vowelBonusScorer = function(word) {
   let score = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
     if (vowels.includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 }
 
//Testing vowelBonusScorer ++
/* console.log(vowelBonusScorer(initialPrompt())); */

//NEED TO FINISH
/* let scrabbleScorer; */

//WORK IN PROGRESS 
//object = newPointStructure.pointValue => A : 1

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
 
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
      letterPoints += newPointStructure[letter];
  }
  return letterPoints;
}

//testing scrabbleScorer ++
/* console.log(scrabbleScorer("Manatee")); */

//Make 3 scoring algorithm objects

let scoringAlgorithm1 = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.", 
  scorerFunction: simpleScorer
};

let scoringAlgorithm2 = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer
};

let scoringAlgorithm3 = {
  name: "Scrabble",
  description: "The new and improved scoring algorithm.",
  scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [scoringAlgorithm1, scoringAlgorithm2, scoringAlgorithm3];

//testing scoringAlgorithm ++
/* console.log(scoringAlgorithms); */

function scorerPrompt(word) {
  let scoringChoice = Number(input.question(
`-----------------------------------------------------
Which scoring algorithm would you like to use?

  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  
Enter 0, 1, or 2: `));

  if (scoringChoice !== 0 && scoringChoice !== 1 && scoringChoice !== 2){
     console.log(         
`-----------------------------------------------------
Invalid input. Please select one of the three options.`)
     return scorerPrompt(word);
  }

  let selectedAlgorithm = scoringAlgorithms[scoringChoice];
  
  let score = selectedAlgorithm.scorerFunction(word);
 
 console.log(
`-----------------------------------------------------
Your score for '${word}': 
${score}`);

//Test scoringAlgorithms[(scoringChoice) gives a value. ++
/* console.log(scoringAlgorithms[(scoringChoice)]) */ 

//returns "undefined." Don't know why because the console log above prints the object
  return scoringAlgorithms[(scoringChoice)];
}

//Testing scorerPrompt +
/* console.log(scorerPrompt()) */

//TO DO: Make Function to take an object and make array of key value pairs ( [[A, 1], [E , 1]...])

function makeArrayofKeyValuePairs(object){
  let letter;
  let points;
  let keyValuePair;
  let arrayOfkeyValuePairs = [];

  for (pointValues in object){
     for (i = 0; i < object[pointValues].length; i++){
        points = Number(pointValues);
        letter = object[pointValues][i].toLowerCase();
        keyValuePair = [letter, points];
        arrayOfkeyValuePairs.push(keyValuePair);
     }
  }
  return arrayOfkeyValuePairs;
}

//testing makeArrayofKeyValuePairs ++
/* console.log(makeArrayofKeyValuePairs(oldPointStructure)); */

//Take an array of Key/Value pairs and turn it into an object with [0] being "Key" and [1] being "value"

//TEST
let testarr = [
  [ 'A', 1 ],  [ 'E', 2 ],
  [ 'I', 3 ],]


function createNewObject(arr){
  let object = {};
  for (i = 0; i < arr.length; i++){
     object[arr[i][0]] = arr[i][1]
  }
  return object;
}

//Testing createNewObject ++
/* console.log(createNewObject(testarr)); */

function transform(object) {
  let arr = makeArrayofKeyValuePairs(object);
  return createNewObject(arr);
};

//Test transform function ++
/* console.log(transform(oldPointStructure)) */

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

//Testing runProgram ++
console.log(runProgram());

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
