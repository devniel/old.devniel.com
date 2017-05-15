import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Router, Route, Link, browserHistory, IndexRedirect, IndexRoute } from 'react-router'

import AppStore from './stores/AppStore';
import AppActions from './actions/AppActions';

import AuthStore from './stores/AuthStore';

import Index from './pages/Index';

import PostList from './components/posts/PostList';
import PostCreate from './components/posts/PostCreate';

import Signin from './pages/auth/Signin';
import Signout from './pages/auth/Signout';
import PasswordRecovery from './pages/auth/PasswordRecovery';

import Loader from './components/Loader';

export default class App extends Component {

    constructor(props){
        super(props);
        var props = props || {};

        this.state = {
            ready : AppStore.ready,
            error : AppStore.error
        }

    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange);

        // Check if it's logged in
        AppActions.start();
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {  

        console.log(AppStore);

        if(AppStore.error){
            this.setState({
                ready: true,
                user : null
            });
        }else{
            this.setState({
                ready: AppStore.ready,
                user : AppStore.user
            });
        }
    }
    
    render() {

        if(!this.state.ready){

            return(
                <Loader style='white'/>
            );

        }

        if(this.state.ready){

            return (
                <Router history={browserHistory}>

                    <Route path="/" component={Index}>
                        <IndexRoute component={PostList} />

                        <Route path="posts">
                            <Route path="create" component={PostCreate}></Route>
                        </Route>

                        <Route path="auth">
                            <Route path="signin" component={Signin}></Route>
                            <Route path="password-recovery" component={PasswordRecovery}></Route>
                            <Route path="signout" component={Signout}></Route>
                        </Route>

                    </Route>

                </Router>
            );

        }
    }
}