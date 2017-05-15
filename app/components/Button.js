import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import URL from 'url-parse';

import './../styles/Button.pcss';

class Button extends Component {

    goToHref = (e) => {

        var local_url = new URL(window.location.href);
        var url = new URL(this.props.href);
        
        if(url.host != local_url.host)
            window.location = this.props.href;
        else
            browserHistory.push(this.props.href);
        
    }

    render() {

        var className = "Button";

        if(this.props.className)
            className = "Button " + this.props.className;

        switch(this.props.style){
            case 'red':
                className += " Red";
                break;
            case 'white':
                className += " White";
                break;
            case 'braph':
                className += " Braph-Button";
                break;
            case 'transparent':
                className += " Braph-Button-Transparent";
                break;
        }

        if(this.props.href){
            return (
                <button className={className} onClick={this.goToHref}>{this.props.children}</button>
            );
        }else{
            return (
                <button className={className} onClick={this.props.onClick}>{this.props.children}</button>
            );
        }
        
    }
}

export default Button;