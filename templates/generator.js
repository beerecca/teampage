'use strict'
const Handlebars = require('handlebars/runtime');
require('./compiled'); 

const userData = {
    users: [
        {
            name: 'Joe Bloggs',
            email: 'joe@example.com'
        },
        {
            name: 'Jane Bloggs',
            email: 'jane@example.com'
        }
    ]    
}

const template = Handlebars.templates['index'](userData);
      
console.log(template);
