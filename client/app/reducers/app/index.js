import { ACTIONS } from 'client/app/consts';

const initial = {
  user: null,
  error: null,
  isLoading: false,
};

export default function reducer (state = initial, action) {
  switch (action.type) {

    case ACTIONS.APP_USER: {
      const user = action.payload;
      return { ...state, user };
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
