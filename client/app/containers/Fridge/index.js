import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Recipe from 'client/app/components/Recipe';

const mapStateToProps = function (state) {
  return {
    cooks: state.cooks,
    juices: state.juices,
    recipes: state.recipes,
  };
};

class FridgeContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const { cooks, juices, recipes } = this.props;

    const juicesElements = juices.map(juice => {

      const cook = cooks.find(_cook => _cook.id === juice.cook);
      const { name: cookName } = cook || {};

      const recipe = recipes.find(_recipe => _recipe.id === juice.recipe);
      const { name, image } = recipe || {};

      const datetime = moment(juice.date).format('dddd, MMMM D, hh:mm a');

      return (
        <Recipe key={juice.id} name={name} image={image}>
          Created by <i>{cookName}</i> on {datetime}
        </Recipe>
      );
    });

    return (
      <div className='fridge row column'>
        {juicesElements}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(FridgeContainer));
