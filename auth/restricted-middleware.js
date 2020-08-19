const jwt = require( "jsonwebtoken" );
const constants = require( "../config/constants.js" );

module.exports = ( req, res, next ) =>
{
  const token = req.headers.authorization;
  if( token )
  {
    jwt.verify( token, constants.JWT_SECRET, ( error, decodedToken ) =>
    {
      if( error )
        res.status( 401 ).json( { message: "you do not have access!" } );
      else
      {
        req.decodedToken = decodedToken;
        next();
      }
    } );
  }
  else
  {
    res.status( 401 ).json( { message: "you do not have access!" } );
  }
}