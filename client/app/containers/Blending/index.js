import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = function (state) {
  return {};
};

class BlendingContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    return (
      <div className='blending row column'>
        Blender
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BlendingContainer));
