const express = require('express'),
      pokemonService = require('../service/pokemon');

router = express.Router();

router.get('/', function (req, res) {
    pokemonService.findAll()
        .then(pokemonList => {
            res.send(pokemonList);
        });
});

router.put('/', function (req, res) {
    pokemonService.create(req.body)
        .then(pokemon => {
            res.send(pokemon);
        });
});

router.post('/buy', function (req, res) {
    pokemonService.findOneByName(req.body.name)
        .then(pokemon => {
            if (pokemon.stock < req.body.quantity) {
                res.status(400).send({
                    error: `Not enought ${pokemon.name}, 
                            in stock: ${pokemon.stock}`
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
