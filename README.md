# Pokemon API

API que simula uma loja de pokemons, podendo adicionar, procurar e encontrar pokemons

### Tecnologias Usadas 
Bibliotecas e frameworks utilizados com o node:

* [Express] - framework para webapps.
* [Request] - cliente http simples.
* [Sequelize] - ORM orientado a promessas para node.
* [SQLite] - banco de dados.

### Instalação

É necessário ter o [Node.js](https://nodejs.org/) para iniciar.

Instale as dependencias para iniciar o servidor.

```sh
$ cd pagarme
$ npm install 
$ npm start
```

### API endpoints

Retorna uma lista com todos pokemons cadastrados
```
method: GET
url: /pokemon/
```

Retorna pokemon com o id informado
```
method: GET
url: /pokemon/:id
```

Adiciona um pokemon no banco
```
method: PUT
body example: {"name": "pikachu", "price": 10, "stock": 5}
url: /pokemon/
```
Compra um pokemon utilizando a api do Pagarme
```
method: POST
body example: 
{
    "name": "pikachu", 
    "quantity": 1, 
    "card": {
        "number":"<card_number>", 
        "expiration_date":"<expiration_date>",
        "holder_name":"<card_holder_name>",
        "cvv":"<card_cvv>"
  }
}
url: /pokemon/buy
```


   [node.js]: <http://nodejs.org>
   [request]: <https://github.com/request/request>
   [sequelize]: <http://docs.sequelizejs.com>
   [sqlite]: <https://www.sqlite.org/>
   [express]: <http://expressjs.com>
