'use strict';

// Connect to the game
var client = new HFT.GameClient();
client.on('connect', handleConnect);
client.on('disconnect', handleDisconnect);
client.on('draw', handleDraw);
client.on('filter', handleFilter);
client.on('bidAsk', handleBid);

var hand = [];
var touchArea = document.getElementById("toucharea");

function handleConnect() {
  // nothing to do here though maybe we don't want to
  // send any touch events until we've connected for example.
}

function handleDisconnect() {
  touchArea.textContent = "...disconnected...";
}

function handleDraw(cards) {
  if (!Array.isArray(cards)) {
    var _cards = [_cards];
  }
  console.log(cards);
  var handDiv = document.getElementById("hand");
  cards.cards.forEach(function (card) {
    hand.push(card);
    var cardContainer = document.createElement("div"); //creates the card
    cardContainer.id = card.name; //creates place for the title
    cardContainer.className = "card";
    var cardNameContainer = document.createElement("h2"); //type of header
    var cardName = document.createTextNode(card.name);
    cardNameContainer.appendChild(cardName); //adds card name
    var cardPlayButton = document.createElement("button"); //make a button
    var text = document.createTextNode("Play Card"); // give buttons text
    cardPlayButton.addEventListener('click', function () {
      playCard(card);
    });
    cardPlayButton.disabled = true;

    cardPlayButton.appendChild(text);
    handDiv.appendChild(cardContainer);
    cardContainer.appendChild(cardNameContainer);
    cardContainer.appendChild(cardPlayButton);
  });
}

function handleFilter(filter) {
  //filter codes: 0 - all available, 1 - suit to trumps, 2- not set yet
  var elements = document.getElementById("hand").children;

  hand.forEach(function (card, index) {
    if (isEnabled(card, filer)) {
      elements[index].children[1].disabled = true;
    } else {
      elements[index].children[1].disabled = false;
    }
  });
}

function handleBid(currentBidData) {
  var currentBid = currentBidData.lead;
  console.log(currentBid);
  var overlay = document.getElementById("bidOverlay");
  overlay.style.display = 'visible';
  if (currentBid < 1) {
    var smallDoggoButton = document.createElement("button");
    var textSmallDoggo = document.createTextNode("One - Put the 6 cards in your hand and remove 6 of your choice except kings and power cards.");
    var pressSmallDoggo = document.createTextNode("Bid One");
    var smallDoggoContainer = document.createElement("div");
    smallDoggoContainer.appendChild(textSmallDoggo);
    smallDoggoContainer.appendChild(smallDoggoButton);
    smallDoggoButton.appendChild(pressSmallDoggo);
    overlay.appendChild(smallDoggoContainer);
    smallDoggoButton.addEventListener('click', function () {
      bid(1);
    });
  }
  if (currentBid < 2) {
    var mediumDoggoButton = document.createElement("button");
    var textMediumDoggo = document.createTextNode("Two - Same as 1 with a higher multiplier");
    var pressMediumDoggo = document.createTextNode("Bid Two");
    var mediumDoggoContainer = document.createElement("div");
    mediumDoggoContainer.appendChild(textMediumDoggo);
    mediumDoggoContainer.appendChild(mediumDoggoButton);
    mediumDoggoButton.appendChild(pressMediumDoggo);
    overlay.appendChild(mediumDoggoContainer);
    mediumDoggoButton.addEventListener('click', function () {
      bid(2);
    });
  }

  if (currentBid < 3) {
    var bigDoggoButton = document.createElement("button");
    var textBigDoggo = document.createTextNode("Three - Put the 6 cards in your score pile without looking at them.");
    var pressBigDoggo = document.createTextNode("Bid Three");
    var bigDoggoContainer = document.createElement("div");
    bigDoggoContainer.appendChild(textBigDoggo);
    bigDoggoContainer.appendChild(bigDoggoButton);
    bigDoggoButton.appendChild(pressBigDoggo);
    overlay.appendChild(bigDoggoContainer);
    bigDoggoButton.addEventListener('click', function () {
      bid(3);
    });
  }

  if (currentBid < 4) {
    var hugeDoggoButton = document.createElement("button");
    var textHugeDoggo = document.createTextNode("Four - Give the 6 cards to the other three players.");
    var pressHugeDoggo = document.createTextNode("Bid Four");
    var hugeDoggoContainer = document.createElement("div");
    hugeDoggoContainer.appendChild(textHugeDoggo);
    hugeDoggoContainer.appendChild(hugeDoggoButton);
    hugeDoggoButton.appendChild(pressHugeDoggo);
    overlay.appendChild(hugeDoggoContainer);
    hugeDoggoButton.addEventListener('click', function () {
      bid(4);
    });
  }

  var passOnDoggoButton = document.createElement("button");
  var textPassOnDoggo = document.createTextNode("Pass - You will not bid.");
  var pressPassOnDoggo = document.createTextNode("Pass");
  var passOnDoggoContainer = document.createElement("div");
  passOnDoggoContainer.appendChild(textPassOnDoggo);
  passOnDoggoContainer.appendChild(passOnDoggoButton);
  passOnDoggoButton.appendChild(pressPassOnDoggo);
  overlay.appendChild(passOnDoggoContainer);
  passOnDoggoButton.addEventListener('click', function () {
    bid(0);
  });
}

function isEnabled(card, filter) {
  if (filter.code === 0) {
    return true;
  } else if (filter.code === 1) {
    return card.suit === filter.suit;
  } else {
    return false; //other filter
  }
}

function playCard(card) {
  var elements = handDiv.children;
  client.sendCmd('play', card);
  var index = hand.indexOf(card);
  elements[index].remove();
  hand.splice(index, 1);
  hand.forEach(function (card, index) {
    elements[index].children[1].disabled = true;
  });
}
function bid(amount) {
  client.sendCmd('bid', amount);
  var overlay = document.getElementById("bidOverlay");
  overlay.style.display = 'none';
}