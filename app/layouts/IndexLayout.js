import React, { Component } from 'react';

import './../styles/layouts/IndexLayout.pcss';

class IndexLayout extends Component {
  render() {
		return (
			<div className='layout'>
				{this.props.children}
			</div>
		);
  }
}

export default IndexLayout;
