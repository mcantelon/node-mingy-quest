var yaml = require('js-yaml')
  , fs = require('fs')
  , path = require('path')

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
  this.props = {}
  this.doors = {}
  this.state = {}

  return this
}

Game.prototype = {

  // add support for some type of game element
  addElementType: function(className, classInclude, gamePropertyName) {
    this.elementTypes[className] = gamePropertyName
    this.elementIncludes[className] = classInclude
    this[gamePropertyName] = {}

    return this
  },

  // load an element instance from a YAML file
  addElementFromYamlFile: function(className, file) {

    var gamePropertyName = this.elementTypes[className]

    try {
      var elementData = yaml.safeLoad(fs.readFileSync(file, 'utf8'))

      // require object element constructor
      classDefinition = require(this.elementIncludes[className])

      // create element
      var id = path.basename(file).replace('.yaml', '')
      var element = this[gamePropertyName][id] = new classDefinition[className]()
      element.id = id

      // set element properties from YAML data
      for (var index in elementData) {
        element[index] = elementData[index]
      }
    } catch(e) {
      console.log('Error: ' + e)
    }
  },

  addPlayer: function(id) {
    this.players[id] = {}

    return this
  },

  // load multiple element instances from a directory containing YAML files
  loadYamlFilesIntoGame: function(directory, className, cb) {
    var self = this;

    fs.readdir(directory, function(err, files) {
      if (err) throw err;

      // create command from YAML data
      files.forEach(function(file) {
        self.addElementFromYamlFile(className, path.join(directory, file))
      });

      cb();
    });

  },

  loadCommands: function(dir, cb) {
    var self = this;

    fs.readdir(dir, function(err, files) {
      if (err) throw err;

      // create command from YAML data
      files.forEach(function(file) {
        var commandData = yaml.safeLoad(fs.readFileSync(path.join(dir, file), 'utf8'))
          , logic = eval('(function(game) { var player = game.player; var locations = game.locations; var props = game.props; var characters = game.characters; var doors = game.doors; var state = game.state; return function(arg, env) { ' + commandData.logic + '}; })(self)');

        self.parser.addCommand(path.basename(file))
        .set('syntax', commandData.syntax)
        .set('logic', logic);
      });

      cb();
    });
  },

  resolveLocalAliases: function(lexemes, env) {

    /*
    var game = this

    for(var typeClassName in env.game.elementTypes) {

      var elementHashName = env.game.elementTypes[typeClassName]
      for(var elementIndex in env.game[elementHashName]) {

        var element = env.game.props[elementIndex]

        if (typeof element.location != 'undefined'
          && element.location == env.location
          && element.aliases) {

          lexemes = env.game.resolveValidAliases(lexemes, element.aliases, element.id)
        }
      }
    }
    */

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
  },

  event: function(element, event_type) {
    // todo
  } 
}

exports.Game = Game
