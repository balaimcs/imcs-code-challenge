import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppMenu} from './AppMenu';
import {Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Dialog} from 'primereact/dialog';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';

import {AppFooter} from './AppFooter';
import AppProfile from './AppProfile';

import { FileUploadDemo } from "./FileUploadDemo";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';

import { actionAuthUsr } from "./Store/ACCIONES";

import {Dashboard} from './components/Dashboard';
import EventSubmit from './components/authenticated/EventSubmit';
import GuestList from "./components/authenticated/GuestList";

import EventSubscription from "./components/noAuthenticated/EventSubscription";
import GuestSubmit from "./components/noAuthenticated/GuestSubmit";
import Agreement from "./components/noAuthenticated/Agreement";
import LogIn from "./components/noAuthenticated/LogIn";
import LogInForm from "./components/noAuthenticated/LogInForm";

class Panel extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: !false,
            overlayMenuActive: false,
            mobileMenuActive: false,

            adminMenuActive: false,
            isLogVisible:false,
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    inyectDispatchUsr = (values) =>{
        this.props.authUsrDispatch(values);
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }
    }
    
    ////////////////////////////////////////////MENU COMPONENTS /////////////////////////////////////
    createMenu() {
        this.menu = [
            // {label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
            //{label: 'Upload', icon: 'pi pi-fw pi-home', to: '/upload'},
            // {label: 'Example', icon: 'pi pi-fw pi-home', to: '/empty'},
            {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
            // {label: 'Event Subscription', icon: 'pi pi-fw pi-home', to: '/event-subscription'},
            {
                label: 'Admin Pannel', icon: 'pi pi-fw pi-cog',
                items: [
                    {label: 'New Event', icon: 'pi pi-fw pi-home', to: '/new-event'},
                    {label: 'GuestList', icon: 'pi pi-fw pi-home', to: '/guest-list'},      
                ]
            }
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        const header=(<div> <img src="assets/layout/images/profile.png" /></div>);

        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        const mainClassName = classNames("layout-main", {
            
        });

        const topBarClassName = classNames("clearfix", {
            'layout-topbar': !this.state.chatBarActive,
            'topbar-chat': this.state.chatBarActive,
        });

        
        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar topBarClassName={topBarClassName} onToggleMenu={this.onToggleMenu} 
                    pannel={this} menuButton={this.props.usuario.uid?true:false}/>
                
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    {/* <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div> */}
                    
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>
                
                <div className={mainClassName}>
                    <Route path="/upload" component={FileUploadDemo} />
                    { this.props.usuario.uid?<Route path="/new-event" component={EventSubmit}/>:false }
                    { this.props.usuario.uid?<Route path="/guest-list" component={GuestList}/>:false }
                    
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/event-subscription" component={EventSubscription} />
                    <Route path="/guest-submit" component={GuestSubmit} />
                    <Route path="/acept-agreement" component={Agreement} />

                    <Route path="/login" component={LogIn} /> 
                </div>

                <div className="layout-mask"></div>

                <Dialog header="LogIn" visible={this.props.usuario.uid?false:this.state.isLogVisible} style={{width: '50vw'}} 
                    modal={true} onHide={() => this.setState({isLogVisible: false})}>
                    <div className="layout-profile"> 

                    <Card className="p-card" header={header}                
                            title="User Authentication" style={{justifyContent: 'center', }}
                            subTitle="Please introduce your credentials.">                                                                                                
                            
                        <LogInForm usrDinfo={this.inyectDispatchUsr}/>                                
                    </Card>  
                    
                    {/* {this.props.mensaje?<div className='p-messages p-messages-error'>{this.props.mensaje}</div>:''} */}
                    </div> 
                </Dialog>
            </div>
        );
    }
}

//export default Panel;

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
  export default connect(mapStateToProps,mapDispatchToProps)(Panel);
