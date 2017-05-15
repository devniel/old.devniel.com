import React, { Component } from 'react';
import {Link} from 'react-router';
import './../styles/Footer.pcss';

class Footer extends Component {
    render() {
        return (
            <div className='Footer'>
                <div className="inner clearfix">
                    <div className='center'>
                        <p className="center">powered by <strong>braph</strong></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;