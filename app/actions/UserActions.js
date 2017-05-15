import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import UserService from '../services/UserService';
import UserConstants from '../constants/UserConstants';

import cookie from 'react-cookie';

export default {

    updatePassword : (password) => {

        UserService.updatePassword(password, function(err, result){
            if(err){
                return AppDispatcher.dispatch({
                    actionType: UserConstants.ERROR
                });
            }

            AppDispatcher.dispatch({
                actionType: UserConstants.UPDATE_PASSWORD
            });

        });

    }

}