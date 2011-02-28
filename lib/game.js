var Game = function Game(parser) {

  // add error so if game isn't given a parser game throws exeception
  if (parser) {
    // need to set up parser env
    parser.env['game'] = this
    this.parser = parser
    this.parser.addLexemeTransform(this.resolveLocalAliases)
  }
  this.elementTypes = {}
  this.players = {}
  this.locations = {}
}

Game.prototype = {

  "addElementType": function(className, gamePropertyName) {
    this.elementTypes[className] = gamePropertyName
    this[gamePropertyName] = {}
  },

  "addPlayer": function(id) {
    this.players[id] = {}
  },

  "loadYamlFilesIntoGame": function(directory, gamePropertyName) {
  },

  "resolveLocalAliases": function(lexemes, env) {

    for(var typeClassName in env.game.elementTypes) {

      var elementHashName = game.elementTypes[typeClassName]
      for(var elementIndex in env.game[elementHashName]) {

        var element = game.props[elementIndex]

        if (element.location == env.game.players.A.location) {

          console.log('RESOLVE')
          // lexemes = resolveValidAliases(lexemes, aliases, id)
          // foreach alias
          //   1. change alias into lexemes
          //   2. if the alias lexemes exist in the input lexemes, resolve
          //      3. Splice out the excess lexemes
          //      4. Put the id in their place
        }
      }
    }

    return lexemes
  }
}

exports.Game = Game