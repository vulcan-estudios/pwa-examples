import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import howler from 'howler';
import { setCurrent, updateProgress } from 'client/app/actions';
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
    handleCurrent: (recipe) => dispatch(setCurrent(recipe)),
    handleProgress: (progress) => dispatch(updateProgress(progress)),
  };
};

class BlendingContainer extends Component {

  constructor () {
    super(...arguments);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
  }

  componentDidMount () {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, () => this.stop());
  }

  componentWillUnmount () {
    this.stop();
  }

  render () {

    const { params, app, fruits, recipes } = this.props;
    const { recipeId } = params;

    const isOn = !!app.current;
    const progress = app.progress;
    const recipe = recipes.find(recip => recip.id === recipeId);

    let recipeFruits = recipe.fruits.map(fruitId => fruits.find(f => f.id === fruitId));

    if (!recipeFruits.length) {
      recipeFruits = [...fruits];
      recipeFruits.length = recipeFruits.length > 4 ? 4 : recipeFruits.length;
    }

    while (recipeFruits.length > 0 && recipeFruits.length < 4) {
      recipeFruits = recipeFruits.concat(recipeFruits);
    }

    const buttonEl = isOn ? (
      <button className='button alert' onClick={this.stop}>Stop</button>
    ) : (
      <button className='button' onClick={this.start}>Start</button>
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

  start () {

    // TODO: The audio y stuff should be in the action creator, not here.

    const { params, app, recipes, handleCurrent, handleProgress } = this.props;
    const { recipeId } = params;
    const { progress } = app;
    const recipe = recipes.find(recip => recip.id === recipeId);

    const AUDIO_DURATION = 15000;
    const INTERVAL = 1000;

    handleCurrent(recipe);

    this.audio = new howler.Howl({
      src: ['/sounds/blender.mp3'],
      volume: 0.5,
    });
    this.audio.stop().play();

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (progress >= AUDIO_DURATION) {
        this.complete();
      }
      else {
        const duration = (progress / 100) * AUDIO_DURATION;
        const newProgress = Math.round(((duration + INTERVAL) / AUDIO_DURATION) * 100);
        handleProgress(newProgress);
      }
    }, INTERVAL);
  }

  stop () {

    const { handleCurrent, handleProgress } = this.props;

    handleCurrent(null);
    handleProgress(0);

    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.audio) {
      this.audio.stop();
    }
  }

  complete () {
    this.stop();

    // TODO: Dispatch action with new juice.
    // TODO: Show popup with complete message.
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlendingContainer));
