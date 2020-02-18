import CONSTANTES from "./CONSTANTES";

    export const setUsr = usrInfo => ({
        type: CONSTANTES._SET_USER,
        usrInfo
    });

    export const actionLogOutUsuario = () => ({
        type: CONSTANTES._LOG_OUT_USUARIO,    
    });

    //Login
    export const actionAuthUsr = user => ({
        type: CONSTANTES._USER_AUTH,
        usrInfo:user
    });

    export const addEventAction = event => ({
        type: CONSTANTES._ADD_NEW_EVENT,
        event
    });

    export const guestDataAction = agreements => ({
        type: CONSTANTES._GUEST_DATA_INFO,
        agreements
    });
    

    
    


