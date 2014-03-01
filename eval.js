var mingyQuest = require('./lib/index')
  , Prop = mingyQuest.Prop
  , Location = mingyQuest.Location
  , Game = mingyQuest.Game
  , mingy = require('mingy')
  , Parser = mingy.Parser

var parser = new Parser()

var game = new Game(parser)
.addElementType('Location', __dirname + '/lib/location.js', 'locations')

game.addElementFromYamlFile('Location', __dirname + '/games/daydream/locations/bedroom.yaml')
console.log(game.locations);
