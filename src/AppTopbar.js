import React, {Component} from 'react';
import {Button} from 'primereact/button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AppTopbar extends Component {
    constructor() {
        super();
        this.state = {   
        };
    }

    componentWillMount() {
        //this.props.estableceUsuarioDispatch();
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    authUser(pannel){        
        pannel.setState({
            isLogVisible: !pannel.state.isLogVisible
        });
        //console.log(pannel);
    }

    authUser2(pannel){        
        pannel.setState({
            adminMenuActive: !pannel.state.adminMenuActive
        });
        //console.log(pannel);
    }

    render() {
        return (
            <div className={this.props.topBarClassName}>
                {this.props.menuButton && <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </button>}
                
                <div className="layout-topbar-icons">  
                    
                    {this.props.menuButton &&<button className="p-link" onClick={()=>{ window.location = '#/'; }}>
                        <span className="layout-topbar-icon pi pi-home"/>
                        {/* <span className="layout-topbar-badge">5</span> */}
                    </button> }

                    {!this.props.menuButton && <button className="p-link" onClick={()=>{this.authUser(this.props.pannel); }}>
                        <span className="layout-topbar-icon pi pi-user"/>
                        {/* <span className="layout-topbar-badge">5</span> */}
                    </button>}                                      
                </div>
            </div>
        );
    }
}

  const mapStateToProps = (state) => ({        
    // mensaje:state.reducerMensajeErrorAutenticacion,
    usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
    // authUsrDispatch:(values) =>{    
    //     dispatch(actionAuthUsr(values));
    // },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(AppTopbar);