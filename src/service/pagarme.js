'use strict';

const request = require('request-promise'),
    config = require('../../config/config'),
    pokemonService = require('./pokemon');

class PagarmeService {

    buy(pokemon, quantity, card) {
        let metadata = {
            product: 'pokemon',
            name: pokemon.name,
            quantity: quantity
        }
        return this.transaction(pokemon.price, quantity, card, metadata);
    }

    transaction(price, quantity, card, metadata) {
        return request({
            uri: 'https://api.pagar.me/1/transactions',
            method: 'POST',
            json: {
                api_key: config.pagarme.key,
                amount: price * quantity * 100,
                card_number: card.number,
                card_expiration_date: card.expiration_date,
                card_holder_name: card.holder_name,
                card_cvv: card.cvv,
                metadata: metadata
            }
        });
    }

}

module.exports = new PagarmeService();