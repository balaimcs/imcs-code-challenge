import CONSTANTES from "./CONSTANTES";

    // export const actionEstablecerUsuario = usuario => ({
    //     type: CONSTANTES._ESTABLECE_USUARIO_SESSION,
    //     usuario
    // });

    
    //PanelSolicitudes
    export const actionObtenListaMaquinaria = () => ({
        type: CONSTANTES._OBTEN_MAQUINAS,        
    });

    //Saga
    export const actionEstableceListaMaq = listaMaq => ({
        type: CONSTANTES._ESTABLECE_LISTA_MAQ,
        //datos:listaMaq
        listaMaq
    });

    //LogIn
    export const actionAutenticaUsuario = usrInfo => ({
        type: CONSTANTES._AUTENTICA_USUARIO,    
        usrInfo:usrInfo
    });

    //Start
    export const actionEstableceUsuario = usrInfo => ({
        type: CONSTANTES._ESTABLECE_USUARIO,    
        usrInfo:usrInfo
    });

    export const actionLogOutUsuario = () => ({
        type: CONSTANTES._LOG_OUT_USUARIO,    
    });
    


