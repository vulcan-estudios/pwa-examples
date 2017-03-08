import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = function (state) {
  return {};
};

class FridgeContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    return (
      <div className='fridge row column'>
        Fridge
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(FridgeContainer));
