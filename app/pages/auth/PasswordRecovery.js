import React, { Component } from 'react';

import './../../styles/PasswordRecovery.pcss';
import Form from './../../components/Form';

import AuthActions from './../../actions/AuthActions';
import AuthService from './../../services/AuthService';


import Loader from './../../components/Loader';
import {browserHistory} from 'react-router';

import {Link} from 'react-router'
import Button from './../../components/Button';

class PasswordRecovery extends Component {

    constructor(props){        
        super(props);

        this.state = {
            processing : false,
            error : null
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    onSubmit = (fields) => {

        var self = this;

        this.setState({
            processing: true
        });

        AuthService.passwordRecovery(fields.email, function(error, res){
            if(error) {
                return self.setState({
                    error : error
                });
            }

            self.setState({
                processing: false,
                message : "Se envió un enlace temporal"
            });

        })


    }

    render() {

        if(this.state.processing){
            return(
                <Loader style='white'/>
            );
        }

         if(this.state.message){
             return <div className='PasswordRecovery'>
                <span className='Message'>{this.state.message}</span>
                <Button href="/">Regresar</Button>
             </div>
        }

        return (
            <div className='PasswordRecovery'>

                <Form 
                    configuration={{
                        style : "Login",
                        fields : {
                            email : {
                                type : 'text',
                                label : 'e-mail'
                            }
                        },
                        labelsAsPlaceholder : true,
                        title : "Recuperar contraseña",
                        description : "Por favor, envía tu correo electrónico y te enviaremos una URL temporal para el cambio de tu contraseña: ",
                        buttonText : 'Enviar'
                    }}
                    error={this.state.error}
                    onSubmit={this.onSubmit}
                    
                />

            </div>
        );
    }
}

export default PasswordRecovery;