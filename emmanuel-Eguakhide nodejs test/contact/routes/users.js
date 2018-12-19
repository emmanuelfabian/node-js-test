var express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('json-web-token');
var router = express.Router();

 const saltRounds = 10;
 const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/**UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
**/


 let Schema = mongoose.Schema;

let userModelSchema = new Schema({
	name: String, 
	email: String, 
	phone: String,
	password: String
});

//create model
let userModel = mongoose.model('userModel', userModelSchema);


// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });




//hashing a password before saving it to the database

router.post('/signup', function(req, res, next) {
	let password =req.body.password;
	var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
		let createUsers = new userModel({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: hash
		 });
	createUsers.save(function (err,result) {
		if (err) return handleError(err);
  		res.status(200).send(result);
  	});
});





router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  let email = req.body.email;
  var secret = req.headers.secret;
  var payload = {
  email  :req.body.email,
    "status": "SUCCESS"
  
			};
  userModel.find({email:email},( function(err,result){
  	 let password =req.body.password;
		if(result == false){
			res.send('User does not exist!');	
		}else{
			password = bcrypt.compareSync(req.body.password, result[0].password);
			//console.log(password);
			if(password){

				res.send(result);

			}else{
					res.send('Incorrect password!');
			}
			
		}
	}));
});

// 		const auth =	(req,	res,	next)	=>	{	
// 		if	(req.headers &&	req.headers.auth	&&	req.headers.auth.split('	')[0]	=== 'JWT')	{	
// 				jwt.verify(req.headers.auth.split('	')[1],	SECRET,	(error,	decoded)	=>	{	
// 						if	(error)	return	res.status(401).send();	
// 						req.user	=	decoded;	
// 						console.log('authenticated	as	',	decoded.username);	
// 						next();	
// 				})	
// 		}	
// 		else return	res.status(401).send();	
// };







router.delete('/', function(req, res, next) {
	userModel.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});

module.exports = router;
