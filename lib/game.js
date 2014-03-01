var yaml = require('js-yaml')
  , fs = require('fs')

var Game = function Game(parser) {

  // add error so if game isn't given a parser game throws exeception
  if (parser) {
    // need to set up parser env
    parser.setEnv('game', this)
    this.parser = parser
    this.parser.addLexemeTransform(this.resolveLocalAliases)
  }
  this.elementTypes = {}
  this.elementIncludes = {}
  this.players = {}
  this.locations = {}

  return this
}

Game.prototype = {

  addElementType: function(className, classInclude, gamePropertyName) {
    this.elementTypes[className] = gamePropertyName
    this.elementIncludes[className] = classInclude
    this[gamePropertyName] = {}

    return this
  },

  addElementFromYamlFile: function(className, file) {

    var gamePropertyName = this.elementTypes[className]

    try {
      var elementData = yaml.safeLoad(fs.readFileSync(file, 'utf8'))

      // require object element constructor
      classDefinition = require(this.elementIncludes[className])

      // create element
      var element = this[gamePropertyName][elementData.id] = new classDefinition[className]()

      // set element properties from YAML data
      for (var index in elementData) {
        element[index] = elementData[index]
      }
    } catch(e) {
      console.log(e)
    }
  },

  addPlayer: function(id) {
    this.players[id] = {}

    return this
  },

  loadYamlFilesIntoGame: function(directory, gamePropertyName) {
  },

  resolveLocalAliases: function(lexemes, env) {

    var game = this

    for(var typeClassName in env.game.elementTypes) {

      var elementHashName = env.game.elementTypes[typeClassName]
      for(var elementIndex in env.game[elementHashName]) {

        var element = env.game.props[elementIndex]

        if (element.location == env.location
          && element.aliases) {

          lexemes = env.game.resolveValidAliases(lexemes, element.aliases, element.id)
        }
      }
    }

    return lexemes
  },

  resolveValidAliases: function(lexemes, aliases, id) {

    var aliasPosition
      , endLexemes

    for(var index in aliases) {
      var aliasLexemes = aliases[index].split(' ')
      var aliasPosition = this.indexOfArrayInArray(lexemes, aliasLexemes)
      if (aliasPosition != -1) {
        endLexemes = lexemes.slice(aliasPosition + aliasLexemes.length)
        lexemes = lexemes.slice(0, aliasPosition)
        lexemes.push(id)
        for (var index2 in endLexemes) {
          lexemes.push(endLexemes[index2])
        }
        return lexemes
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
      if (valid) return +index
    }

    return -1
  } 
}

exports.Game = Game
