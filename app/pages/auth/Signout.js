import React from 'react';
import ReactDOM from 'react-dom';

var Loader = require('react-loaders').Loader;

import AuthStore from "./../../stores/AuthStore";
import AuthActions from './../../actions/AuthActions';
import AuthService from './../../services/AuthService';
import AuthLayout from './../../layouts/Auth';

import update from 'react-addons-update';

import { Link, browserHistory } from 'react-router'

var Signout = React.createClass({

    getInitialState: function () {
        return {}
    },

    showError: function () {
        if (this.state.error != undefined) {
            return (
                <div className='error'>{this.state.error.message}</div>
            )
        };
    },

    render: function () {
        return (
            <AuthLayout>
            </AuthLayout>
        )
    },

    componentDidMount: function () {
        AuthStore.addChangeListener(this._onChange);        
        
        setTimeout(function(){
            AuthActions.logoutUser();
        }, 100);
    },

    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {

        if(AuthStore.error){
            this.setState({
                step: 1, 
                error: AuthStore.error
            });
        }else{
            window.location = "/";
        }
       
    }
    
})

module.exports = Signout;
