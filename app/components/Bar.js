import React, { Component } from 'react';

// Constants
import AppConstants from './../constants/AppConstants';

// Stores
import AuthStore from "../stores/AuthStore";
import AppStore from './../stores/AppStore';

// Components 
import { Link } from 'react-router'
import Button from './Button';

// Styles
import "./../styles/Bar.pcss";
import "./../styles/Logo.pcss";

var octicons = require("octicons");

export default class Bar extends Component {

    constructor(props){
        super(props);
        var props = props || {};

        console.log('AuthStore:', AuthStore);

        this.state = {
            user : AuthStore.user,
            user_role : AuthStore.user_role,
            style : props.style || 'blue',
            type : props.type || 'normal'
        }
    }

    componentWillMount() {
        AuthStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {

        
        this.setState({
            user: AuthStore.user,
            user_role: AuthStore.user_role
        });
    }
    
    render() {

        var pathname = (this.props && this.props.location)? this.props.location.pathname : "/";

        switch(this.state.type){
            
            case 'settings':

                return (
                    <div className='Bar-Settings'>
                        <div className='Bar-Settings-Braph-ID'>
                            ID: {this.state.braph.id}
                        </div>
                        <div className='Bar-Settings-User'>
                            <Link to={"/braphs/" + this.state.braph.id} className='clearfix'>
                                <img src={this.state.braph.identity.picture.url} />
                                <span>{this.state.braph.name}</span>
                            </Link>
                        </div>
                    </div>
                );

                break;

            default:

                if(this.state.user){

                    return (
                        <div className='Bar'>
                            <div className="inner clearfix">

                                <div className="bar-logo-wrapper">
                                    <div className='Logo'>
                                        <Link to={'/'}>
                                            Devniel<span className='dim'>.com</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="bar-nav-wrapper">
                                    
                                    {/* LEFT */}
                                    <div className='nav left'>
                                        
                                        <ul>
                                                    
                                            { ((this.state.user_role == "creator")) && 
                                                <li>
                                                    <Button style='transparent' href={"/posts/create"}> 
                                                        <i className="icon" dangerouslySetInnerHTML={{__html: octicons.pencil.toSVG()}}></i>
                                                        <span>nuevo post</span>
                                                    </Button>
                                                </li>
                                            }

                                        </ul>

                                    </div>

                                    {/* RIGHT */}
                                
                                    <div className='nav right'>
                                        <ul>                                        
                                            <li>

                                                <Button 
                                                    href={'/'}
                                                    style='braph'
                                                > 
                                                    {this.state.user.email}
                                                </Button>
                                                
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                    );

                }else{

                    return (
                        <div className='Bar'>
                            <div className="inner clearfix">
                            
                                <div className="bar-logo-wrapper">
                                    <div className='Logo'>
                                        <Link to={'/'}>
                                            Devniel<span className='dim'>.com</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="bar-nav-wrapper">
                                    <div className='nav left'></div>
                                    <div className='nav right right-public'>
                                        <ul>
                                            <li>

                                                <Button 
                                                    href={AppConstants.BRAPH_LOGIN_URL +'?client_id=' + AppStore.client_id + '&redirect_uri=' + encodeURIComponent(AppConstants.URL + "/auth/oauth/braph")}
                                                    style='braph'
                                                > 
                                                    Entrar con Braph
                                                </Button>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    );

                }

        }

        

    }

};
