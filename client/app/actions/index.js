import { ACTIONS } from 'client/app/consts';

export const selectUser = (data) => {
  return {
    type: ACTIONS.APP_USER,
    payload: data
  };
};

export const setCurrent = (data) => {
  return {
    type: ACTIONS.APP_CURRENT,
    payload: data
  };
};

export const updateProgress = (data = 0) => {
  return {
    type: ACTIONS.APP_PROGRESS,
    payload: Math.min(Math.max(Number(data), 0), 100)
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
    dispatch(addJuice(item));
  });
};
