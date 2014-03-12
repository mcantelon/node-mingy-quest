var Location = function Location(id) {
  this.id = id
}

Location.prototype.describe = function(doors, props, characters, lit) {
  return this.description;
}

exports.Location = Location
