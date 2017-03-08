import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'client/app/components/Header';
import Nav from 'client/app/components/Nav';
import Footer from 'client/app/components/Footer';

class AppContainer extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    const { children } = this.props;
    return (
      <div className='app'>
        <Header />
        <Nav />
        {children}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect()(AppContainer));
