import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store/Store';
import Panel from "./Panel";

export default function App(){                    
  return (
    <Provider store={Store}>
        <Panel />       
    </Provider> 
  );    
}