import request from 'superagent';
import cookie from 'react-cookie';
import AppConstants from '../constants/AppConstants';
import AuthStore from '../stores/AuthStore';

class PostService {

	static list(callback){

		return request.
		get(AppConstants.API_URL + '/posts').
		query({
			itemsPerPage : 100,
			access_token : AuthStore.access_token
		}).
		end(function(error, response){
			console.debug("PostService.list() results :", {
				error : error,
				response : response
			});

			if(error) {
				if(response && response.body) return callback(response.body);
				return callback(error);
			}

			return callback(null, response.body);
		});

	}

	static read(id, callback){

		return request.
		get(AppConstants.API_URL + '/posts/' + id).
		set('Auth-Token', cookie.load('Auth-Token')).
		end(function(error, response){
			console.debug("PostService.read() results :", {
				error : error,
				response : response
			});
			if(error) return callback(error);
			return callback(null, response.body);
		});

	}

	static create(post, callback){
		return request.
		post(AppConstants.API_URL + '/posts').
		query({
			access_token : AuthStore.access_token
		}).
		send(post).
		end(function(error, response){
			console.debug("PostService.create() results :", {
				error : error,
				response : response
			});
			if(error) return callback(response.body || error);
            console.log('PostService.list() | results :', response.body);
			return callback(null, response.body);
		});

	}

}

module.exports = PostService;
