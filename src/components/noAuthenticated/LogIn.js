import React, { Component } from 'react'
import LogInForm from "./LogInForm";

import {Message} from 'primereact/message';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';

import { connect } from 'react-redux';
import { actionAutenticaUsuario } from "../../Store/ACCIONES";

class LogIn extends Component { 
  
    constructor() {
      super();
      this.state = {
          //isAuth:false
      };      
  }

    componentWillMount() {            
    }      

    inyectaDispatchusuario = (values) =>{
      this.props.autenticaUsuarioDispatch(values);
    }


    render() {
      const header=(
        <div>
            <img src="assets/layout/images/profile.png" />
        </div>
      );
     
        return (
          
            <div className="layout-profile"> 
              
              <Card className="p-card" header={header}                
                      title="Autenticar usuario" style={{justifyContent: 'center', }}
                      subTitle="Porfavor ingrese sus credenciales">                                                                                                
                      
                <LogInForm datosUsuarioDispatch={this.inyectaDispatchusuario}/>                                
              </Card>  
              
              {this.props.mensaje?<div className='p-messages p-messages-error'>{this.props.mensaje}</div>:''}
            </div>  
            
        )
    }
}

  const mapStateToProps = (state) => ({        
    mensaje:state.reducerMensajeErrorAutenticacion,
    //usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
     autenticaUsuarioDispatch:(values) =>{    
       dispatch(actionAutenticaUsuario(values));
     },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);
