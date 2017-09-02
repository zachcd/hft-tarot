function generateSuit(suit){
  let generatedSuit= [
  {
  name: "Ace of " + suit,
  suit: suit,
  strength: 1,
  points: .5,
  oudler: false,
  },
  {
  name: "Two of " + suit,
  suit: suit,
  strength: 2,
  points: .5,
  oudler: false,
  },
  {
  name: "Three of " + suit,
  suit: suit,
  strength: 3,
  points: .5,
  oudler: false,
  },
  {
  name: "Four of " + suit,
  suit: suit,
  strength: 4,
  points: .5,
  oudler: false,
  },
  {
  name: "Five of " + suit,
  suit: suit,
  strength: 5,
  points: .5,
  oudler: false,
  },
  {
  name: "Six of " + suit,
  suit: suit,
  strength: 6,
  points: .5,
  oudler: false,
  },
  {
  name: "Seven of " + suit,
  suit: suit,
  strength: 7,
  points: .5,
  oudler: false,
  },
  {
  name: "Eight of " + suit,
  suit: suit,
  strength: 8,
  points: .5,
  oudler: false,
  },
  {
  name: "Nine of " + suit,
  suit: suit,
  strength: 9,
  points: .5,
  oudler: false,
  },
  {
  name: "Ten of " + suit,
  suit: suit,
  strength: 10,
  points: .5,
  oudler: false,
  },
  {
  name: "Page of " + suit,
  suit: suit,
  strength: 11,
  points: 1.5,
  oudler: false,
  },
  {
  name: "Knight of " + suit,
  suit: suit,
  strength: 12,
  points: 2.5,
  oudler: false,
  },
  {
  name: "Queen of " + suit,
  suit: suit,
  strength: 13,
  points: 3.5,
  oudler: false,
  },
  {
  name: "King of " + suit,
  suit: suit,
  strength: 14,
  points: 4.5,
  oudler: false,
  },

]
}

const majorCards = [{
  name: "The World",
  suit: "Major",
  strength: 21,
  points: 4.5,
  oudler: true
},
{
  name: "Judgement",
  suit: "Major",
  strength: 20,
  points: .5
  oudler: false
},
{
name: "The Sun",
suit: "Major"
strength: 19,
points: .5,
oudler: false,
},
{
name: "The Moon",
suit: "Major"
strength: 18,
points: .5,
oudler: false,
},
{
name: "The Star",
suit: "Major"
strength: 17,
points: .5,
oudler: false,
},
{
name: "The Happies",
suit: "Major"
strength: 16,
points: .5,
oudler: false,
},
{
name: "The Devil",
suit: "Major"
strength: 15,
points: .5,
oudler: false,
},
{
name: "Temperance",
suit: "Major"
strength: 14,
points: .5,
oudler: false,
},
{
name: "Death",
suit: "Major"
strength: 13,
points: .5,
oudler: false,
},
{
name: "the Hanged Man",
suit: "Major"
strength: 12,
points: .5,
oudler: false,
},
{
name: "Justice",
suit: "Major"
strength: 11,
points: .5,
oudler: false,
},
{
name: "Wheeeeee! of Fortune",
suit: "Major"
strength: 10,
points: .5,
oudler: false,
},
{
name: "The Smelly Hermit Who Doesnt Do His Laundry",
suit: "Major"
strength: 9,
points: .5,
oudler: false,
},
{
name: "Strenth",
suit: "Major"
strength: 8,
points: .5,
oudler: false,
},
{
name: "The Chariot",
suit: "Major"
strength: 7,
points: .5,
oudler: false,
},
{
name: "BD and Lifan",
suit: "Major"
strength: 6,
points: .5,
oudler: false,
},
{
name: "The Hierophant",
suit: "Major"
strength: 5,
points: .5,
oudler: false,
},
{
name: "The Emperor",
suit: "Major"
strength: 4,
points: .5,
oudler: false,
},
{
name: "The Empress",
suit: "Major"
strength: 3,
points: .5,
oudler: false,
},
{
name: "The High Priestess",
suit: "Major"
strength: 2,
points: .5,
oudler: false,
},
{
name: "The Magician",
suit: "Major"
strength: 1,
points: 4.5,
oudler: false,
},
{
name: "The Fool",
suit: "Major"
strength: 0,
points: 4.5,
oudler: false,
},


]





export default const tarotDeck = [
  ...generateSuit ("Cups"),
  ...generateSuit ("Wands"),
  ...generateSuit ("Pentacles"),
  ...generateSuit ("Swords"),
  ...majorCards
]
