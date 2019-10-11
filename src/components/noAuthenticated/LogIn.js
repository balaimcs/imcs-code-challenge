import React, { Component } from 'react'
import LogInForm from "./LogInForm";
import {Messages} from 'primereact/messages';

import { connect } from 'react-redux';
import { actionAutenticaUsuario } from "../../Store/ACCIONES";

class LogIn extends Component {  

    inyectaDispatchusuario = (values) =>{
        this.props.autenticaUsuarioDispatch(values);
    }

    render() {
        return (
            <div>
                {this.props.mensaje.length>0?<p>todo bien</p>:this.props.mensaje }
                <LogInForm datosUsuarioDispatch={this.inyectaDispatchusuario} />                                
            </div>            
        )
    }
}

  const mapStateToProps = (state) => ({        
    mensaje:state.reducerMensajeErrorAutenticacion
  });
  
  const mapDispatchToProps = (dispatch) =>({
     autenticaUsuarioDispatch:(values) =>{    
       dispatch(actionAutenticaUsuario(values));
     },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);


