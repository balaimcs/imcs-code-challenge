import {takeEvery, call, put} from 'redux-saga/effects';
import CONSTANTES from "../CONSTANTES";
import axios from 'axios';

    function* example(action){
        yield call(() => {
            let res = axios.get(
                'http://localhost:8080/user/lkajwdiauspkmcpwodipldmaspduawodontusethisjustfortestendpoint')
            .then(res => res.data);
            console.log(res);
        } );   
    }

    // function* autenticaUsuario(action){     
    //     //console.log('Saga: autenticaUsuario: ', action);    
    //     let correo = action.usrInfo.correo;
    //     let password = action.usrInfo.password;
    
    //     //Solicita la autenticación de usuario y actualiza el servicio Firebase
    //     const userAuth = yield call (logInUsuario, {correo, password});     
    
    //     if (userAuth.user) {
    //         //console.log('Saga: autenticaUsuario: if: userAuth.user ', userAuth);
    //         yield put(actionEstableceUsuario(userAuth));
    //         yield put(actionDescribeFalloAutenticacion(userAuth.code));
    //     }
        
    //     //code: "auth/wrong-password"
    //     //code: "auth/user-not-found"
    //     //userAuth.message: Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later
    //     //userAuth.code?console.log('Saga: existe'):console.log('Saga: NOexiste');
    //     if (userAuth.code) {        
    //         if(userAuth.code==='auth/wrong-password'){
    //             //userAuth.code   
    //             yield put(actionDescribeFalloAutenticacion('Contraseña incorrecta'));
    //         }else if(userAuth.code==='auth/user-not-found'){            
    //             //userAuth.code   
    //             yield put(actionDescribeFalloAutenticacion('Usuario no registrado'));
    //         }else{            
    //             yield put(actionDescribeFalloAutenticacion(userAuth.message));
    //         }
    //     }    
    // }

    function* addEventFuntion(action){
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


    function* addGuestFuntion(action){
        let eventId=obtainUrlPart();
        //console.log("Sagas:addGuestFuntion: El eventId"+eventId);
        //console.log(action.agreements);
        yield call(() => {
            axios.post('http://localhost:8080/user/guest', action.agreements)
              .then(function (response) {
                //console.log(response);
                if (response.status===201) {
                    //http://localhost:3000/#/acept-agreement?event=1*
                    window.location = '#/acept-agreement?event='+eventId;
                    alert('Thanks for be part of this curse');                    
                } else {
                    alert('Someting went wrong');
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
        yield takeEvery(CONSTANTES._ADD_NEW_EVENT,addEventFuntion);
        yield takeEvery(CONSTANTES._GUEST_DATA_INFO,addGuestFuntion);
    }