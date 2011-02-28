var Game = function Game(parser) {

  // add error so if game isn't given a parser game throws exeception
  if (parser) {
    // need to set up parser env
    parser.setEnv('game', this)
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

      var elementHashName = env.game.elementTypes[typeClassName]
      for(var elementIndex in env.game[elementHashName]) {

        var element = env.game.props[elementIndex]

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
  },

  indexOfArrayInArray: function(haystack, needle) {

    var valid

    for (var index in haystack) {
      valid = true
      for (var index2 in needle) {
        if (haystack[+index + +index2] != needle[index2]) {
          valid = false
        }
      }
      if (valid) return index
    }

    return -1
  } 
}

exports.Game = Game
