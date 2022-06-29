var STANDARD_CUBES = [
"AAEEGN",
"ABBJOO",
"ACHOPS",
"AFFKPS",
"AOOTTW",
"CIMOTU",
"DEILRX",
"DELRVY",
"DISTTY",
"EEGHNW",
"EEINSU",
"EHRTVW",
"EIOSST",
"ELRTTY",
"HIMNQU",
"HLNNRZ"];
// algorithms
const shuffle = cubes => {
  const shuffled = cubes.map(eachCube => {
    // eachCube is a die with 6 sides
    // get random letter from the die between 1-6
    var rand = Math.floor(Math.random() * eachCube.length);
    // if we hit Q transform to Qu like real boggle - otherwise return the letter
    return eachCube[rand] === "Q" ? "Qu" : eachCube[rand];
  });
  return shuffled;
};
const fisherYates = array => { //fisher yates algorithm to generate new sequence until no elements are available for swapping
  var currentIndex = array.length,
  temporaryValue,
  randomIndex;
  while (0 !== currentIndex) {
    // checking if element avaialble between current and last index
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    // at the end swap the current element, get the value of the index, replace setInterval(function () {
    // with the new element value that is left
    //at the end copy the value of what left into the random index.
    }, 10);
  }
  return array;
};
//pointers
const g = document.getElementById("game");
const shuffleBtn = document.getElementById("shuffle");
const progressBar = document.getElementById("bar");
const words = document.getElementById("words");
const scoreCount = document.getElementById("score");
const allDice = document.getElementsByClassName("dice");

var count,
interval = undefined;
// runs at game end to calculate score
const scoreWords = () => {
  words.disabled = true; // disable text box
  var score = 0; // reset score
  const all = words.value.split("\n"); // storing words to an array to check them
  //checking each word stored in the array to evaluate its score
  all.forEach(eachOne => {
    //UPDATE LATER TO USE DICT API
    switch (eachOne.length) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        score += 1;
        break;
      case 4:
        score += 2;
        break;
      case 5:
        score += 3;
        break;
      case 6:
        score += 4;
        break;
      case 7:
        score += 5;
        break;
      case 8:
        score += 6;
        break;
      default:
        break;}

  });
  return score; //final score in int
};
// when our timer runs out
var endGame = () => {
  var score = scoreWords();
  scoreCount.innerHTML = `You have earned ${score} points!`;
};
// reset function
const reset = () => {
  count = 0;
  progressBar.style.width = "0%";
  progressBar.style.backgroundColor = "";
  words.disabled = false;
  scoreCount.innerHTML = "Find as many words as you can until time runs out.";
  words.value = "";
  //check if game is running
  if (interval) {
    // if found, reset
    clearInterval(interval);
    interval = undefined;
    reset();
    return;
  }
  //board and dice setting up
  var boardDice = shuffle(STANDARD_CUBES); // returns a 4*4 grid
  var distribute = fisherYates(boardDice); // distribute the array on the board
  // assign each dice to a div
  distribute.forEach((eachDice, i) => {
    document.getElementById((i + 1).toString()).innerHTML = eachDice;
  });
  //timer
  interval = setInterval(() => {
    if (count < 100) {//update the progress Bar
      progressBar.style.width = count + "%";
      if (count > 90) {// 90% has passed
        progressBar.style.backgroundColor = "red";
      }
    }
    count += 1;
    if (count >= 100) {//time is up
      progressBar.style.width = "100%";
      clearInterval(interval);
      setTimeout(() => {
        endGame();
      }, 2500); // giving some delay to calcule the results
    }
  }, 2500);

};
//shuffle button
shuffleBtn.onclick = e => {
  reset();
};
