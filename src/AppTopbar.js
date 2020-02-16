import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className={this.props.topBarClassName}>
                <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </button>
                
                <div className="layout-topbar-icons"> 

                    <button className="p-link" onClick={this.props.onChatMenu}>
                        <span className="layout-topbar-item-text">Events</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                        {/* <span className="layout-topbar-badge">5</span> */}
                    </button> 
                                                      
                </div>
            </div>
        );
    }
}