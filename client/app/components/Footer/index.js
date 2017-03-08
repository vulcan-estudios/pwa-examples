import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Footer (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('footer', className);

  return (
    <footer className={cls} {...rest}>
      <div className="row column">
        <img src="/img/vulcanbambi.png" />
        <p>VulcanBambi Studios</p>
      </div>
    </footer>
  );
}
