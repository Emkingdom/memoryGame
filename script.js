const gameContainer = document.getElementById("game");

let prev;
let match;
let next;
let counter = 0;
let score = {
  winner: 0,
  currentGuess: 0,
  bestScore: 0
}
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;
 
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let id = 0
  for (let color of colorArray) {
    id++
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.dataset.color = color;
    newDiv.dataset.match = false;
    newDiv.dataset.id = id;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const color = event.target.dataset.color;
  const id = event.target.dataset.id;

  if (event.target.dataset.match === 'false') {

    if (!prev) {
      prev = event.target;
      event.target.classList.add(color)

    } else {
      if (!(prev.dataset.id === id)) {
        match = event.target;
        match.classList.add(color);

        if (prev.dataset.color === match.dataset.color) {
          
         
          match.dataset.match = true;
          prev.dataset.match = true;
          match = undefined;
          prev = undefined;
          score.winner++
          score.currentGuess++

          if (score.winner === COLORS.length / 2) {

            console.log('you are the winner');
          }
        } else {
          
          setTimeout(() => {
            match.classList.remove(match.dataset.color);  
            prev.classList.remove(prev.dataset.color)
            match = undefined;
            prev = undefined;
          }, 400);
       
          score.currentGuess++
        }
      } else {
        console.log('SAME CARD')
      }
    }
  } else {
    console.log('COLOR DISCOVERD')
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
