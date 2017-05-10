'use strict';

const express = require('express'),
    pokemonService = require('../service/pokemon'),
    pagarmeService = require('../service/pagarme'),
    router = express.Router();


router.get('', (req, res, next) => {
    let name = req.query.name;
    if (name && name.length > 0) {
        pokemonService.findManyByName(name)
            .then(pokemons => {
                res.send(pokemons);
            });
    } else {
        next();
    }

});

router.get('/', (req, res) => {
    pokemonService.findAll()
        .then(pokemonList => {
            res.send(pokemonList);
        });
});

router.get('/:id', (req, res) => {
    pokemonService.findById(req.params.id)
        .then(pokemon => {
            res.send(pokemon)
        })
});

router.put('/', (req, res) => {
    pokemonService.create(req.body)
        .then(pokemon => {
            res.send(pokemon);
        });
});

router.post('/buy', (req, res) => {
    let name = req.body.name,
        quantity = req.body.quantity,
        card = req.body.card;

    pokemonService.findOneByName(name)
        .then(pokemon => {
            if (!pokemon) {
                res.status(404).send({
                    error: `Pokemon ${name} not found`
                });
            }
            else if (pokemon.stock < quantity) {
                res.status(400).send({
                    error: `Not enought ${pokemon.name}, in stock: ${pokemon.stock}`
                });
            }
            else {
                pagarmeService.buy(pokemon, quantity, card)
                    .then(body => {
                        if (body.status == 'paid') {
                            pokemonService.removeFromStock(pokemon, quantity)
                                .then(pokemon => res.send(body))
                                .catch(err => {
                                    res.status(500).send(err);
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        console.log(JSON.stringify(err, null, 4));
                        res.status(400).send(err);
                    });
            }
        });
});

module.exports = router;