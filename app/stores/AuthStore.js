import { LOGIN_USER, LOGOUT_USER, LOGIN_ERROR } from '../constants/AuthConstants';

import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookie';

import UserService from './../services/UserService';

class AuthStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));

    this._user = null;
    this._user_role = null;
    this._access_token = null;
    this._error = null;
  }

  _registerToActions(action) {

    switch(action.actionType) {

      case LOGIN_USER:
        this._user = action.user;
        this._user_role = action.user_role;
        this._access_token = action.access_token;
        this._error = null;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._user = null;
        this._error = null;
        this._user_role = null;
        this._access_token = null;
        this.emitChange();
        break;

      case LOGIN_ERROR:
        this._user = null;
        this._error = action.error;
        this._user_role = null;
        this._access_token = null;
        this.emitChange();
        break;

      default:
        break;

    }
  }

  get user() {
    return this._user;
  }

  get user_role(){
    return this._user_role;
  }
  
  set user(user){
    this._user = user;
  }

  get access_token() {
    return this._access_token;
  }

  get error(){
    return this._error;
  }

  set error(value){
    this._error = value;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new AuthStore();