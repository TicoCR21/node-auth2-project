require("dotenv").config();

const server = require( "./api/server.js" );

const PORT_NUMBER = process.env.PORT || 5000;
server.listen( PORT_NUMBER, () => console.log( `Running on Port: ${ PORT_NUMBER }` ) );