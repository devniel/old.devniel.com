/**
 * Controlador para presentación
 * de vistas.
 *
 * @author devnieL
 */

var request = require("request");

class Views {

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

	static temp(req, res){

		request({
			url: process.env.API_URL + "/parse/token",
			method: 'POST',
			json: {
				token: req.params.token
			}
		}, function(error, response, body) {

			console.log(error, body);

			if(error) return Views.handleError(res, error);

			if(body && body.status < 400){
				return Views.handleError(res, body);
			}

			console.log("DATA:", body);

			res.cookie('Auth-Token', body.data.access_token, {
				path: '/'
			});

			res.redirect('/');

		});

	}

}

module.exports = Views;
