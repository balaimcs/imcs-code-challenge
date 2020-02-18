import React, { Component } from 'react'

import {Card} from 'primereact/card';

import { connect } from 'react-redux';
import { actionAuthUsr } from "../../Store/ACCIONES";

import LogInForm from "./LogInForm";

class LogIn extends Component { 
  
    constructor() {
      super();
      this.state = {
          //isAuth:false
      };      
    }

    componentWillMount() {            
    }      

    inyectDispatchUsr = (values) =>{
      this.props.authUsrDispatch(values);
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
                      title="User Authentication" style={{justifyContent: 'center', }}
                      subTitle="Please introduce your credentials.">                                                                                                
                      
                <LogInForm usrDinfo={this.inyectDispatchUsr}/>                                
              </Card>  
              
              {this.props.mensaje?<div className='p-messages p-messages-error'>{this.props.mensaje}</div>:''}
            </div>  
            
        )
    }
}

  const mapStateToProps = (state) => ({        
    mensaje:state.reducerMensajeErrorAutenticacion,
    usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
     authUsrDispatch:(values) =>{    
       dispatch(actionAuthUsr(values));
     },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);
