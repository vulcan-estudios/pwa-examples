import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { startBlending, stopBlending } from 'client/app/actions';
import Blender from 'client/app/components/Blender';

const mapStateToProps = function (state) {
  return {
    app: state.app,
    fruits: state.fruits,
    recipes: state.recipes,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleStartBlending: (data) => dispatch(startBlending(data)),
    handleStopBlending: (data) => dispatch(stopBlending(data)),
  };
};

class BlendingContainer extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {
    const { router, route } = this.props;
    const { handleStopBlending } = this.props;
    router.setRouteLeaveHook(route, () => handleStopBlending());
  }

  componentWillUnmount () {
    const { handleStopBlending } = this.props;
    handleStopBlending();
  }

  render () {

    const { params, app, fruits, recipes } = this.props;
    const { handleStartBlending, handleStopBlending } = this.props;
    const { recipeId } = params;
    const { user: cookId } = app;

    const isOn = !!app.current;
    const progress = app.current && app.current.progress || 0;
    const recipe = recipes.find(recip => recip.id === recipeId);

    let recipeFruits = recipe.fruits.map(fruitId => fruits.find(f => f.id === fruitId));

    if (!recipeFruits.length) {
      recipeFruits = [ ...fruits ];
      recipeFruits.length = recipeFruits.length > 4 ? 4 : recipeFruits.length;
    }

    while (recipeFruits.length > 0 && recipeFruits.length < 4) {
      recipeFruits = recipeFruits.concat(recipeFruits);
    }

    const buttonEl = isOn ? (
      <button
        className='button alert'
        onClick={handleStopBlending}
      >
        Stop
      </button>
    ) : (
      <button
        className='button'
        onClick={() => handleStartBlending({ recipeId, cookId })}
      >
        Start
      </button>
    );

    return (
      <div className='blending row column'>
        <Blender isOn={isOn} recipe={recipe} fruits={recipeFruits} progress={progress} />
        <div className='row column text-center'>
          {buttonEl}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlendingContainer));
