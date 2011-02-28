var mingyQuest = require('../lib/index')
  , Prop = mingyQuest.Prop
  , Game = mingyQuest.Game
  , mingy = require('mingy')
  , Parser = mingy.Parser
  , assert = require('assert')
  , should = require('should')

module.exports = {

  "alias resolution": function() {

    var parser = new Parser()

    var game = new Game(parser)
    .addElementType('Prop', 'props')

    var prop = new Prop('shovel')
    prop.location = 'house'
    prop.aliases = ['pretty digger', 'shite trowel']
    game.props[prop.id] = prop

    game.parser.setEnv('location', 'house')

    // try one alias
    var lexemes = 'get pretty digger in your mind'.split(' ')
    var resolved = game.resolveLocalAliases(lexemes, game.parser.env)
    resolved = resolved.join(' ')
    resolved.should.equal('get shovel in your mind')

    // try the other
    var lexemes = 'get shite trowel in your mind'.split(' ')
    var resolved = game.resolveLocalAliases(lexemes, game.parser.env)
    resolved = resolved.join(' ')
    resolved.should.equal('get shovel in your mind')

    // change location which should result in aliases not being resolved
    game.parser.setEnv('location', 'nowhere')
    var lexemes = 'get shite trowel in your mind'.split(' ')
    var resolved = game.resolveLocalAliases(lexemes, game.parser.env)
    resolved = resolved.join(' ')
    resolved.should.equal('get shite trowel in your mind')
  }
}
