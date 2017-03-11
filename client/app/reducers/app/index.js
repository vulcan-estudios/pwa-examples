import { ACTIONS } from 'client/app/consts';

const initial = {
  user: null,
  current: null,
  error: null,
  isLoading: false,
  notification: null,
};

export default function reducer (state = initial, action) {
  switch (action.type) {

    case ACTIONS.APP_USER: {
      const user = action.payload;
      return { ...state, user };
    }

    case ACTIONS.APP_CURRENT: {
      const current = action.payload;
      return { ...state, current };
    }

    case ACTIONS.APP_NOTIFICATION: {
      const notification = action.payload;
      return { ...state, notification };
    }

    case ACTIONS.APP_LOADING: {
      const isLoading = action.payload;
      return { ...state, isLoading };
    }

    case ACTIONS.APP_ERROR: {
      const error = action.payload;
      return { ...state, error };
    }

    default:
      return state;
  }
}
