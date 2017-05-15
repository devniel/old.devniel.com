import React, {Component} from 'react';
import AppStore from './../stores/AppStore';

// CSS
import './../styles/Loaders.pcss';
import './../styles/Index.pcss';

import IndexLayout from './../layouts/IndexLayout';


// Components
import {Loader} from './../components/Loader';
import PostList from './../components/posts/PostList';
import Footer from './../components/Footer';
import Bar from './../components/Bar';

export default class Index extends Component {
  
  constructor(props){
      super(props);
      props = props || {};
      
      this.state = {
        ready : AppStore.ready
      }

  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
      this.setState({
          ready: AppStore.ready
      });
  }
  
  render() {

    if(!this.state.ready){

      return(
        <Loader style='white'/>
      )

    }else{
      
      return (

      <IndexLayout>

        {/* Container */}

        <div className="container">

          <div className='header'>
            <Bar type="landing"/>
          </div>
          
          <div className='content'>
              {this.props.children}
          </div>
        </div>

        {/* Footer */}

        <Footer/>

      </IndexLayout>

      );

    }
  }

}