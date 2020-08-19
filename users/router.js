const router = require( "express" ).Router();

const hf = require( "./model.js" );
const restricted = require( "../auth/restricted-middleware.js" );

router.get( "/", restricted, ( req, res ) =>
{
  hf.find()
    .then( response => res.status( 200 ).json( { data: response, jwt: req.decodedToken  } ) )
    .catch( error => res.send( { error } ) )
} )

module.exports = router;