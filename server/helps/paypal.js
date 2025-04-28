const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "AZERhfZ16FJ2G2km-9fttco9ZRJYItGqmsP3JsOP5Li6XMpcnB2lF_es02bV8OaBy6CSSc857GC0NL1v",
    client_secret:"EML6XqMu36_1fOuO44YjfvRWO5jFmVdQh81zaDCpN2j6cjtwOz9zW8uat-kgaBAgP0uNrQ_vD-PQVYpG"
})

module.exports = paypal