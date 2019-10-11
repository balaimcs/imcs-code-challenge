import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import {reducer as form} from 'redux-form';
import {funcionPrimaria} from "./Saga/Saga";
import CONSTANTES from "./CONSTANTES";

const reducerSession = (state=[], action) => {
    switch (action.type) {
        case CONSTANTES._ESTABLECE_USUARIO:            
            const {usrInfo:{uid}, usrInfo:{email}}= action;                                    
            return {email,uid};                
        
        case CONSTANTES._LOG_OUT_USUARIO:            
            return null;    
        
        default:
            return state;
    }
}

const reducerEstableceListaMaq = (state=[], action=null) => {
    switch (action.type) {
        case CONSTANTES._ESTABLECE_LISTA_MAQ:
             console.log("Store: reducertest: _ESTABLECE_LISTA_MAQ", action);          
             //return {email,uid};
             return action.listaMaq; 
        default:
            return state;
    }
}

const reducerMensajeErrorAutenticacion = (state=[], action) => {
    switch (action.type) {
        case CONSTANTES._DESCRIBE_FALLO_AUTENTICACION:
             console.log("Store: reducerMensajeErrorAutenticacion: _DESCRIBE_FALLO_AUTENTICACION", action);
             { mensaje } action;          
             return mensaje;
             //return state; 
        default:
            return state;
    }
}

const reducers = combineReducers({
    form,
    reducerSession,
    reducerEstableceListaMaq,
    reducerMensajeErrorAutenticacion,
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(funcionPrimaria);

export default store;