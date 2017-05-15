import React, { Component } from 'react';

import Button from './Button';
import Input from './Input';

import Loader from './Loader';

import './../styles/Form.pcss';

class Form extends Component {

    constructor(props){
        super(props);

        // draft
        this.state = {
            error : null
        }

        // official
        this.fields = {};

        for(var i in props.configuration.fields){
            this.fields[i] = {
                input : null,
                value : null
            }
        }
    }

    onSubmit = (e) => {

        var fields = {};

        try{
            for(var i in this.fields){
                fields[i] = this.fields[i].input.value;
            }

            this.props.onSubmit(fields);
        }catch(e){}

        e.stopPropagation();
        e.preventDefault();

    }

    // draft
    setError = (e) => {
        this.setState({
            error : e
        })
    }

    clean = (e) => {
        try{
            for(var i in this.fields)
                this.fields[i].input.clean();
        }catch(e){}
    }
    
    render() {

        var fields = [];

        for(var i in this.props.configuration.fields){
            var field_data = this.props.configuration[i];

            var inputClassName = 'FormInput';
            var inputStyle = null;

            if(this.props.configuration.style == 'Transparent')
                inputStyle = 'white';

            fields.push(
                <Input 
                    style={inputStyle}
                    className={inputClassName}
                    name={i}
                    label={this.props.configuration.fields[i].label} 
                    labelAsPlaceholder={(this.props.configuration.labelsAsPlaceholder != null) ? this.props.configuration.labelsAsPlaceholder : true} 
                    type={this.props.configuration.fields[i].type}
                    ref={(input) => {
                        if(input != null)
                            this.fields[input.props.name].input = input; 
                    }}
                />
            )
        }

        var className = "Form ";
        
        if(this.props.className)
            className = "Form " + this.props.className;

        if(this.props.configuration.style)
            className = className + " " + this.props.configuration.style;

        if(this.props.configuration.size){
            switch(this.props.configuration.size){
                case 'large':
                    className = className + " Large";
                    break;
            }
        }

        return (
            <form className={className} autoComplete="off">

                { this.props.processing &&
                  <Loader className="Form-Loader" style='red'/>
                }

                { this.props.configuration.title && 
                <span className='Form-Title'>{this.props.configuration.title}</span>
                }
                
                <div className='Form-Body'>

                    { this.props.configuration.description && 
                      <div className='Form-Description'>
                         {this.props.configuration.description}
                      </div>
                    }

                    {fields} 

                    {
                        this.props.error &&
                        <span className='FormError'>{this.props.error.message}</span>
                    }

                    {
                        this.props.info &&
                        <span className='Form-Info'>{this.props.info.message}</span>
                    }

                    <Button className='FormButton' onClick={this.onSubmit}> {this.props.configuration.buttonText || 'Entrar'} </Button>
                    
               </div>

            </form>
        );
    }
}

export default Form;