import React, { Component } from 'react'

import './../styles/Input.pcss';

class Input extends Component {

    constructor(props){
        super(props);

        this.state = {
            value : null
        }
    }

    componentDidMount() {
        if(this.props.focus){
            this.input.focus();
        }
    }
    

    get value(){
        return this.state.value
    }

    focus = () => {
        this.input.focus();
    }

    clean = () => {
        this.setState({
            value : ''
        })
    }

    _onInput = (e) => {
        this.setState({
            value : e.target.value
        })
    }

    render () {

        var className = "Input";

        if(this.props.className)
            className = "Input " + this.props.className;

        switch(this.props.style){
            case 'white':
                className += ' Input-White';
                break;
            
            case 'forRedBackground':
                className += ' Input-ForRedBackground';
                break;
        }

        switch(this.props.type){
            
            case 'password':

                if(this.props.labelAsPlaceholder){
                    return (
                        <div className={className}>
                            <input type='password' 
                                placeholder={this.props.label} 
                                value={this.state.value} 
                                onChange={this._onInput} 
                                ref={(input) => { this.input = input; }}
                                autoComplete="off" />
                        </div>
                    );
                }

                return (
                    <div className={className}>
                        <label>{this.props.label}</label>
                        <input type='password' 
                            value={this.state.value} 
                            onChange={this._onInput} 
                            ref={(input) => { this.input = input; }}
                            autoComplete="off"/>
                    </div>
                )

                break;

            case 'text':

                if(this.props.labelAsPlaceholder){
                    return (
                        <div className={className}>
                            <input type='text' 
                                placeholder={this.props.label} 
                                value={this.state.value} 
                                onChange={this._onInput} 
                                ref={(input) => { this.input = input; }}
                                autoComplete="off"/>
                        </div>
                    );
                }

                return (
                    <div className={className}>
                        <label>{this.props.label}</label>
                        <input type='text' 
                            value={this.state.label} 
                            onChange={this._onInput} 
                            ref={(input) => { this.input = input; }}
                            autoComplete="off"/>
                    </div>
                )
                break;

            default:

                if(this.props.labelAsPlaceholder){
                    return (
                        <div className={className}>
                            <input type='text' 
                                placeholder={this.props.label} 
                                value={this.state.value} 
                                onChange={this._onInput} 
                                ref={(input) => { this.input = input; }}
                                autoComplete="off"/>
                        </div>
                    );
                }

                return (
                    <div className={className}>
                        <label>{this.props.label}</label>
                        <input type='text' 
                            value={this.state.value} 
                            onChange={this._onInput} 
                            ref={(input) => { this.input = input; }}
                            autoComplete="off"/>
                    </div>
                )
                break;

        }
        
    }
}

export default Input;