import { useReducer, useEffect } from 'react';

const refreshInfo = (userInfo) => {
  return userInfo;
};

const reducer = ({ state, action }) => {
  switch (action.type) {
    case 'refresh':
      return refreshInfo(action.payload);
    case 'setHistory':
      const userInfo = {
        data: state,

        set setHistory(history) {
          this.data.history = history;
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
  const [state, dispatch] = useReducer(reducer, initialInfo, refreshInfo);

  useEffect(() => {
    dispatch({ type: 'refresh', payload: initialInfo });
    dispatch({ type: 'addHistory' });
  }, [initialInfo]);

  return state;
};

export default UpdateInfo;
