import React, { Component } from 'react'

import './../styles/incidents/Incident.pcss';

class Incident extends Component {
    render () {
        return (
            <div className='Incident' onClick={this.props.onClick}>
                <span className='Incident-Name'>{this.props.name}</span>
                <span className='Incident-Place'>{this.props.ubigeo.department.name}</span>
            </div>
        )
    }
}

export default Incident