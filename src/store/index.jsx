import React, { useReducer, createContext } from "react";

const intialState = {
  popular: [],
  related: [],
  searched: [],
  selected: {},
  term: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POPULAR":
      return { ...state, popular: action.payload.popular };
    case "SET_RELATED":
      return { ...state, related: action.payload.related };
    case "SET_SEARCHED":
      return { ...state, searched: action.payload.searched };
    case "SET_SELECTED":
      //selecteだけ更新したいがstateが上書きさせるから、スプレッド構文でstateを展開してやる必要がある
      return { ...state, selected: action.payload.selected };
    case "SET_TERM":
      return { ...state, term: action.payload.term };
    default:
      return state;
  }
};

//global state importすることで各componentで使用しることもできる
export const Store = createContext({
  globalState: intialState,
  setGlobalState: () => null
});

const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, intialState);
  return (
    <>
      <Store.Provider value={{ globalState, setGlobalState }}>
        {children}
      </Store.Provider>
    </>
  );
};

export default StoreProvider;
