import { ACTIONS } from 'client/app/consts';

const initial = [];

export default function reducer (state = initial, action) {
  switch (action.type) {

    case ACTIONS.JUICES_RESET: {
      const items = action.payload;
      return items;
    }

    case ACTIONS.JUICES_ADD: {
      const item = action.payload;
      return [ ...state, item ];
    }

    default:
      return state;
  }
}
