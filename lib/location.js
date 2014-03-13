var Location = function Location(id) {
  // ???
  this.id = id
  this.name = id
  this.description_notes = [];
  this.traits = {};
}

Location.prototype.describe = function(doors, props, characters, light) {
  var description;

  if (typeof light == 'undefined') {
    light = false;
  }

  if (this.dark && light != true) {

     description = "It is too dark to see.\n";

  } else {

    // describe current location, including any additions added during game play
    description = this.description

    // ???
    if (this.description_notes[this.name]) {
      description += this.description_notes[this.name];
    }

    // specify visibility conditions for different types of game components
    components_to_describe = {
      characters: "components[component_id].location == id",
      props: "components[component_id].location == id && components[component_id].traits['visible'] == true"
    }
//       doors: "components[component_id].locations.indexOf(id) != -1 && components[component_id].traits['visible'] == true",


    // figure out which game components are visible in this location
    visible_components = []

    for(var components in components_to_describe) {
      //components_to_describe.each do |components, visibility_condition|
      var visibility_condition = components_to_describe[components]
      this.components_seen(eval(components), visibility_condition).forEach(function(item) {
        visible_components.push(item)
      })
    }

    // add a listing of the visible components to the location description
    description += this.describe_game_components(visible_components)
  }

  return description;
}

Location.prototype.components_seen = function(components, visibility_condition) {

  var components_seen = [],
      id = this.id

  for(var component_id in components) {
    var component_data = components[component_id];

    if (eval(visibility_condition)) {
      components_seen.push(component_data.id) // change to noun base
    }
  }

  return components_seen
}

Location.prototype.describe_game_components = function(components) {

  var output = ''

  if (components.length > 0) {

    output += "You see: "

    var component_output = ''

    components.forEach(function(component) {

      if (component_output != '') {
        component_output += ', '
      }

      component_output += component

    })

    component_output += ".\n"

    output += component_output

  }

  return output
}

exports.Location = Location
