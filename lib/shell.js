var mingy = require('mingy')
  , Shell = mingy.Shell
  , Command = mingy.Command
  , fs = require('fs')
  , path = require('path')
  , yaml = require('js-yaml')

Shell.prototype.loadCommands = function(dir, cb) {
  var self = this;

  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    // create command from YAML data
    files.forEach(function(file) {
      var commandData = yaml.safeLoad(fs.readFileSync(path.join(dir, file), 'utf8'))
        , logic = eval('(function(game) { var player = game.player; var locations = game.locations; var doors = game.doors; var state = game.state; return function(arg, env) { ' + commandData.logic + '}; })(self.game)');

      self.parser.addCommand(path.basename(file))
      .set('syntax', commandData.syntax)
      .set('logic', logic);
    });

    cb();
  });
}

module.exports = Shell
