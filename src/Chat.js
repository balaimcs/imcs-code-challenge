import React, { Component } from 'react';
import classNames from 'classnames';

//import { autenticacion } from "./Store/Servicios/Firebase";
import { actionLogOutUsuario } from "./Store/ACCIONES";

import { connect } from 'react-redux';

class Chat extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div>
                <div className="layout-profile-chat">
                    <div>
                        <img src="assets/layout/images/profile.png" alt={this.props.usuario.email} />
                    </div>
                    
                    {/* <button className="p-link layout-profile-link" onClick={this.onClick}>
                        <i className="pi pi-fw pi-cog"/>                        
                    </button> */}

                    <button className="p-link layout-profile-link-online" onClick={this.onClick}>
                        <i className="pi pi-fw pi-cog"/>
                    </button>

                    <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                        {/* <li>
                            <button >
                                <i className="pi pi-fw pi-user"/>
                                <span>Cuenta</span>
                            </button>
                        </li> */}
                        
                        <li>
                            <button onClick={()=>{ 
                                    // eslint-disable-next-line no-restricted-globals
                                    if(confirm("¿Seguro que desea salir?")){
                                        this.props.logOutDispatch();
                                        //autenticacion.signOut();
                                    } 
                                }
                            }>
                                <i className="pi pi-fw pi-power-off"/>
                                <span>Salir</span>
                            </button>
                        </li>
                    </ul>
                </div>   
                
                
                <div className="chat-messengers">                    
                    <img src="assets/layout/images/avatar_1.png" alt={this.props.usuario.email} />
                    
                    <div className="div-buttons">
                        <button className="layout-profile-link-online" onClick={this.onClick}>
                            <i className="pi pi-fw pi-cog"/>
                        </button>
                        <button className="layout-profile-link-online" onClick={this.onClick}>
                            <i className="pi pi-fw pi-cog"/>
                        </button>
                    </div>                    
                </div>

                <div className="chat-messengers">                    
                    <img src="assets/layout/images/avatar_2.png" alt={this.props.usuario.email} />
                    
                    <div className="div-buttons">
                        <button className="layout-profile-link-online" onClick={this.onClick}>
                            <i className="pi pi-fw pi-cog"/>
                        </button>
                        <button className="layout-profile-link-online" onClick={this.onClick}>
                            <i className="pi pi-fw pi-cog"/>
                        </button>
                    </div>                    
                </div>
                
            </div>
        );
    }
}
  
  const mapStateToProps = (state) => ({        
    usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
    logOutDispatch:() =>{    
        dispatch(actionLogOutUsuario());
      },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(Chat);