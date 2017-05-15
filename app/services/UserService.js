// AuthService.js
import request from 'superagent';
import cookie from 'react-cookie';
import AppConstants from '../constants/AppConstants';

class UserService {

	me(callback){
		return request.
		get(AppConstants.API_URL + '/me').
		set('Auth-Token', cookie.load('Auth-Token')).
		end(function(error, response){
			if(error) return callback(error);
			return callback(null, response.body);
		})
	}

	updatePassword(password, callback){
		return request.
		put(AppConstants.API_URL + '/me/password').
		set('Auth-Token', cookie.load('Auth-Token')).
		send({
			password : password
		}).
		end(function(error, response){
			if(error) return callback(error);
			return callback(null, response.body);
		})
	}

}

module.exports = new UserService();
