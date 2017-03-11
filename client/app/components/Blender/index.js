import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Blender (props) {

  const { progress, isOn, fruits, recipe, className, children, ...rest } = props;
  const cls = classNames('blender', {
    'blender--on': isOn,
  }, className);

  const { name: recipeName } = recipe;
  const status = isOn ? '/img/blender/blender-on.png' : '/img/blender/blender.png';
  const progressStyle = {
    width: Math.round(progress) + '%',
  };

  const fruitsElements = fruits.map((fruit, index) => (
    <img
      key={index}
      className={`blender__fruit blender__fruit${index}`}
      src={fruit.image}
      alt={fruit.name}
    />
  ));

  return (
    <div className={cls} {...rest}>
      <div className="row column">
        <div className="blender__content">
          <img className="blender__logo" src={status} />
          {fruitsElements}
        </div>
        <div className="progress" role="progressbar">
          <div className="progress-meter" style={progressStyle}></div>
        </div>
        <span>{ isOn ? 'Preparing' : 'Prepare' } {recipeName}</span>
      </div>
      {children}
    </div>
  );
}

Blender.propTypes = {
  progress: PropTypes.number,
  isOn: PropTypes.bool,
  fruits: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  })),
  recipe: PropTypes.shape({
    name: PropTypes.string,
  }),
  children: PropTypes.any,
};

Blender.defaultProps = {
  progress: 0,
  isOn: false,
  fruits: [],
  recipe: {
    name: 'Unknown',
  },
};
