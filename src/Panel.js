import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppMenu} from './AppMenu';
import {Route} from 'react-router-dom';

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

import {Dashboard} from './components/Dashboard';
import {EmptyPage} from './components/EmptyPage';
import EventSubmit from './components/authenticated/EventSubmit';
import GuestList from "./components/authenticated/GuestList";

import EventSubscription from "./components/noAuthenticated/EventSubscription";
import GuestSubmit from "./components/noAuthenticated/GuestSubmit";
import Agreement from "./components/noAuthenticated/Agreement";

class Panel extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            chatBarActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onChatMenu = this.onChatMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                //mobileMenuActive: false,
                //chatBarActive: false
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
    
    onChatMenu(event) {
        this.menuClick = true;
        this.setState({
            chatBarActive: !this.state.chatBarActive
        });
       
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
                chatBarActive: false
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
            {label: 'Event Subscription', icon: 'pi pi-fw pi-home', to: '/event-subscription'},
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
            'chat': this.state.chatBarActive,
        });

        const topBarClassName = classNames("clearfix", {
            'layout-topbar': !this.state.chatBarActive,
            'topbar-chat': this.state.chatBarActive,
        });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar topBarClassName={topBarClassName} onToggleMenu={this.onToggleMenu}/>

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    {/* <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div> */}
                    
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className={mainClassName}>                    
                    <Route path="/" exact component={Dashboard} />                    
                    <Route path="/new-event" component={EventSubmit} />
                    <Route path="/upload" component={FileUploadDemo} />
                    <Route path="/guest-list" component={GuestList} />
                    
                    <Route path="/event-subscription" component={EventSubscription} />
                    <Route path="/guest-submit" component={GuestSubmit} />
                    <Route path="/acept-agreement" component={Agreement} />

                    {/* <Route path="/sample" component={SampleDemo} /> */}
                    {/* <Route path="/data" component={DataDemo} /> */}
                    {/* <Route path="/panels" component={PanelsDemo} /> */}
                    {/* <Route path="/overlays" component={OverlaysDemo} /> */}
                    {/* <Route path="/menus" component={MenusDemo} /> */}
                    {/* <Route path="/messages" component={MessagesDemo} /> */}
                    {/* <Route path="/charts" component={ChartsDemo} /> */}
                    {/* <Route path="/misc" component={MiscDemo} /> */}
                    {/* <Route path="/documentation" component={Documentation} /> */}
                </div>
                
                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default Panel;
