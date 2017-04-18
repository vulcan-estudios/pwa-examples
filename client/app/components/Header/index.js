import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Header (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('header', className);

  return (
    <header className={cls} {...rest}>
      <div className="row column">
        <img src="/img/icons/icon-256x256.png" alt="Logo" />
        <h1>Blender[R]</h1>
      </div>
    </header>
  );
}
