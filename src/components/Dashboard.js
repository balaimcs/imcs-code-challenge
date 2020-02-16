import React, { Component } from 'react';
//import {CarService} from '../service/CarService';
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import {Accordion, AccordionTab} from 'primereact/accordion';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            checked1: false,
            checked2: false,
            checked3: false,
        };
        
    }

    

    componentDidMount() {
        
    }

    render() {        
        return (
            <div className="p-grid p-fluid dashboard">

                <div className="p-col-12 p-md-6 p-lg-4 contacts">
                    <Panel header="Home">
                        
                    </Panel>
                </div>
            </div>
        );
    }
}