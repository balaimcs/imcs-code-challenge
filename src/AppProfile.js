import React, { Component } from 'react';
import classNames from 'classnames';

//import { autenticacion } from "./Store/Servicios/Firebase";
//import { actionLogOutUsuario } from "./Store/ACCIONES";

import { connect } from 'react-redux';

class AppProfile extends Component {

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
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">{this.props.usuario.email}</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link" onClick={ ()=>{console.log(this.props.usuario);}}><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">6</span></button></li>
                    <li><button className="p-link" 
                            onClick={()=>{ 
                                this.props.logOutDispatch();
                                //autenticacion.signOut(); 
                                }
                            }>
                            <i className="pi pi-fw pi-power-off"/>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}
  
  const mapStateToProps = (state) => ({        
    usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
    // logOutDispatch:() =>{    
    //     dispatch(actionLogOutUsuario());
    //   },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(AppProfile);