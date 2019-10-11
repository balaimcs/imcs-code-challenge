import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store/Store';
import RevisarPermisos from "./RevisarPermisos";

export default function App(){                    
  return (
    <Provider store={Store}>
        <RevisarPermisos />       
    </Provider> 
  );    
}