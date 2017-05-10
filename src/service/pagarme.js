'use strict';

const request = require('request-promise'),
      config = require('../../config/config');

class PagarmeService {

    transaction(price, quantity, card, metadata) {
        return new Promise((resolve, reject) => {
            request({
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
            })
            .then(body => {
                resolve(body)
            })
            .catch(err => {
                console.log(JSON.stringify(err, null, 4));
                reject(err);
            });
        });
    }

}

module.exports = new PagarmeService();