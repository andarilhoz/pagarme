const express = require('express'),
      pokemonService = require('../service/pokemon')
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
	pokemonService.buy(req.body.name,req.body.quantity)
});

module.exports = router;
