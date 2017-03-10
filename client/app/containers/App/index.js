import React, { Component } from 'react';
import Halogen from 'halogen';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import howler from 'howler';

import { DESIGN } from 'client/app/settings';
import { selectUser, getGeneral } from 'client/app/actions';
import Header from 'client/app/components/Header';
import Nav from 'client/app/components/Nav';
import Footer from 'client/app/components/Footer';

const mapStateToProps = (state) => ({
  app: state.app,
  cooks: state.cooks,
});

const mapDispatchToProps = (dispatch) => ({
  getGeneral: () => dispatch(getGeneral()),
  handleSelectCook: (cookId) => dispatch(selectUser(cookId)),
});

class AppContainer extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {

    this.props.getGeneral();

    const ambience = new howler.Howl({
      src: ['/sounds/ambience.mp3'],
      loop: true,
      volume: 0.25,
    });
    ambience.stop().play();
  }

  render () {

    const { app, cooks, handleSelectCook, children } = this.props;
    const { user, error, isLoading } = app;

    let content = children;

    if (isLoading) {
      content = (
        <div className='app__loading'>
          <Halogen.ClipLoader color={DESIGN.COLOR} />
        </div>
      );
    }
    else if (error) {
      content = (
        <p className='lead'><b>{app.error.message}</b></p>
      );
    }
    else if (!user) {
      const options = cooks.map(item => ({
        value: item.id,
        label: item.name,
      }));
      content = (
        <div className='app__cooks'>
          <p>Select a cook first:</p>
          <Select options={options} onChange={cook => handleSelectCook(cook.value)} />
        </div>
      );
    }

    return (
      <div className='app'>
        <Header />
        <Nav />
        <div className='row column'>
          {content}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
