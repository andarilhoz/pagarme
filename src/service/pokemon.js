'use strict';

const Pokemon = require('../models/pokemon'),
      request = require('request-promise');

class PokemonService {

      create(pokemon) {
            return Pokemon.create(pokemon);
      }

      findAll() {
            return Pokemon.findAll();
      }

      findManyByName(name) {
            return Pokemon.findAll({
                  where: {
                        name: { $like: `%${name}%` }
                  }
            });
      }

      findOneByName(name) {
            return Pokemon.findOne({
                  where: {
                        name: name
                  }
            });
      }

      findById(id) {
            return Pokemon.findById(id);
      }

      removeFromStock(pokemon, quantity) {
            pokemon.stock = pokemon.stock - quantity;
            return pokemon.save();
      }

}

module.exports = new PokemonService;