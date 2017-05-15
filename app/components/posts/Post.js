import React, { Component } from 'react'

import './../../styles/posts/Post.pcss';

class Post extends Component {
    render () {

        var properties = {};

        for(var i in this.props.properties){
            properties[this.props.properties[i].name] = this.props.properties[i].value;
        }

        return ( 
            <div className='Post'>

                <div className='Post-Title'>
                    {properties.title}
                </div>

                <div className='Post-Content'>
                    {properties.content}
                </div>

            </div>
        )
    }
}

export default Post