import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import AuthService from '../services/AuthService';
import AuthActions from '../actions/AuthActions';

import cookie from 'react-cookie';

export default {

    start : () => {

        var token = cookie.load('Auth-Token');
        
        if(!token) {
            
            return AppDispatcher.dispatch({
				actionType: AppConstants.READY,
			});

        }else{

            AuthActions.loadUserFromToken(token, function(err, user){
                
                if(err){

                    cookie.remove('Auth-Token');

                    return AppDispatcher.dispatch({
                        actionType: AppConstants.ERROR,
                        error : {
                            message : "Invalid token"
                        }
                    });
                }

                AppDispatcher.dispatch({
                    actionType: AppConstants.READY,
                    user : user 
                });

            });

        }

    }

}