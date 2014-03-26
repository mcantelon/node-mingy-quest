var Player = function Player(params) {
  this.id = params.id
  this.props = params.props
}

Player.prototype.carrying = function() {
  var carrying = [];

  for (var prop in this.props) {
    if (this.props[prop].location == 'player') {
      carrying.push(prop);
    }
  }
  return carrying;
}

exports.Player = Player
