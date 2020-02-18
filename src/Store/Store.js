import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import {reducer as form} from 'redux-form';
import {funcionPrimaria} from "./Saga/Saga";
import CONSTANTES from "./CONSTANTES";

const reducerSession = (state=[], action) => {
    switch (action.type) {
        case CONSTANTES._SET_USER:
            //console.log("Store: reducerSession: _SET_USER");          
            let email='jorge';
            let uid=true;
            return {email,uid};
        // case CONSTANTES._LOG_OUT_USUARIO:
        //     console.log("Store: reducerSession: _LOG_OUT_USUARIO", state);               
        //     //autenticacion.signOut();                        
        //     return null;            
        default:
            return state;
    }
}


const reducers = combineReducers({
    form,
    reducerSession
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(funcionPrimaria);

export default store;