var mingyQuest = require('./lib/index')
  , Game = mingyQuest.Game
  , mingy = require('mingy')
  , Parser = mingy.Parser
  , Shell = mingy.Shell


/*
GAME SHOULD PROLLY LOOK COMMANDS
shell should get game not parser
*/


var parser = new Parser()

//var output = parser.parseLexemes(['go', 'north'])

function startShell() {
  game.loadYamlFilesIntoGame(__dirname + '/games/daydream/locations', 'Location', function() {
    game.loadYamlFilesIntoGame(__dirname + '/games/daydream/props', 'Prop', function() {
      shell = new Shell(parser);
      shell.start();
    });
  });
}

var game = new Game(parser);

game.player = {
  'location': 'entrance'
}

game.addElementType('Location', __dirname + '/lib/location.js', 'locations')
.addElementType('Prop', __dirname + '/lib/prop.js', 'props')
.addPlayer('default')
.loadCommands(__dirname + '/commands', startShell)

//game.loadYamlFilesIntoGame(__dirname + '/games/daydream/locations', 'Location', startShell);
