import React, { Component } from 'react';

import './../../styles/Signin.pcss';
import Button from './../../components/Button';

import AuthActions from './../../actions/AuthActions';
import AuthStore from './../../stores/AuthStore';
import AppStore from './../../stores/AppStore';

import Loader from './../../components/Loader';
import {Link, browserHistory} from 'react-router';

class Signin extends Component {

    constructor(props){        
        super(props);

        console.log('props:', props);

        this.state = {
            processing : false,
            error : null
        }
         
    }

    componentDidMount() {
        AuthStore.addChangeListener(this._onChangeAuth);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChangeAuth);
    }

    _onChangeAuth = () => {

        if(!AuthStore.error){
           return window.location.reload();
        }

        this.setState({
            processing: false,
            error : AuthStore.error
        });
    }
    

    onSubmit = (fields) => {

        this.setState({
            processing: true
        });

        AuthActions.loginUser(fields.email, fields.password);

    }

    render() {

        if(this.state.processing){
            return(
                <Loader style='white'/>
            );
        }

        return (
            <div className='Signin'>

                <span className='Signin-Title'>devniel</span>

                <Button 
                    href={'http://localhost:3000/auth/signin?client_id=' + AppStore.client_id + '&redirect_uri=' + encodeURIComponent("http://localhost:7000/auth/oauth/braph")}
                    className='FormButton'> 
                    Entrar con Braph
                </Button>

            </div>
        );
    }
}

export default Signin;