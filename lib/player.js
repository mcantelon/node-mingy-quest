var Player = function Player(id) {
  this.id = id
  this.aliases = []
  this.traits = {
    visible: true,
    portable: true
  }
}

Player.prototype.carrying = function() {
  var carrying = [];

  for (var prop in game.props) {
    if (game.props[prop].location == 'player') {
      carrying.push(prop);
    }
  }
  return carrying;
}

exports.Player = Player
