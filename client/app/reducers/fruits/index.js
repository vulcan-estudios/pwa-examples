import { ACTIONS } from 'client/app/consts';

const initial = [];

export default function reducer (state = initial, action) {
  switch (action.type) {

    case ACTIONS.FRUITS_RESET: {
      const items = action.payload;
      return items;
    }

    default:
      return state;
  }
}
