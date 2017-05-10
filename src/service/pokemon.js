'use strict';

const Pokemon = require('../models/pokemon'),
      request = require('request-promise'),
      pagarmeService = require('./pagarme');

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

      buy(pokemon, quantity) {
            return new Promise((resolve, reject) => {
                  let metadata = {
                        product: 'pokemon',
                        name: pokemon.name,
                        quantity: quantity
                  }
                  pagarmeService.transaction(pokemon.price, quantity, metadata)
                        .then(body => {
                              if (body.status == 'paid') {
                                    pokemon.stock = pokemon.stock - quantity;
                                    pokemon.save()
                                          .then(pokemon => {
                                                resolve(body);
                                          })
                                          .catch(err=>{
                                                console.log('Error at saving product');
                                                reject(err);
                                          });
                              }
                        })
                        .catch(err => {
                              console.log('Error in pagarme service method');
                              reject(err);
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

}

module.exports = new PokemonService;