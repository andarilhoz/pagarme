'use strict';

const request = require('request-promise'),
      config = require('../../config/config');

class PagarmeService {

    transaction(price,quantity, metadata) {
        return new Promise((resolve, reject) => {
            request({
                uri: 'https://api.pagar.me/1/transactions',
                method: 'POST',
                json: {
                    api_key: config.pagarme.key,
                    amount: price * quantity * 100,
                    card_number: "4024007138010896",
                    card_expiration_date: "1050",
                    card_holder_name: "Ash Ketchum",
                    card_cvv: "123",
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