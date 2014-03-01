var mingyQuest = require('./lib/index')
  , Prop = mingyQuest.Prop
  , Location = mingyQuest.Location
  , Game = mingyQuest.Game
  , mingy = require('mingy')
  , Parser = mingy.Parser
  , Command = mingy.Command

var command = new Command('go')
command.set('syntax', ['go <direction>'])
command.set('logic', function(args) {
  if (!args || !args['direction']) {
    return 'What?'
  }
  else {
    return 'You go ' + args['direction'] + '.'
  }
})

var parser = new Parser([command])
var output = parser.parseLexemes(['go', 'north'])
console.log('O:' + output)

var game = new Game(parser)
.addElementType('Location', __dirname + '/lib/location.js', 'locations')

game.addElementFromYamlFile('Location', __dirname + '/games/daydream/locations/entrance.yaml')
console.log(game.locations);
