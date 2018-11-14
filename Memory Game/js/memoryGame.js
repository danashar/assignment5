const cardsArray = [{
  'name': 'cat1',
  'img': './images/ca1.jpg',
},
{
  'name': 'cat2',
  'img': './images/ca2.jpg',
},
{
  'name': 'cat3',
  'img': './images/ca3.jpg',
},
{
  'name': 'cat4',
  'img': './images/ca4.jpg',
},
{
  'name': 'cat5',
  'img': './images/ca5.jpg',
},
{
  'name': 'cat6',
  'img': './images/ca6.jpg',
},
];

var gameGrid = null;

var firstCard = null;
var secondCard = null;
var cardsActive = true;
var pairs = 0;

function randomizeCards() {
  gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
}

function clearWrongCards() {
  firstCard.children[0].style.display = "block";
  firstCard.children[1].style.display = "none";

  secondCard.children[0].style.display = "block";
  secondCard.children[1].style.display = "none";

  firstCard = null;
  secondCard = null;
  cardsActive = true;

}

function flipCard(card) {
  var front = card.children[0];
  var back = card.children[1];

  if (window.getComputedStyle(front).display === "block") {
    //showing card
    front.style.display = "none";
    back.style.display = "block";

    if (firstCard == null) {
      firstCard = card;
    }
    else {
      secondCard = card;
    }

    if (firstCard != null && secondCard != null) {
      if (firstCard.dataset.name == secondCard.dataset.name) {
        //check if cards are the same
        firstCard.removeEventListener('click', cardClicked);
        secondCard.removeEventListener('click', cardClicked);
        pairs += 1;

        firstCard = null;
        secondCard = null;

        if (pairs == 6) {
          //alert('you won!');
          document.getElementsByClassName("modal")[0].style.display = "block";

        }

      }
      else {
        //flip back the cards
        cardsActive = false;
        window.setTimeout(clearWrongCards, 1000);

      }
    }


  }
  else {
    // hiding card
    front.style.display = "block";
    back.style.display = "none";

    if (firstCard == card) {
      firstCard = null;
    }
    else {
      secondCard = null;
    }


  }
}

function cardClicked(event) {
  if (cardsActive) {
    flipCard(this);
  }

}

function addCardsToScreen() {
  var gameContainer = document.getElementById('game');

  // add all cards to screen
  for (var i = 0; i < gameGrid.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i]['name'];

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = "url(" + gameGrid[i]['img'] + ")";

    gameContainer.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', cardClicked);
  }
}

function initGame() {
  cardsActive = true;
  pairs = 0;
  firstCard = null;
  secondCard = null;

  randomizeCards()
  var gameContainer = document.getElementById('game');
  gameContainer.innerHTML = "";
  addCardsToScreen();
}

function closePop() {
  document.getElementsByClassName("modal")[0].style.display = 'none';
}


document.getElementById('newGameBtn').addEventListener('click', initGame);
document.getElementById('newGameBtn-pop').addEventListener('click', initGame);
document.getElementById('newGameBtn-pop').addEventListener('click', closePop);
initGame();

document.getElementsByClassName('close-btn clickable')[0].addEventListener('click', closePop);


