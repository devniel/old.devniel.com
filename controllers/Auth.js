var request = require("request");
var jwt = require('jsonwebtoken');

class Auth {

	static handleError(res, err){

		console.error("Error".red, err);
		if(err.response) console.error("Error".red, err.response.text)

		/*return res.status(500).render("pages/errors/500.html", {
			error: err.stack
		});*/

		res.status(500).json({
			message : err.message,
			status : 500
		});

	}

	static render(req, res){
		res.render("index");
	}

	static index(req, res){
		res.render("pages/index", {
			user : req.session.user
		});
	}

	static braph_logout(req, res){

		res.session = {};
		res.clearCookie('Auth-Token', {
			path: '/'
		});

		res.redirect("/");
	}

	static braph_login(req, res){	

		req.log.info('Auth.braph_login() | query:', req.query);

		request({
			url: process.env.API_URL + "/auth/login",
			method: 'POST',
			json: true,
			qs: {
				access_token: req.query.access_token
			}
		}, function(error, response, body) {

			req.log.debug({
				metadata : {
					error : error,
					response : response,
					body : body
				}
			}, 'Auth.braph_login() | braph api request results:');

			if(error) return Auth.handleError(res, error);

			if(response && response.statusCode >= 400){
				return Auth.handleError(res, body);
			}

			var auth_token = jwt.sign(
				body.data, 
				process.env.JWT_SECRET, {
					algorithm: 'HS256',
					expiresIn: '60m'
				}
			);
			
			res.cookie('Auth-Token', auth_token, {
				path: '/'
			});

			res.redirect('/');

		});

	}

}

module.exports = Auth;
