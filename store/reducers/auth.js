// import { set } from 'lodash';
// import state from '../../store/state/auth';
// import types from '../../store/types/auth';

// const initialState = state;

// export default (state = initialState, action) => {
//   const { key, data, error } = action;

//   switch (action.type) {
//     case types.AUTH_REQUEST:
//       state[key] = { loading: true, error: null };
//       return { ...state };
//     case types.AUTH_SUCCESS:
//       state[key] = { loading: false, error: null };
//       return { ...state };
//     case types.AUTH_ERROR:
//       state[key] = { loading: false, error };
//       return { ...state };
//     case types.AUTH_SET:
//       set(state, key, data);
//       return { ...state };
//     default:
//       return state;
//   };
// };

import { set } from 'lodash';
import state from '../../store/state/auth';
import types from '../../store/types/auth';

const initialState = state;

export default (state = initialState, action) => {
  const { key, data, error } = action;
  switch (action.type) {
    case types.AUTH_REQUEST:
      // Start the request (e.g., when the social login request starts)
      state[key] = { loading: true, error: null };
      return { ...state };

    case types.AUTH_SUCCESS:
      // Successful request (e.g., when the social login is successful)
      state[key] = { loading: false, error: null };
      return { ...state };

    case types.AUTH_ERROR:
      // Error occurred during request (e.g., when the social login fails)
      state[key] = { loading: false, error };
      return { ...state };

    case types.AUTH_SET:
      if (key === 'account') {
        return {
          ...state,
          account: data, // Update the account key correctly
        };
      }
      // Set the account data or any other data in the state
      // 'key' will be 'account' in this case when you dispatch the social registration action
      set(state, key, data);
      return { ...state};

    default:
      return state;
  }
};
