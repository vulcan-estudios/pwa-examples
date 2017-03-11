import howler from 'howler';
import { ACTIONS } from 'client/app/consts';

const AUDIO_DURATION = 15000;
const INTERVAL = 1000;

export const selectUser = (data) => {
  return {
    type: ACTIONS.APP_USER,
    payload: data
  };
};

export const updateCurrent = (data) => {
  return {
    type: ACTIONS.APP_CURRENT,
    payload: data
  };
};

export const updateNotification = (data) => {
  return {
    type: ACTIONS.APP_NOTIFICATION,
    payload: data
  };
};

export const loading = (data = false) => {
  return {
    type: ACTIONS.APP_LOADING,
    payload: !!data
  };
};

export const error = (data) => {
  return {
    type: ACTIONS.APP_ERROR,
    payload: data
  };
};

export const resetCooks = (data = []) => {
  return {
    type: ACTIONS.COOKS_RESET,
    payload: data
  };
};

export const resetFruits = (data = []) => {
  return {
    type: ACTIONS.FRUITS_RESET,
    payload: data
  };
};

export const resetRecipes = (data = []) => {
  return {
    type: ACTIONS.RECIPES_RESET,
    payload: data
  };
};

export const resetJuices = (data = []) => {
  return {
    type: ACTIONS.JUICES_RESET,
    payload: data
  };
};

export const addJuice = (data) => {
  return {
    type: ACTIONS.JUICES_ADD,
    payload: data
  };
};

export const getGeneral = () => (dispatch, getState) => {

  dispatch(loading(true));

  Promise.all([
    $.get('/api/cooks'),
    $.get('/api/fruits'),
    $.get('/api/recipes'),
    $.get('/api/juices')
  ]).
  then(results => {

    const [ cooks, fruits, recipes, juices ] = results;

    dispatch(resetCooks(cooks));
    dispatch(resetFruits(fruits));
    dispatch(resetRecipes(recipes));
    dispatch(resetJuices(juices));

  }, () => {
    dispatch(error({
      message: 'Network error.'
    }));
  }).
  then(() => {
    dispatch(loading(false));
  });
};

export const getJuices = () => (dispatch, getState) => {

  dispatch(loading(true));

  $.get('/api/recipes').
  then(items => {
    dispatch(resetJuices(items));
  }, () => {}).
  then(() => {
    dispatch(loading(false));
  });
};

export const postJuice = (newItem) => (dispatch, getState) => {
  $.post('/api/juices', newItem).
  then(item => {

    const { cooks } = getState();
    const cook = cooks.find(_cook => _cook.id === item.cook);
    const { name: cookName } = cook || {};

    dispatch(addJuice(item));
    dispatch(updateNotification({
      title: 'New Juice!',
      content: `A new juice has been added by ${cookName}.`,
    }));
  });
};

export const stopBlending = () => (dispatch, getState) => {

  const { app } = getState();
  const { interval, audio } = app.current || {};

  clearInterval(interval);

  if (audio) {
    audio.stop();
  }

  dispatch(updateCurrent(null));
  dispatch(updateNotification(null));
};

export const startBlending = ({ recipeId, cookId }) => (dispatch, getState) => {

  dispatch(stopBlending());

  const interval = setInterval(() => {

    const { app } = getState();
    const { progress = 0, duration = 0 } = app.current;

    if (progress >= 100) {
      dispatch(stopBlending());
      dispatch(postJuice({
         recipe: recipeId,
         cook: cookId,
      }));
    }
    else {
      const newDuration = duration + INTERVAL;
      const newProgress = Math.round((newDuration / AUDIO_DURATION) * 100);

      dispatch(updateCurrent({
        ...app.current,
        duration: newDuration,
        progress: newProgress,
      }));
    }
  }, INTERVAL);

  const audio = new howler.Howl({
    src: ['/sounds/blender.mp3'],
    volume: 0.5,
  });
  audio.stop().play();

  dispatch(updateCurrent({
    recipeId,
    cookId,
    interval,
    audio,
  }));
};
