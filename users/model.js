const db = require( "../database/connection.js" );

const find = () => db( "users" );
const findBy = filter => db( "users" ).where( filter );
const add = user => db( "users" ).insert( user, "id" );

module.exports = { find, findBy, add };