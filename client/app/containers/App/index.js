import React, { Component } from 'react';
import Halogen from 'halogen';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Alert from 'react-s-alert';
import howler from 'howler';

import { DESIGN } from 'client/app/settings';
import { selectUser, getGeneral, updateNotification } from 'client/app/actions';
import Header from 'client/app/components/Header';
import Nav from 'client/app/components/Nav';
import Footer from 'client/app/components/Footer';

const mapStateToProps = (state) => ({
  app: state.app,
  cooks: state.cooks,
});

const mapDispatchToProps = (dispatch) => ({
  getGeneral: () => dispatch(getGeneral()),
  handleSelectCook: (data) => dispatch(selectUser(data)),
  handleNotificationSeen: (data) => dispatch(updateNotification(data)),
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
      volume: 0.2,
    });
    ambience.stop().play();
  }

  componentDidUpdate () {

    const { app } = this.props;
    const { handleNotificationSeen } = this.props;
    const { notification } = app;

    if (notification) {
      Alert.info(`<b>${notification.title}</b>: ${notification.content}`, {
        timeout: 5000,
        position: 'bottom',
        html: true,
        onClose: () => handleNotificationSeen(null),
      });
    }
  }

  render () {

    const { app, cooks, children } = this.props;
    const { handleSelectCook } = this.props;
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
          <Alert stack={{limit: 3}} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
