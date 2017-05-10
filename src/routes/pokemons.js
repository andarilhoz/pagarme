'use strict';

const express = require('express'),
    pokemonService = require('../service/pokemon'),
    pagarmeService = require('../service/pagarme'),
    router = express.Router();


router.get('', (req, res, next) => {

    if (req.query.name && req.query.name.length > 0) {
        pokemonService.findManyByName(req.query.name)
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
    pokemonService.findOneByName(req.body.name)
        .then(pokemon => {
            if(!pokemon){
                res.status(404).send({
                    error: `Pokemon ${req.body.name} not found`
                });
            }
            else if (pokemon.stock < req.body.quantity) {
                res.status(400).send({
                    error: `Not enought ${pokemon.name}, in stock: ${pokemon.stock}`
                });
            }
            else {
                pagarmeService.buy(pokemon, req.body.quantity, req.body.card)
                    .then(body => {
                        res.send(body);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
        });
});

module.exports = router;