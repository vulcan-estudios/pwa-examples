import { ACTIONS } from 'client/app/consts';

const initial = {
  user: null,
  current: null,
  progress: 0,
  error: null,
  isLoading: false,
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

    case ACTIONS.APP_PROGRESS: {
      const progress = action.payload;
      return { ...state, progress };
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
