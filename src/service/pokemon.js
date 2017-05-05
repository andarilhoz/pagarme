'use strict';

const Pokemon = require('../models/pokemon'),
      request = require('request-promise');

class PokemonService {

      create(pokemon){
            return new Promise((resolve,reject)=>{
                  Pokemon.create(pokemon)
                        .then(pokemon => {
                              resolve(pokemon)
                        });
            });
      }
      
      findAll(){
            return new Promise((resolve,reject)=>{
                  Pokemon.findAll()
                        .then(pokemons => {
                              resolve(pokemons);
                        });
            });
      }    

      buy(name,quantity){
            return new Promise((resolve,reject)=>{
                  this.findOneByName(name)
                        .then(pokemon => {
                              if (pokemon.stock < quantity) {
                                    reject({
                                          error: 'Not enought ' + pokemon.name + ' in stock: ' + pokemon.stock
                                    });
                              }

                              request({
                                    uri: 'https://api.pagar.me/1/transactions',
                                    method: 'POST',
                                    json: {
                                          api_key: "ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg",
                                          amount: pokemon.price * req.body.quantity * 100,
                                          card_number: "4024007138010896",
                                          card_expiration_date: "1050",
                                          card_holder_name: "Ash Ketchum",
                                          card_cvv: "123",
                                          metadata: {
                                                product: 'pokemon',
                                                name: pokemon.name,
                                                quantity: req.body.quantity
                                          }
                                    }
                              })
                              .then(function (body){
                                    if (body.status == 'paid') {

                                          pokemon.stock = pokemon.stock - req.body.quantity;
                                          pokemon.save()
                                                .then(function(pokemon) {
                                                      resolve(body);
                                                })
                                    }
                              })
                              .catch(function (err){
                                    console.log(JSON.stringify(err, null, 4));
                                    reject(err);
                              })

                        })
            })
            
      }

      findOneByName(name){
            return new Promise((resolve,reject)=>{
                  Pokemon.findOne({
                        where: {
                              name: name
                        }
                  })
                  .then(pokemon=>{
                        resolve(pokemon);
                  })
            });
      }

}


module.exports = new PokemonService;