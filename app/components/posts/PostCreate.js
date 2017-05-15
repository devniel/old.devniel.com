import React, { Component } from 'react'
import Form from './../Form';

import './../../styles/posts/PostCreate.pcss';

import PostService from './../../services/PostService';
import {browserHistory} from 'react-router';

class PostCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            error : null
        }
    }

    onSubmit = (post) => {

        console.log('post:', post);

        PostService.create(post, function(err){
            if(err){
                alert(err.message);
                return;
            }

            browserHistory.push('/');
        })
    }

    render () {
        return (
            <div className='PostCreate'>

                <Form 
                    configuration={{
                        style : "Transparent",
                        fields : {
                            title : {
                                type : 'text',
                                label : 'título'
                            },
                            content : {
                                type : 'text',
                                label : 'contenido'
                            }
                        },
                        labelsAsPlaceholder : false,
                        title : "Nuevo post",
                        buttonText : 'Publicar'
                    }}
                    error={this.state.error}
                    onSubmit={this.onSubmit}
                    
                />
                
            </div>
        )
    }
}

export default PostCreate