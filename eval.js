var mingyQuest = require('./lib/index')
  , Prop = mingyQuest.Prop
  , Location = mingyQuest.Location
  , Game = mingyQuest.Game
  , mingy = require('mingy')
  , Parser = mingy.Parser
  , Command = mingy.Command
  , fs= require('fs')
  , yaml = require('js-yaml')

# So game should load commands, then execute them when syntax matches

var file = '/Users/mike/programming/node/node-mingy-quest/commands/test.yaml';
var com = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
var name = 'rick';
var data = {};
var output = eval('(function(name, data) { ' + com.logic + '})(name, data)');
console.log('O:' + output);
console.log(data);

// need function (in game?) to add command to the parser
// how to allow command logic to get globals? lex scoping I guess
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
