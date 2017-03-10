import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Recipe (props) {

  const { id, name, image, fruits, className, children, ...rest } = props;
  const cls = classNames('recipe', className);

  return (
    <div className={cls} data-id={id} {...rest}>
      <img src={image} />
      <p>{name}</p>
      <span className='recipe__children'>{children}</span>
    </div>
  );
}

Recipe.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.any,
};

Recipe.defaultProps = {
  name: 'Unknown',
};
