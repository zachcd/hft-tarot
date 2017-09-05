
// Connect to the game
const client = new HFT.GameClient();
client.on('connect', handleConnect);
client.on('disconnect', handleDisconnect);
client.on('draw', handleDraw);
client.on('filter', handleFilter);
client.on('bidAsk', handleBid);
client.on('six', handlesix);


var hand = []
var touchArea = document.getElementById("toucharea")
var dog = false

function handleConnect() {
  // nothing to do here though maybe we don't want to
  // send any touch events until we've connected for example.
}

function handleDisconnect() {
  touchArea.textContent = "...disconnected...";
}

function handleDraw(cards) {
  if (!Array.isArray(cards)) {
    let cards = [cards]
  }
  console.log(cards)
  let handDiv = document.getElementById("hand")
  cards.cards.forEach((card) => {
    hand.push(card)
    let cardContainer = document.createElement("div") //creates the card
    cardContainer.id = card.name //creates place for the title
    cardContainer.className = "card"
    let cardNameContainer = document.createElement("h2") //type of header
    let cardName = document.createTextNode(card.name);
    cardNameContainer.appendChild(cardName) //adds card name
    let cardPlayButton = document.createElement("button") //make a button
    let text = document.createTextNode("Play Card"); // give buttons text
    cardPlayButton.addEventListener('click', () => {
      if(dog) {
        setAside(card)
      } else {
        playCard(card)
      }
    })
    cardPlayButton.disabled = true

    cardPlayButton.appendChild(text)
    handDiv.appendChild(cardContainer)
    cardContainer.appendChild(cardNameContainer)
    cardContainer.appendChild(cardPlayButton)
  })

}

function handleFilter(filter) { //filter codes: 0 - all available, 1 - suit to trumps, 2- not set yet
  let elements = document.getElementById("hand").children

  hand.forEach((card, index) => {
    if (isEnabled(card, filer)) {
      elements[index].children[1].disabled = true
    } else {
      elements[index].children[1].disabled = false
    }
  })
}

function six() {
  let elements = document.getElementById("hand").children

  hand.forEach((card, index) => {
    if (card.suit ==="Major" || card.strength === 14) {
      elements[index].children[1].disabled = true
    } else {
      elements[index].children[1].disabled = false
    }
  })
  dog = []
}

function setAside(card) {
  let elements = handDiv.children
  let index = hand.indexOf(card)
  elements[index].remove()
  hand.splice(index, 1)
  dog.push(card)
  if(dog.length >= 6) {
    client.sendCmd('side', {cards: dog})
    dog = false
  }
}

function handleBid(currentBidData) {
  let currentBid = currentBidData.lead
  console.log(currentBid)
  let overlay = document.getElementById("bidOverlay")
  overlay.style.display = 'visible'
  if (currentBid <1) {
    let smallDoggoButton = document.createElement("button")
    let textSmallDoggo = document.createTextNode("One - Put the 6 cards in your hand and remove 6 of your choice except kings and power cards.")
      let pressSmallDoggo = document.createTextNode ("Bid One")
      let smallDoggoContainer = document.createElement("div")
      smallDoggoContainer.appendChild(textSmallDoggo)
      smallDoggoContainer.appendChild(smallDoggoButton)
      smallDoggoButton.appendChild(pressSmallDoggo)
      overlay.appendChild(smallDoggoContainer)
      smallDoggoButton.addEventListener('click', () => {
        bid(1)
      })
    }
    if (currentBid < 2) {
        let mediumDoggoButton = document.createElement("button")
    let textMediumDoggo = document.createTextNode("Two - Same as 1 with a higher multiplier")
      let pressMediumDoggo = document.createTextNode ("Bid Two")
      let mediumDoggoContainer = document.createElement("div")
      mediumDoggoContainer.appendChild(textMediumDoggo)
      mediumDoggoContainer.appendChild(mediumDoggoButton)
      mediumDoggoButton.appendChild(pressMediumDoggo)
      overlay.appendChild(mediumDoggoContainer)
      mediumDoggoButton.addEventListener('click', () => {
        bid(2)
      })
    }

    if (currentBid < 3) {
    let bigDoggoButton = document.createElement("button")
    let textBigDoggo = document.createTextNode("Three - Put the 6 cards in your score pile without looking at them.")
      let pressBigDoggo = document.createTextNode ("Bid Three")
      let bigDoggoContainer = document.createElement("div")
      bigDoggoContainer.appendChild(textBigDoggo)
      bigDoggoContainer.appendChild(bigDoggoButton)
      bigDoggoButton.appendChild(pressBigDoggo)
      overlay.appendChild(bigDoggoContainer)
      bigDoggoButton.addEventListener('click', () => {
        bid(3)
      })
    }

    if (currentBid < 4) {
  let hugeDoggoButton = document.createElement("button")
  let textHugeDoggo = document.createTextNode("Four - Give the 6 cards to the other three players.")
    let pressHugeDoggo = document.createTextNode ("Bid Four")
    let hugeDoggoContainer = document.createElement("div")
    hugeDoggoContainer.appendChild(textHugeDoggo)
    hugeDoggoContainer.appendChild(hugeDoggoButton)
    hugeDoggoButton.appendChild(pressHugeDoggo)
    overlay.appendChild(hugeDoggoContainer)
    hugeDoggoButton.addEventListener('click', () => {
      bid(4)
    })
  }

  let passOnDoggoButton = document.createElement("button")
  let textPassOnDoggo = document.createTextNode("Pass - You will not bid.")
    let pressPassOnDoggo = document.createTextNode ("Pass")
    let passOnDoggoContainer = document.createElement("div")
    passOnDoggoContainer.appendChild(textPassOnDoggo)
    passOnDoggoContainer.appendChild(passOnDoggoButton)
    passOnDoggoButton.appendChild(pressPassOnDoggo)
    overlay.appendChild(passOnDoggoContainer)
    passOnDoggoButton.addEventListener('click', () => {
      bid(0)
    })
}

function isEnabled(card, filter) {
  if (filter.code === 0) {
    return true
  } else if (filter.code ===1) {
    return card.suit === filter.suit
  } else {
    return false //other filter
  }
}

function playCard(card) {
  let elements = handDiv.children
  client.sendCmd('play', card)
  let index = hand.indexOf(card)
  elements[index].remove()
  hand.splice(index, 1)
  hand.forEach((card, index) => {
    elements[index].children[1].disabled = true
  })
}
function bid(amount) {
  client.sendCmd('bid', amount)
    let overlay = document.getElementById("bidOverlay")
    overlay.style.display = 'none'
}
