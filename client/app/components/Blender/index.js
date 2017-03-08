import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Blender (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('blender', className);

  return (
    <div className={cls} {...rest}>
      <div className="row column">
        <div className="blender__content">
          <img className="blender__logo" src="/img/blender/blender-on.png" />
          <img className="blender__fruit blender__fruit1" src="/img/fruits/banana.png" />
          <img className="blender__fruit blender__fruit3" src="/img/fruits/apple.png" />
          <img className="blender__fruit blender__fruit2" src="/img/fruits/orange.png" />
          <img className="blender__fruit blender__fruit4" src="/img/fruits/grape.png" />
        </div>
        <div className="progress" role="progressbar">
          <div className="progress-meter" style="width: 70%"></div>
        </div>
      </div>
    </div>
  );
}

Blender.propTypes = {
  children: PropTypes.any
};

Blender.defaultProps = {};
