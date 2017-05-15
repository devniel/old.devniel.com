import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AuthConstants from '../constants/AuthConstants';

import async from 'async';
import cookie from 'react-cookie';
import jwt_decode from 'jwt-decode';

import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export default {

	// LOGIN USER
	
	loginUser: (email, password) => {

		async.waterfall([

			function(cb){

				AuthService.login(email, password, function (error, data) {
					if (error) return cb(error);
					cb(null, data);
				});

			},

			function(data, cb){
          
				var token = data.access_token;

				cookie.save("Auth-Token", token, {
					path : '/'
				});

				cb(null, data.user);

			}

		], function(error, user){

			if(error){
				
				cookie.remove("Auth-Token", {
					path : '/'
				});

				return AppDispatcher.dispatch({
					actionType: AuthConstants.LOGIN_ERROR,
					error : error
				});
			}

			AppDispatcher.dispatch({
				actionType: AuthConstants.LOGIN_USER,
				user : user
			});

		});
		
	},

	// LOGOUT USER

	logoutUser: () => {

		cookie.remove("Auth-Token", {
			path : '/'
		});

		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGOUT_USER
		});
	},

	// LOAD USER FROM TOKEN 

	loadUserFromToken: (token, callback) => {

		async.waterfall([

			function(cb){

				try{
					var decoded = jwt_decode(token);
					cb(null, decoded);
				}catch(e){
					return cb(e);
				}

			},

			function(data, cb){
						          
				cookie.save("Auth-Token", token, {
					path : '/'
				});


				cb(null, data);

			}

		], function(error, data){

			if(error){
				
				cookie.remove("Auth-Token", {
					path : '/'
				});

				if(callback) callback(error);

				return AppDispatcher.dispatch({
					actionType: AuthConstants.LOGIN_ERROR,
					error : error
				});
			}

			AppDispatcher.dispatch({
				actionType: AuthConstants.LOGIN_USER,
				access_token : data.b_auth_token.token,
				user : data.user.user,
				user_role : data.user.role
			});
			
			if(callback) callback(null, data);

		});
		
	}
}