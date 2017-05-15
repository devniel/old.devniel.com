import BaseStore from './BaseStore';
import PostConstants from '../constants/PostConstants';

class PostStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this.posts = null;
        this.post = null;
        this.error = null;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case PostConstants.LOAD_LIST:
                this.posts = action.posts;
                this.error = null;
                this.emitChange();
                break;
            case PostConstants.ERROR:
                this.error = action.error;
                this.emitChange();
                break;
        }
    }

}

export default new PostStore();