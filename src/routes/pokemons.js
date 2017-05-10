'use strict';

const express = require('express'),
      pokemonService = require('../service/pokemon'),
      router = express.Router();

router.get('/', (req, res) => {
    pokemonService.findAll()
        .then(pokemonList => {
            res.send(pokemonList);
        });
});

router.get('/:id', (req,res) => {
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
            if (pokemon.stock < req.body.quantity) {
                res.status(400).send({
                    error: `Not enought ${pokemon.name}, in stock: ${pokemon.stock}`
                });
            } 
            else {
                pokemonService.buy(pokemon, req.body.quantity)
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