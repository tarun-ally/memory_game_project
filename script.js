const gameContainer = document.getElementById("game");

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
  "purple"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
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
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let flipped = 0;
let count=0;
let previousColor;
let previousId = null;



// TODO: Implement this function!
let clickedCard =null;

function handleCardClick(e) {
    const target = e.currentTarget;
    // if
    if(target == clickedCard || target.classList.contains('done')){
        return;
    }
    if (count<2){

    if(!clickedCard){

        
        clickedCard = target;
        target.style.background = e.currentTarget.classList.value;
        target.classList.add('done');
        count+=1;
        // console.log('one click',target.style.background,e.currentTarget.classList.value,clickedCard);
    
    }else if(clickedCard){
        target.style.background = e.currentTarget.classList.value;
        target.classList.add('done');
        // console.log('nil',target.classList.value,clickedCard.classList.value);
        
        count+=1;
        if(clickedCard.classList.value ==
        target.classList.value ){
            target.style.background = e.currentTarget.classList.value;
            clickedCard.style.background = 'e.currentTarget.classList.value'; 
            clickedCard =null;
            flipped+=1;
            // console.log('equal',target.style.background,flipped);
            count=0;

            if(flipped ==5){
                setTimeout(()=>{

                    alert('game over!')
                },400);
            }
        }else{
            setTimeout(()=>{
                target.classList.remove('done');
                if(clickedCard!=null){
                    clickedCard.classList.remove('done');

                    clickedCard.style.background = '';
                }
                target.style.background = '';
                // console.log('not equal',clickedCard, 'name',target.classList);
                clickedCard =null;
                count=0;
            },1000);
        }
    }
}

}

// when the DOM loads
createDivsForColors(shuffledColors);


