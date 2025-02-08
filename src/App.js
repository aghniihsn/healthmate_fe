// import { BrowserRouter } from "react-router-dom";
// import Routes from "./routes";
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes/>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useMemo, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

import { LocalDataContext } from "./core/context";
import localDataReducer from './core/reducer';

import Routes from "./routes";
// import './style.css'

export default function App() {

  const [store, dispatch] = useReducer(localDataReducer, {});
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <LocalDataContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </LocalDataContext.Provider>
  );
};