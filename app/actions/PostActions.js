import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import PostService from '../services/PostService';
import PostActions from '../actions/PostActions';

import PostConstants from '../constants/PostConstants';

import cookie from 'react-cookie';

export default {

    list : () => {

        PostService.list(function(error, result){
            if(error){
                return AppDispatcher.dispatch({
                    actionType: PostConstants.ERROR,
                    error : error
                });
            }

            AppDispatcher.dispatch({
                actionType: PostConstants.LOAD_LIST,
                posts : result.data 
            });
        });

    }

}