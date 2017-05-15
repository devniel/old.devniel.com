import BaseStore from './BaseStore';
import AppConstants from '../constants/AppConstants';

class AppStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.user = null;
    this.ready = false;

    this.braph = {
      client_id : AppConstants.BRAPH_CLIENT_ID
    }
    
    this.error = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case AppConstants.READY:
        this.ready = true;
        this.user = action.user;
        this.emitChange();
        break;
      case AppConstants.ERROR:
        this.error = action.error;
        this.emitChange();
    }
  }

}

export default new AppStore();