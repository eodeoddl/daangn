import { useReducer, useEffect } from 'react';

const initializer = (payload) => {
  return { ...payload };
};

const reducer = ({ state, action }) => {
  switch (action.type) {
    case 'refresh':
      return initializer(action.payload);
    case 'addHistory':
      const userInfo = {
        data: state,

        set setHistory(history) {
          this.data = { ...this.data, history };
        },

        get editedInfo() {
          return this.data;
        },
      };

      state.fireStore
        .getUserHistory(state.uid)
        .then((res) => (userInfo.setHistory = res));

      return { ...userInfo.editedInfo };
    default:
      throw new Error();
  }
};

const UpdateInfo = ({ initialInfo }) => {
  const [state, dispatch] = useReducer(reducer, initialInfo, initializer);

  useEffect(() => {
    dispatch({ type: 'addHistory' });
  }, []);

  return state;
};

export default UpdateInfo;
