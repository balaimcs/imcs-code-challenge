import React, { Component } from 'react'
import { connect } from 'react-redux';

import { autenticacion } from "./Store/Servicios/Firebase";
import { actionEstableceUsuario, actionLogOutUsuario } from "./Store/ACCIONES";

import Panel from "./Panel";
import LogIn from "./components/noAuthenticated/LogIn";

class RevisarPermisos extends Component {

    componentWillMount() {
        this.props.estableceUsuarioDispatch();
    }

    render() {
        return (
            <div>
                {this.props.usuario? <Panel /> : < LogIn/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    usuario:state.reducerSession, 
});

const mapDispatchToProps = (dispatch) =>({
   estableceUsuarioDispatch:() =>{           
      autenticacion.onAuthStateChanged(function(user) {
          if (user) {                              
              dispatch(actionEstableceUsuario(user));                               
          } else {
              dispatch(actionLogOutUsuario());
          }
      })
   },
});

export default connect(mapStateToProps,mapDispatchToProps)(RevisarPermisos);
