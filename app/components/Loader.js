import React, { Component } from 'react';

var Loader = require('react-loaders').Loader;
import './../styles/Loaders.pcss';

class MyLoader extends Component {

    render() {

        var className = "Loader-Wrapper";

        if(this.props.className){
            className += " " + this.props.className;
        }

        switch(this.props.style){
            case 'white':

                className += " White";

                return (
                    <div className={className}>
                        <Loader type="line-scale" active={true}/>
                    </div>
                );
                break;
            case 'red':

                className += " Red";

                return (
                    <div className={className}>
                        <Loader type="line-scale" active={true}/>
                    </div>
                );
            break;
            default:
                return (
                    <div className={className}>
                        <Loader type="line-scale" active={true}/>
                    </div>
                );
        }
        
    }

}

export default MyLoader;