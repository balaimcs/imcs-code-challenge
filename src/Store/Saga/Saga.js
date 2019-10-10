import {takeEvery, call, put} from 'redux-saga/effects';
import CONSTANTES from "../CONSTANTES";
import { baseDeDatos, autenticacion } from "../Servicios/Firebase";
import { actionEstableceListaMaq } from "../ACCIONES";

//Deprecated-child
const obtenListaMaquinasCall = () => {
    let maquinas = [];               
    baseDeDatos.ref('maquinas').on('value', (snapshot) => {        
        snapshot.forEach(function(data) {
            let costoRenta = data.val().costoRenta;
            let costoVenta = data.val().costoVenta;
            let estado = data.val().estado;
            let fechaDisponible = data.val().fechaDisponible;
            let nombre = data.val().nombre;
            
            maquinas.push({costoRenta, costoVenta, estado, fechaDisponible, nombre});
            //console.log("The " + data.key + " score is " + costoRenta );
          });        
    });
    return maquinas;
}

//Deprecated
function* obtenListaMaquinas(action){     
    let resObtenListaMaquinasCall = yield call(obtenListaMaquinasCall);    
    console.log('Saga: obtenListaMaquinas: ', resObtenListaMaquinasCall);
    yield put(actionEstableceListaMaq(resObtenListaMaquinasCall));
}

const logInUsuario = ({correo, password}) => autenticacion.signInWithEmailAndPassword(correo, password)
        .then(success=>success)
        .catch(error=>{console.log('Sagas: logInUsuario: ',error); });

function* autenticaUsuario(action){     
    //console.log('Saga: autenticaUsuario: ', action);    
    let correo= action.usrInfo.correo;
    let password = action.usrInfo.password;

    //Solicita la autenticación de usuario y actualiza el servicio Firebase
    //const userAuth = yield call (logInUsuario, {correo, password});      
    yield call (logInUsuario, {correo, password});      
}

export function* funcionPrimaria(){    
    //console.log('Saga: funcionPrimaria: Hello Sagas!');    
    yield takeEvery(CONSTANTES._AUTENTICA_USUARIO,autenticaUsuario);        
    yield takeEvery(CONSTANTES._OBTEN_MAQUINAS,obtenListaMaquinas);        
        
}