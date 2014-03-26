var mingyQuest = require('./lib')
  , Game = mingyQuest.Game
  , Player = mingyQuest.Player
  , mingy = require('mingy')
  , Parser = mingy.Parser
  , Shell = mingyQuest.Shell

var parser = new Parser()

//var output = parser.parseLexemes(['go', 'north'])

var game = new Game();

game.addElementType('Location', __dirname + '/lib/location.js', 'locations')
.addElementType('Prop', __dirname + '/lib/prop.js', 'props')
.addPlayer('default')
.loadYamlFilesIntoGame(__dirname + '/games/daydream/locations', 'Location', function() {
  game.loadYamlFilesIntoGame(__dirname + '/games/daydream/props', 'Prop', function() {
    game.player = new Player({props: game.props});
    game.player.location = 'entrance';

    var shell = new Shell(parser);
    shell.loadCommands(game, __dirname + '/commands', function() { shell.start(); })
  });
});
