/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';

type Action =
  | { type: 'openMenu' }
  | { type: 'closeMenu' };

interface State {
  isMenuVisible: boolean;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'openMenu':
      return { ...state, isMenuVisible: true };

    case 'closeMenu':
      return { ...state, isMenuVisible: false };

    default:
      return state;
  }
}

const initialState: State = {
  isMenuVisible: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
