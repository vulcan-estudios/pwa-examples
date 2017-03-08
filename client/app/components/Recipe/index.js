import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Recipe (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('recipe', className);

  return (
    <div className={cls} {...rest}>
      <img src="/img/juices/banana-split.png" />
      <p>Banana Split</p>
      <button className="button small">Make</button>
    </div>
  );
}

Recipe.propTypes = {
  children: PropTypes.any
};

Recipe.defaultProps = {};
