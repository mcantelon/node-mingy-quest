var yaml = require('js-yaml'),
    mingy = require('mingy'),
    Shell = mingy.Shell,
    fs = require('fs'),
    path = require('path');

Shell.prototype.loadCommands = function(game, dir, cb) {

  var self = this;

console.log('ROllin');
  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    // create command from YAML data
    files.forEach(function(file) {
      var commandData = yaml.safeLoad(fs.readFileSync(path.join(dir, file), 'utf8'))
        , logic = eval('(function(game) { var player = game.player; var locations = game.locations; var props = game.props; var characters = game.characters; var doors = game.doors; var state = game.state; return function(arg, env) { ' + commandData.logic + '}; })(game)');

      self.parser.addCommand(path.basename(file))
      .set('syntax', commandData.syntax)
      .set('logic', logic);
    });

    cb();
  });
}

exports.Shell = Shell
