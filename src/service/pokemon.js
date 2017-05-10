'use strict';

const Pokemon = require('../models/pokemon'),
      request = require('request-promise');

class PokemonService {

      create(pokemon) {
            return new Promise((resolve, reject) => {
                  Pokemon.create(pokemon)
                        .then(pokemon => {
                              resolve(pokemon);
                        });
            });
      }

      findAll() {
            return new Promise((resolve, reject) => {
                  Pokemon.findAll()
                        .then(pokemons => {
                              resolve(pokemons);
                        });
            });
      }

      findManyByName(name) {
            return new Promise((resolve,reject) => {
                  Pokemon.findAll({
                        where: {
                              name: {$like: `%${name}%`}
                        }
                  })
                  .then(pokemon => {
                        resolve(pokemon);
                  });
            });
      }

      findOneByName(name) {
            return new Promise((resolve, reject) => {
                  Pokemon.findOne({
                        where: {
                              name: name
                        }
                  })
                        .then(pokemon => {
                              resolve(pokemon);
                        })
            });
      }

      findById(id){
            return new Promise((resolve,reject) => {
                  Pokemon.findById(id)
                        .then(pokemon => {
                              resolve(pokemon);
                        })
            })
      }

      removeFromStock(pokemon,quantity) {
            return new Promise((resolve,reject) => {
                  pokemon.stock = pokemon.stock - quantity;
                  pokemon.save()
                        .then(pokemon => {
                              resolve(pokemon);
                        })
                        .catch(err=>{
                              console.error('Error at saving product' + err);
                              reject(err);
                        });
            });
      }

}

module.exports = new PokemonService;