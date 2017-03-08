import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = function (state) {
  return {};
};

class RecipesContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    return (
      <div className='recipes row column'>
        Recipes
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RecipesContainer));
