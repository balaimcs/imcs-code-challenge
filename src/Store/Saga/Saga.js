import {takeEvery, call, put} from 'redux-saga/effects';
import CONSTANTES from "../CONSTANTES";
import axios from 'axios';

import { setUsr } from "../ACCIONES";

    function* example(action){
        yield call(() => {
            let res = axios.get(
                'http://localhost:8080/user/lkajwdiauspkmcpwodipldmaspduawodontusethisjustfortestendpoint')
            .then(res => res.data);
            console.log(res);
        } );   
    }

    function* authUsrFunction(action){     
        //console.log('Saga: autenticaUsuario: ', action);    
        let mail = action.usrInfo.mail;
        let password = action.usrInfo.password;
         
        let validation=true;
        //let response='';

        if (validation) {
            //console.log('Saga: autenticaUsuario: if: userAuth.user ', userAuth);
            //alert('Event added succesfully');
            window.location = '#/';
            yield put(setUsr({mail,validation}));
            //yield put(actionDescribeFalloAutenticacion(response));
        }
        
        //code: "auth/wrong-password"
        //code: "auth/user-not-found"
        //userAuth.message: Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later
        //userAuth.code?console.log('Saga: existe'):console.log('Saga: Noexiste');
        // if (userAuth.code) {        
        //     if(userAuth.code==='auth/wrong-password'){
        //         //userAuth.code   
        //         yield put(actionDescribeFalloAutenticacion('Contraseña incorrecta'));
        //     }else if(userAuth.code==='auth/user-not-found'){            
        //         //userAuth.code   
        //         yield put(actionDescribeFalloAutenticacion('Usuario no registrado'));
        //     }else{            
        //         yield put(actionDescribeFalloAutenticacion(userAuth.message));
        //     }
        //}    
    }

    function* addEventFunction(action){
        //console.log(action.event.values);
        const {photoUrl,disclaimer,termsAndConditions,business}=action.event.values
        //console.log(disclaimer.htmlValue);
        //
        let event= {
            photoUrl:photoUrl,
            disclaimer:disclaimer.htmlValue,
            termsAndConditions:termsAndConditions.htmlValue,
            business:business.htmlValue
        };

        yield call(() => {
            axios.post('http://localhost:8080/events/addEvent', event)
              .then(function (response) {
                //console.log(response);
                if (response.status===200) {
                    alert('Event added succesfully');
                    window.location = '#/';  
                } else {
                    console.log('Someting went wrong'+ response);
                }
              })
        } );    
    }


    function* addGuestFunction(action){
        let eventId=obtainUrlPart();
        //console.log("Sagas:addGuestFuntion: El eventId"+eventId);
        //console.log(action.agreements);
        yield call(() => {
            axios.post('http://localhost:8080/user/guest', action.agreements)
              .then(function (response) {
                if (response.status===201) {
                    //http://localhost:3000/#/acept-agreement?event=1*
                    window.location = '/'                    
                } else {
                    alert('Something went wrong');
                }
              })
        } );   
    }

    const obtainUrlPart = () =>{
        let location = 'url:'+ window.location;
        var eventIndex = location.lastIndexOf('event');
        var endEventKey = location.lastIndexOf('*');
        var result = location.substring(eventIndex + 6,endEventKey);
        //console.log(result);
        return result;
    }

    export function* funcionPrimaria(){    
        //console.log('Saga: funcionPrimaria: Hello Sagas!');    
        //yield takeEvery(CONSTANTES._AUTENTICA_USUARIO,autenticaUsuario);
        yield takeEvery(CONSTANTES._USER_AUTH,authUsrFunction);        
        yield takeEvery(CONSTANTES._ADD_NEW_EVENT,addEventFunction);
        yield takeEvery(CONSTANTES._GUEST_DATA_INFO,addGuestFunction);
        
    }