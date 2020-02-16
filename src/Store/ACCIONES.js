import CONSTANTES from "./CONSTANTES";

    // export const actionEstablecerUsuario = usuario => ({
    //     type: CONSTANTES._ESTABLECE_USUARIO_SESSION,
    //     usrInfo:usuario
    // });

    // export const actionLogOutUsuario = () => ({
    //     type: CONSTANTES._LOG_OUT_USUARIO,    
    // });

    export const addEventAction = event => ({
        type: CONSTANTES._ADD_NEW_EVENT,
        event
    });

    export const guestDataAction = agreements => ({
        type: CONSTANTES._GUEST_DATA_INFO,
        agreements
    });
    

    
    


