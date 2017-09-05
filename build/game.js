"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//defines that there is javascript inside
var happyfuntimes = require('happyfuntimes'); // imports the library of happyfuntimes

var globals = { // globals is the state of the game, where you store things other parts of the game need access to
  playerId: 0,
  players: [],
  currentlyPlaying: false,
  disconnected: []
};

function randInt(min, max) {
  // random number generator
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min | 0;
}

var Player = function () {
  function Player(netPlayer, id) {
    _classCallCheck(this, Player);

    //making new instances of the class, contructor calls the function to set it up
    this.netPlayer = netPlayer;
    this.name = "Player " + name;
    this.id = id;
    console.log(this.name + " joined");
    netPlayer.addEventListener('disconnect', Player.prototype.disconnect.bind(this));
    netPlayer.addEventListener('play', Player.prototype.playCard.bind(this));
    netPlayer.addEventListener('bid', Player.prototype.bid.bind(this));
  }

  _createClass(Player, [{
    key: "playCard",
    value: function playCard(card) {
      console.log(this.name + " played " + card);
      globals.currentlyPlaying.currentTrick[globals.currentlyPlaying.players.indexOf(this)] = _extends({}, card, { player: globals.currentlyPlaying.players.indexOf(this) });
    }
  }, {
    key: "bid",
    value: function bid(_bid) {
      console.log(this.name + " bid " + _bid);
      if (_bid) {
        globals.currentlyPlaying.topBid = { value: _bid.data, player: globals.currentlyPlaying.players.indexOf(this) };
      } else {
        globals.currentlyPlaying.passed[globals.currentlyPlaying.players.indexOf(this)] == true;
        globals.currentlyPlaying.passedCount = globals.currentlyPlaying.passedCount++;
      }
      globals.currentlyPlaying.nextBid((globals.currentlyPlaying.players.indexOf(this) + 1) % 4);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var ndx = globals.players.indexOf(this); //index of takes the array and searches through it to find the index for the player
      if (ndx >= 0) {
        globals.players.splice(ndx, 1); //splice is removing
      }
    }
  }, {
    key: "sendDraw",
    value: function sendDraw(cards) {
      this.netPlayer.sendCmd('draw', {
        cards: cards
      });
    }
  }, {
    key: "askBid",
    value: function askBid(currentBid) {
      if (!currentBid) {
        this.netPlayer.sendCmd('bidAsk', {
          lead: 0
        });
      } else {
        this.netPlayer.sendCmd('bidAsk', {
          lead: currentBid
        });
      }
    }
  }, {
    key: "askPlay",
    value: function askPlay(filter) {
      this.netPlayer.sendCmd('filter', filter);
    }
  }]);

  return Player;
}();

var TarotGame = function () {
  function TarotGame(players) {
    var deck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : shuffle(tarotDeck);

    _classCallCheck(this, TarotGame);

    this.deck = deck;
    this.doggo = []; //deck is 78
    this.players = shuffle(players);
    this.handBackup = [];
    this.topBid = {};
    this.passed = [];
    this.passedCount = 0;
    this.currentTrick = [];
    this.scorePiles = new Array(4);

    while (this.deck.length > 0) {
      this.deal3(0);
      this.deal3(1);
      this.doggo.push(this.deck.pop());
      this.deal3(2);
      this.deal3(3);
    }

    this.enterBidding();
  }

  _createClass(TarotGame, [{
    key: "deal3",
    value: function deal3(playerIndex) {
      var packet = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
      this.players[playerIndex].sendDraw(packet);
      if (this.handBackup[playerIndex]) {
        this.handBackup[playerIndex] = [].concat(_toConsumableArray(this.handBackup[playerIndex]), packet);
      } else {
        this.handBackup.push([]);
        this.handBackup[playerIndex] = [].concat(_toConsumableArray(this.handBackup[playerIndex]), packet);
      }
    }
  }, {
    key: "enterBidding",
    value: function enterBidding() {
      this.players[0].askBid(0);
    }
  }, {
    key: "nextBid",
    value: function nextBid(playerIndex) {
      if (this.topBid.value === 4) {
        this.enterPlay();
      } else if (this.passed[playerIndex] !== true) {
        this.players[playerIndex].askBid(this.topBid.value);
      } else if (this.passedCount < 3) {
        this.nextBid(playerIndex++);
      } else {
        this.enterPlay();
      }
    }
  }, {
    key: "enterPlay",
    value: function enterPlay() {
      console.log("top bid is: " + this.topBid);
      if (this.topBid.value === 1 || this.topBid.value === 2) {
        this.players[this.topBid.player].sendDraw(this.doggo);
      } else if (topBid.value === 3) {
        this.scorePiles[this.topBid.player].sendDraw(this.doggo);
      } else if (topBid.value === 4) {
        this.scorePiles[this.topBid.player + 1].sendDraw(this.doggo);
      }
      this.startRound(this.topBid.player);
    }
  }, {
    key: "startRound",
    value: function startRound(player) {
      console.log("Round started");
      this.players[player].askPlay({ code: 0 });
    }
  }, {
    key: "nextCard",
    value: function nextCard(playerIndex) {
      if (this.currentTrick.length <= 3) {
        this.players[playerIndex].askPlay({ code: 1, suit: this.currentTrick[0].suit });
      } else {
        scoreTrick();
      }
    }
  }, {
    key: "scoreTrick",
    value: function scoreTrick() {
      var top = this.currentTrick[0];
      for (var i = 0; i < 4; i++) {
        if (this.currentTrick[i].name = "The Fool") {
          this.scorePiles[this.currentTrick[i].player] = [].concat(_toConsumableArray(this.scorePiles[this.currentTrick[i].player]), [this.currentTrick[i]]);
          this.currentTrick.splice(i, 1);
        } else {
          if (top.suit === "Major" && this.currentTrick[i].suit === "Major" && this.currentTrick[i].strength > top.strength) {
            top = this.currentTrick[i];
          } else if (top.suit !== "Major" && this.currentTrick[i].suit === "Major") {
            top = this.currentTrick[i];
          } else if (top.suit === this.currentTrick[i].suit && this.currentTrick[i].strength > top.strength) {
            top = this.currentTrick[i];
          }
        }
      }
      this.scorePiles[top.player] = [].concat(_toConsumableArray(this.scorePiles[top.player]), _toConsumableArray(this.currentTrick));
      this.currentTrick = [];
      if (this.scorePiles[0].length + this.scorePiles[1].length + this.scorePiles[2].length + this.scorePiles[3].length >= 78) {
        endGame();
      }
    }
  }, {
    key: "endGame",
    value: function endGame() {
      var oudlerCount = 0;
      var score = 0;
      scorePiles[this.topBid.player].forEach(function (card) {
        if (card.oudler) {
          oudlerCount++;
        }
        score += card.points;
      });
      if (oudlerCount >= 0 && score >= 56) {
        console.log("Taker won");
      } else if (oudlerCount >= 1 && score >= 51) {
        console.log("Taker won");
      } else if (oudlerCount >= 2 && score >= 41) {
        console.log("Taker won");
      } else if (oudlerCount >= 3 && score >= 36) {
        console.log("Taker won");
      } else {
        console.log("Taker Lost");
      }
    }
  }]);

  return TarotGame;
}();

function shuffle(array) {
  var m = array.length,
      t,
      i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var server = new happyfuntimes.GameServer();

// A new player has arrived.
server.on('playerconnect', function (netPlayer) {
  var newPlayer = new Player(netPlayer, ++globals.playerId);
  globals.players.push(newPlayer);
  if (globals.players.length == 4) {
    if (globals.currentlyPlaying) {
      //if a boolean, autuomatically checks if true or not, if statements can only undertand T/F
      reconnect(newPlayer, globals.disconnected);
    } else {
      startGame();
    }
  }
});

function reconnect(player, disconnects) {}

function startGame() {
  globals.currentlyPlaying = new TarotGame(globals.players);
}