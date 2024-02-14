import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import {ReduxProvider} from "./redux/provider";

function App() {
  return (
    <div className="App">
        <ReduxProvider>
            <Main/>
        </ReduxProvider>
    </div>
  );
}

export default App;
