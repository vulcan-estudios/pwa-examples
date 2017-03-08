import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default function Nav (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('nav', className);

  return (
    <nav className={cls} {...rest}>
      <div className="row column">
        <ul>
          <li><Link to='/'>Fridge</Link></li>
          <li><Link to='/recipes'>Recipes</Link></li>
        </ul>
      </div>
    </nav>
  );
}
