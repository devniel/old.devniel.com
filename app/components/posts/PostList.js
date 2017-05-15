import React, { Component } from 'react'

import PostStore from './../../stores/PostStore';
import PostActions from './../../actions/PostActions';

import Loader from './../../components/Loader';
import octicons from "octicons";

import Post from './Post';

import './../../styles/posts/PostList.pcss';

class PostList extends Component {

    constructor(){
        super();

        this.state = {
            error : null,
            posts : null,
            processing : true
        }
    }

    componentDidMount() {
        PostStore.addChangeListener(this._onChangePostStore);
        PostActions.list();
    }

    componentWillUnmount() {
        PostStore.removeChangeListener(this._onChangePostStore);
    }

    _onChangePostStore = () => {

        if(PostStore.error){
           return this.setState({
               error : PostStore.error,
               processing : false
           });
        }

        this.setState({
            processing: false,
            error : null,
            posts : PostStore.posts
        });

    }

    _onSelectPost = (post) => {

    }

    render () {

        var self = this;

        if(this.state.processing){
            return(
                <div className='PostList'>
                    <Loader style='white'/>
                </div>
            );
        }

        if(this.state.error){
            return(
                <div className='PostList'>
                    <div className='PostList-Message'>
                        <i className="icon" dangerouslySetInnerHTML={{__html: octicons['issue-opened'].toSVG()}}></i>
                        Ocurrió un error
                    </div>
                </div>
            );
        }

        var posts = this.state.posts.map(function(post){
            return <Post onClick={self._onSelectPost.bind(this, post)} key={post.id} {...post}/>
        })

        return (
            <div className='PostList'>

                {
                    this.state.posts.length == 0 &&
                    <div className='PostList-Message'>
                        <i className="icon" dangerouslySetInnerHTML={{__html: octicons.inbox.toSVG()}}></i>
                        No hay posts
                    </div>
                }

                {posts}

            </div>
        )
    }


}

export default PostList;