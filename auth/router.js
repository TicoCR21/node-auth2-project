const bcryptjs = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const router = require( "express" ).Router();
const constant = require( "../config/constants.js" );
const hf = require( "../users/model" );

router.post( "/register", ( req, res ) => 
{
  const user = req.body;
  
  const rounds = process.env.BCRYPT_ROUNDS || 8;

  const hash = bcryptjs.hashSync( user.password, rounds );
  user.password = hash;

  hf.add( user )
    .then( response => 
      {
        console.log( response );
        res.status( 201 ).json( { data: response } );
      } )
    .catch( error => res.status( 500 ).json( { message: error } ) );

} );

router.post( "/login", ( req, res ) =>
{
  const user = req.body;

  console.log( "user =>", user );

  hf.findBy( { username: user.username } )
    .then( ( [ response ] ) =>
      {
        if( response && bcryptjs.compareSync( user.password, response.password ) )
          res.status( 200 ).json( {
            message: "Welcome",
            token: signToken( response )
          } );
        else
          res.status( 401 ).json( { message: "Invalid Credentials" } );
      } )
    .catch( error =>
      {
        console.log( error );
      } )
} );

function signToken( user )
{
  const payload = 
  {
    subject: user.id,
    username: user.username,
    departments: user.departments
  }

  const options = 
  {
    expiresIn: "1d"
  }

  return jwt.sign( payload, constant.JWT_SECRET, options );
}

module.exports = router;