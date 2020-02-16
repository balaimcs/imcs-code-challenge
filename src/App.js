import React, {Component} from 'react';

import { Provider } from 'react-redux';
import Store from './Store/Store';
//import RevisarPermisos from "./RevisarPermisos";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';

import Panel from "./Panel";
export default function App(){                    
  return (
    <Provider store={Store}>
        <Panel />       
    </Provider> 
  );    
}