import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import Recipe from 'client/app/components/Recipe';

const mapStateToProps = function (state) {
  return {
    recipes: state.recipes,
  };
};

class RecipesContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const { recipes } = this.props;

    const recipesElements = recipes.map(recipe => (
      <Recipe key={recipe.id} {...recipe}>
        <Link className="button small" to={`/blender/${recipe.id}`}>Make</Link>
      </Recipe>
    ));

    return (
      <div className='recipes row column'>
        {recipesElements}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RecipesContainer));
